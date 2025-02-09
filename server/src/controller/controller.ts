import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { swap } from "./swap.js";
import { ethers } from "ethers";
import dotenv from "dotenv";
import { TokenInfo, Token } from "src/types.js";

dotenv.config();

export class Controller {
  public static TokenList: TokenInfo[] = [
    {name: "USDC", address: "So11111111111111111111111111111111111111112", poolId: "3SFQjmDsi5NsjJeZfz7fgJ6VddX3TcuZkv2eUibWJN8N"}
  ]; //add tokens
  private static USDCAddress = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

  public static getTokensList() {
    const tokensNameAndAddress = Controller.TokenList.map(
      (token: TokenInfo) => {
        const returnToken: Token = { name: token.name, address: token.address };
        return returnToken;
      }
    );
    return tokensNameAndAddress;
  }

  // buy swap: TokenIn: USDC TokenOut: memecoin; function: tokenIn: arbitrum token
  public static async buyTokens(
    _user: string = "0xddf7E2742060320a39707d1ceb57fF994B27F9F8",
    amount: number = 5,
    tokenOut: string = "So11111111111111111111111111111111111111112",
    // amountUSDC: string,
  ): Promise<boolean> {
    // const __dirname = dirname(fileURLToPath(import.meta.url));
    // const arbitrumToken: string = "0x256Bac4CCD510f812efAE680a61e6Ebd6356F5EA"
    // const INFURA_API_URL: string = process.env.INFURA_API_URL as string;
    // const PRIVATE_KEY_ETHER: string = process.env.PRIVATE_KEY_ETHER as string;
    // const CONTRACT_ADDRESS: string = process.env.CONTRACT_ADDRESS as string;
    //const CONTRACT_ABI = [
        // {
        //     "inputs": [
        //         {
        //             "internalType": "address",
        //             "name": "_usdcAddr",
        //             "type": "address"
        //         }
        //     ],
        //     "stateMutability": "nonpayable",
        //     "type": "constructor"
        // },
        // {
        //     "inputs": [],
        //     "name": "Arbitrum__InsufficentBalance",
        //     "type": "error"
        // },
        // {
        //     "inputs": [
        //         {
        //             "internalType": "address",
        //             "name": "user",
        //             "type": "address"
        //         },
        //         {
        //             "internalType": "uint256",
        //             "name": "amount",
        //             "type": "uint256"
        //         },
        //         {
        //             "internalType": "address",
        //             "name": "token",
        //             "type": "address"
        //         }
        //     ],
        //     "name": "buy",
        //     "outputs": [],
        //     "stateMutability": "payable",
        //     "type": "function"
        // },
        // {
        //     "inputs": [
        //         {
        //             "internalType": "address",
        //             "name": "owner",
        //             "type": "address"
        //         }
        //     ],
        //     "name": "OwnableInvalidOwner",
        //     "type": "error"
        // },
        // {
        //     "inputs": [
        //         {
        //             "internalType": "address",
        //             "name": "account",
        //             "type": "address"
        //         }
        //     ],
        //     "name": "OwnableUnauthorizedAccount",
        //     "type": "error"
        // },
        // {
        //     "anonymous": false,
        //     "inputs": [
        //         {
        //             "indexed": false,
        //             "internalType": "address",
        //             "name": "user",
        //             "type": "address"
        //         },
        //         {
        //             "indexed": false,
        //             "internalType": "uint256",
        //             "name": "amount",
        //             "type": "uint256"
        //         },
        //         {
        //             "indexed": false,
        //             "internalType": "address",
        //             "name": "my_token",
        //             "type": "address"
        //         },
        //         {
        //             "indexed": false,
        //             "internalType": "string",
        //             "name": "meme_coin",
        //             "type": "string"
        //         }
        //     ],
        //     "name": "BuyOrder",
        //     "type": "event"
        // },
        // {
        //     "anonymous": false,
        //     "inputs": [
        //         {
        //             "indexed": false,
        //             "internalType": "address",
        //             "name": "user",
        //             "type": "address"
        //         },
        //         {
        //             "indexed": false,
        //             "internalType": "address",
        //             "name": "token",
        //             "type": "address"
        //         },
        //         {
        //             "indexed": false,
        //             "internalType": "uint256",
        //             "name": "amount",
        //             "type": "uint256"
        //         }
        //     ],
        //     "name": "BuyOrderFulfilled",
        //     "type": "event"
        // },
        // {
        //     "inputs": [
        //         {
        //             "internalType": "string",
        //             "name": "actualToken",
        //             "type": "string"
        //         }
        //     ],
        //     "name": "createToken",
        //     "outputs": [],
        //     "stateMutability": "nonpayable",
        //     "type": "function"
        // },
        // {
        //     "inputs": [
        //         {
        //             "internalType": "address",
        //             "name": "user",
        //             "type": "address"
        //         },
        //         {
        //             "internalType": "uint256",
        //             "name": "amountToMint",
        //             "type": "uint256"
        //         },
        //         {
        //             "internalType": "address",
        //             "name": "token",
        //             "type": "address"
        //         }
        //     ],
        //     "name": "fulfillBuy",
        //     "outputs": [],
        //     "stateMutability": "nonpayable",
        //     "type": "function"
        // },
        // {
        //     "inputs": [
        //         {
        //             "internalType": "address",
        //             "name": "user",
        //             "type": "address"
        //         },
        //         {
        //             "internalType": "uint256",
        //             "name": "amountToPay",
        //             "type": "uint256"
        //         }
        //     ],
        //     "name": "fulfillSell",
        //     "outputs": [],
        //     "stateMutability": "payable",
        //     "type": "function"
        // },
        // {
        //     "anonymous": false,
        //     "inputs": [
        //         {
        //             "indexed": true,
        //             "internalType": "address",
        //             "name": "previousOwner",
        //             "type": "address"
        //         },
        //         {
        //             "indexed": true,
        //             "internalType": "address",
        //             "name": "newOwner",
        //             "type": "address"
        //         }
        //     ],
        //     "name": "OwnershipTransferred",
        //     "type": "event"
        // },
        // {
        //     "inputs": [],
        //     "name": "renounceOwnership",
        //     "outputs": [],
        //     "stateMutability": "nonpayable",
        //     "type": "function"
        // },
        // {
        //     "inputs": [
        //         {
        //             "internalType": "address",
        //             "name": "user",
        //             "type": "address"
        //         },
        //         {
        //             "internalType": "uint256",
        //             "name": "amountOfTokens",
        //             "type": "uint256"
        //         },
        //         {
        //             "internalType": "address",
        //             "name": "token",
        //             "type": "address"
        //         }
        //     ],
        //     "name": "sell",
        //     "outputs": [],
        //     "stateMutability": "nonpayable",
        //     "type": "function"
        // },
        // {
        //     "anonymous": false,
        //     "inputs": [
        //         {
        //             "indexed": false,
        //             "internalType": "address",
        //             "name": "user",
        //             "type": "address"
        //         },
        //         {
        //             "indexed": false,
        //             "internalType": "uint256",
        //             "name": "numTokens",
        //             "type": "uint256"
        //         },
        //         {
        //             "indexed": false,
        //             "internalType": "address",
        //             "name": "my_token",
        //             "type": "address"
        //         },
        //         {
        //             "indexed": false,
        //             "internalType": "string",
        //             "name": "meme_coin",
        //             "type": "string"
        //         }
        //     ],
        //     "name": "SellOrder",
        //     "type": "event"
        // },
        // {
        //     "anonymous": false,
        //     "inputs": [
        //         {
        //             "indexed": false,
        //             "internalType": "address",
        //             "name": "user",
        //             "type": "address"
        //         },
        //         {
        //             "indexed": false,
        //             "internalType": "uint256",
        //             "name": "amount",
        //             "type": "uint256"
        //         }
        //     ],
        //     "name": "SellOrderFulfilled",
        //     "type": "event"
        // },
        // {
        //     "anonymous": false,
        //     "inputs": [
        //         {
        //             "indexed": false,
        //             "internalType": "address",
        //             "name": "token",
        //             "type": "address"
        //         },
        //         {
        //             "indexed": false,
        //             "internalType": "string",
        //             "name": "memecoin",
        //             "type": "string"
        //         }
        //     ],
        //     "name": "TokenCreated",
        //     "type": "event"
        // },
        // {
        //     "inputs": [
        //         {
        //             "internalType": "address",
        //             "name": "newOwner",
        //             "type": "address"
        //         }
        //     ],
        //     "name": "transferOwnership",
        //     "outputs": [],
        //     "stateMutability": "nonpayable",
        //     "type": "function"
        // },
        // {
        //     "inputs": [],
        //     "name": "backendWalletAddress",
        //     "outputs": [
        //         {
        //             "internalType": "address",
        //             "name": "",
        //             "type": "address"
        //         }
        //     ],
        //     "stateMutability": "view",
        //     "type": "function"
        // },
        // {
        //     "inputs": [],
        //     "name": "owner",
        //     "outputs": [
        //         {
        //             "internalType": "address",
        //             "name": "",
        //             "type": "address"
        //         }
        //     ],
        //     "stateMutability": "view",
        //     "type": "function"
        // },
        // {
        //     "inputs": [],
        //     "name": "usdcTokenAddress",
        //     "outputs": [
        //         {
        //             "internalType": "address",
        //             "name": "",
        //             "type": "address"
        //         }
        //     ],
        //     "stateMutability": "view",
        //     "type": "function"
        // }
    //]
    const WALLET_ADDRESS: string = process.env.WALLET_ADDRESS as string;
    //bridging call
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
    console.log("Swap Done")
    const balanceOfTokenAfterSwapping =
      await Controller.getWalletBalanceOfToken(walletAddress, memecoinAddress);
    const actualNoOfTokensBought =
      balanceOfTokenAfterSwapping - balanceOfTokenBeforeSwapping;
    
      console.log(balanceOfTokenAfterSwapping, actualNoOfTokensBought, actualNoOfTokensBought)

    if (err) {
      return false;
    } else {
    //   const provider = new ethers.JsonRpcProvider(INFURA_API_URL);
    //   const wallet = new ethers.Wallet(PRIVATE_KEY_ETHER, provider);
    //   const contract = new ethers.Contract(
    //     CONTRACT_ADDRESS,
    //     CONTRACT_ABI,
    //     wallet
    //   );

            // console.log("fufillBuy now")
            // const tx = await contract.fulfillBuy(
            //   user,
            //   actualNoOfTokensBought/10**8,
            //   arbitrumToken
            // );
            // await tx.wait();
            console.log("Successful")
            return true
    }
  }

