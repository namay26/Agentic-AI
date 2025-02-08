const web3 = require("@solana/web3.js");

const solanaAddress = '6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN';

const publicKey = new web3.PublicKey(solanaAddress);

console.log("Public key:", publicKey.toString());
