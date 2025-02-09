import DLMM from "@meteora-ag/dlmm";
import {
  PublicKey,
  sendAndConfirmTransaction,
  Connection,
  clusterApiUrl,
  Keypair,
} from "@solana/web3.js";
import { BN } from "bn.js";

export async function swap(
  poodId: string,
  tokenX: string,
  tokenY: string,
  amount: number
) {
  const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
  const poolKey = new PublicKey(poodId);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dlmm = (DLMM as any).default;
  const dlmmPool = await dlmm.create(connection, poolKey);

  const secretKey = Keypair.generate().secretKey;
  const user = Keypair.fromSecretKey(new Uint8Array(secretKey));

  const swapAmount = new BN(amount);
  const slippage = new BN(5); //How much slippage???

  // Swap quote
  const swapYtoX = true;
  const binArrays = await dlmmPool.getBinArrayForSwap(swapYtoX);
  const swapQuote = await dlmmPool.swapQuote(
    swapAmount,
    swapYtoX,
    slippage,
    binArrays
  );

  // Swap
  const swapTx = await dlmmPool.swap({
    inToken: new PublicKey(tokenX),
    binArraysPubkey: swapQuote.binArraysPubkey,
    inAmount: swapAmount,
    lbPair: dlmmPool.pubkey,
    user: user.publicKey,
    minOutAmount: swapQuote.minOutAmount,
    outToken: new PublicKey(tokenY),
  });

  try {
    const swapTxHash = await sendAndConfirmTransaction(connection, swapTx, [
      user,
    ]);
    console.log("Swap Transaction Hash:", swapTxHash);
    return null;
  } catch (error) {
    console.error("Swap failed:", error);
    return error;
  }
}
