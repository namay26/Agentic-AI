export interface IAccountInfo {
  pkpAddress: string;
  evm: {
    chainId: number;
    address: string;
  }[];
  solana: {
    network: string;
    address: string;
  }[];
}

export interface IExecuteUserOpRequest {
  target: string;
  value: string;
  calldata: string;
}

export interface IExecuteUserOpResponse {
  userOperationHash: string;
  chainId: number;
}

export interface ITransactionReceipt {
  transactionHash?: string;
  transactionIndex?: number;
  blockHash?: string;
  blockNumber?: number;
  from?: string;
  to?: string;
  cumulativeGasUsed?: number;
  status?: string;
  gasUsed?: number;
  contractAddress?: string | null;
  logsBloom?: string;
  effectiveGasPrice?: number;
}

export interface ILog {
  data?: string;
  blockNumber?: number;
  blockHash?: string;
  transactionHash?: string;
  logIndex?: number;
  transactionIndex?: number;
  address?: string;
  topics?: string[];
}

export interface IUserOperationReceipt {
  userOpHash?: string;
  entryPoint?: string;
  sender?: string;
  nonce?: number;
  paymaster?: string;
  actualGasUsed?: number;
  actualGasCost?: number;
  success?: boolean;
  receipt?: ITransactionReceipt;
  logs?: ILog[];
}

export interface TweetData {
  author_id: string;
  created_at: string;
  id: string;
  text: string;
  username: string;
}

export interface TokenInfo {
  name: string;
  address: string;
  poolId: string;
}

export interface Token {
  name: string;
  address: string;
}