  // sell swap: tokenIn: memecoin, tokenOut: USDC; function: arbitrumToken
  public static async sellTokens(
    user: string,
    amount: number,
    tokenIn: string,
  ): Promise<boolean> {
    const arbitrumToken: string = "0x256Bac4CCD510f812efAE680a61e6Ebd6356F5EA";
    const INFURA_API_URL: string = process.env.INFURA_API_URL as string;
    const PRIVATE_KEY_ETHER: string = process.env.PRIVATE_KEY_ETHER as string;
    const CONTRACT_ADDRESS: string = process.env.CONTRACT_ADDRESS as string;
    const CONTRACT_ABI = [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_usdcAddr",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "Arbitrum__InsufficentBalance",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                }
            ],
            "name": "buy",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "OwnableInvalidOwner",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "OwnableUnauthorizedAccount",
            "type": "error"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "my_token",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "meme_coin",
                    "type": "string"
                }
            ],
            "name": "BuyOrder",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "BuyOrderFulfilled",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "actualToken",
                    "type": "string"
                }
            ],
            "name": "createToken",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amountToMint",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                }
            ],
            "name": "fulfillBuy",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amountToPay",
                    "type": "uint256"
                }
            ],
            "name": "fulfillSell",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amountOfTokens",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                }
            ],
            "name": "sell",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "numTokens",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "my_token",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "meme_coin",
                    "type": "string"
                }
            ],
            "name": "SellOrder",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "SellOrderFulfilled",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "memecoin",
                    "type": "string"
                }
            ],
            "name": "TokenCreated",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "backendWalletAddress",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "usdcTokenAddress",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
    const WALLET_ADDRESS: string = process.env.WALLET_ADDRESS as string;

    const provider = new ethers.JsonRpcProvider(INFURA_API_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY_ETHER, provider);
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
            //bridging call
            //send money from ethereum wallet to solana wallet
          const transferTx = await contract.fulfillSell(user, amountToBePayed);
          await transferTx.wait();
          resolve(true);
        }
      });
    });
  }

  private static async getWalletBalanceOfToken(
    walletAddress: PublicKey,
    _token: PublicKey
  ): Promise<number> {
    try {
      const connection = new Connection(
        clusterApiUrl("mainnet-beta"),
        "confirmed"
      );
      const tokenAccounts = await connection.getBalance(walletAddress);
    //   const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
    //     walletAddress,
    //     {
    //       mint: token,
    //     }
    //   );

    //   if (tokenAccounts.value.length === 0) {
    //     return 0;
    //   } else {
    //     const tokenBalance: number =
    //       tokenAccounts.value[0].account.data.parsed.info.tokenAmount.uiAmount;
    //     return tokenBalance;
    //   }
      return tokenAccounts
    } catch (error) {
      throw new Error("Invalid Wallet Address or Token Mint Address");
    }
  }
}
