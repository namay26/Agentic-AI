import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { swap } from "./swap.js";
import { ethers } from "ethers";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { TokenInfo, Token } from "src/types.js";

dotenv.config();

export class Controller {
  public static TokenList: TokenInfo[] = [
    //{ name: "", address: "", poolId: "" },
  ]; //add tokens
  private static USDCAddress = "0xaf88d065e77c8cC2239327C5EDb3A432268e5831";

  public static getTokensList() {
    const tokensNameAndAddress = Controller.TokenList.map(
      (token: TokenInfo) => {
        const returnToken: Token = { name: token.name, address: token.address };
        return returnToken;
      }
    );
    return tokensNameAndAddress;
  }

  // buy swap: TokenIn: USDC TokenOut: memcoin; function: tokenIn: arbitrum token
  public static async buyTokens(
    user: string,
    amount: number,
    arbitrumToken: string,
    tokenOut: string
  ): Promise<boolean> {
    const INFURA_API_URL: string = process.env.INFURA_API_URL as string;
    const PRIVATE_KEY: string = process.env.PRIVATE_KEY as string;
    const CONTRACT_ADDRESS: string = process.env.CONTRACT_ADDRESS as string;
    const CONTRACT_ABI = JSON.parse(
      fs.readFileSync(path.join(__dirname, "contractABI.json"), "utf-8")
    );

    const WALLET_ADDRESS: string = process.env.WALLET_ADDRESS as string;

    const walletAddress = new PublicKey(WALLET_ADDRESS);
    const memecoinAddress = new PublicKey(tokenOut);

    const balanceOfTokenBeforeSwapping: number =
      await Controller.getWalletBalanceOfToken(walletAddress, memecoinAddress);

    const poolIdToken = Controller.TokenList.filter(
      (token) => token.address === tokenOut
    );
    const err = await swap(
      poolIdToken[0].poolId,
      Controller.USDCAddress,
      tokenOut,
      amount
    );

    const balanceOfTokenAfterSwapping: number =
      await Controller.getWalletBalanceOfToken(walletAddress, memecoinAddress);
    const actualNoOfTokensBought: number =
      balanceOfTokenAfterSwapping - balanceOfTokenBeforeSwapping;

    if (err) {
      return false;
    } else {
      const provider = new ethers.JsonRpcProvider(INFURA_API_URL);
      const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        wallet
      );

      const tx = await contract.fulfillBuy(
        user,
        actualNoOfTokensBought,
        arbitrumToken
      );
      await tx.wait();
      return true;
    }
  }

  // sell swap: tokenIn: memecoin, tokenOut: USDC; function: arbitrumToken
  public static async sellTokens(
    user: string,
    amount: number,
    tokenIn: string,
    arbitrumToken: string
  ): Promise<boolean> {
    const INFURA_API_URL: string = process.env.INFURA_API_URL as string;
    const PRIVATE_KEY: string = process.env.PRIVATE_KEY as string;
    const CONTRACT_ADDRESS: string = process.env.CONTRACT_ADDRESS as string;
    const CONTRACT_ABI = JSON.parse(
      fs.readFileSync(path.join(__dirname, "contractABI.json"), "utf-8")
    );
    const WALLET_ADDRESS: string = process.env.WALLET_ADDRESS as string;

    const provider = new ethers.JsonRpcProvider(INFURA_API_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      wallet
    );

    const tx = await contract.sell(amount, arbitrumToken); //verify what token
    await tx.wait();

    return new Promise((resolve) => {
      contract.on("SellOrder", async () => {
        const walletAddress = new PublicKey(WALLET_ADDRESS);

        const balanceOfTokenBeforeSwapping: number =
          await Controller.getWalletBalanceOfToken(
            walletAddress,
            new PublicKey(Controller.USDCAddress)
          );
        const poolIdToken = Controller.TokenList.filter(
          (token) => token.address === tokenIn
        );
        const err = await swap(
          poolIdToken[0].poolId,
          Controller.USDCAddress,
          tokenIn,
          amount
        );

        const balanceOfTokenAfterSwapping: number =
          await Controller.getWalletBalanceOfToken(
            walletAddress,
            new PublicKey(Controller.USDCAddress)
          );
        const amountToBePayed: number =
          balanceOfTokenAfterSwapping - balanceOfTokenBeforeSwapping;

        if (err) {
          resolve(false);
        } else {
          const transferTx = await contract.fulfillSell(user, amountToBePayed);
          await transferTx.wait();
          resolve(true);
        }
      });
    });
  }

  private static async getWalletBalanceOfToken(
    walletAddress: PublicKey,
    token: PublicKey
  ): Promise<number> {
    try {
      const connection = new Connection(
        clusterApiUrl("mainnet-beta"),
        "confirmed"
      );
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        walletAddress,
        {
          mint: token,
        }
      );

      if (tokenAccounts.value.length === 0) {
        return 0;
      } else {
        const tokenBalance: number =
          tokenAccounts.value[0].account.data.parsed.info.tokenAmount.uiAmount;
        return tokenBalance;
      }
    } catch (error) {
      throw new Error("Invalid Wallet Address or Token Mint Address");
    }
  }
}
