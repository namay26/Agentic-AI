import { Squid } from "@0xsquid/sdk";
import { ethers } from "ethers";
import dotenv from 'dotenv';
dotenv.config();

const getSDK = (): Squid => {
  const squid = new Squid({
    baseUrl: "https://api.squidrouter.com",
    integratorId: "agentathon-c67a934b-8f15-47f0-b824-fd8b9bd9abc9"
  });
  return squid;
};

const privateKey = process.env.PRIVATE_KEY
const ethRpcEndPoint = 
  `https://goerli.infura.io/v3/${[process.env.INFURA_PROJECT_ID]}`;

export const bridge = (async () => {

  const provider = new ethers.JsonRpcProvider(ethRpcEndPoint);
  const signer = new ethers.Wallet(privateKey, provider);
  const squid = getSDK();

  await squid.init();

  const params = {
    fromChain: 5, 
    fromToken: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", 
    fromAmount: "20000000000000000", 
    toChain: 43113, 
    toToken: "0x57f1c63497aee0be305b8852b354cec793da43bb", 
    fromAddress: signer.address, 
    toAddress: "0xAD3A87a43489C44f0a8A33113B2745338ae71A9D", 
    slippage: 1.00, 
    enableForecall: true, 
    quoteOnly: false 
  };

  const { route } = await squid.getRoute(params);

  const tx = await squid.executeRoute({ route, signer });
  console.log("tx: ", tx);
  
  const txReceipt = await tx.wait();
  console.log("txReciept: ", txReceipt);

  const getStatusParams = {
    transactionId: txReceipt.transactionHash,
    routeType: route.transactionRequest.routeType
  };

  const status = await squid.getStatus(getStatusParams);
  console.log(status)
})();