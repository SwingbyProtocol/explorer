export {
  fetchRecentTransaction,
  orgFloor,
  calculateDepositFee,
  calculateReceivingAmount,
} from './utils';
export enum PoolMode {
  Summary = 'Summary',
  AddLiquidity = 'Add Liquidity',
  Withdraw = 'Withdraw',
}

export const ABI = [
  {
    constant: false,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
      },
    ],
    payable: false,
    type: 'function',
  },
];

export const ABI_LP = [
  {
    inputs: [
      {
        name: '_token',
        type: 'address',
      },
      {
        name: '_user',
        type: 'address',
      },
    ],
    name: 'getFloatBalanceOf',
    outputs: [
      {
        name: 'floatBalanceOf',
        type: 'uint256',
      },
    ],
    type: 'function',
    constant: false,
    // constant: true,
    // stateMutability: 'view',
    payable: false,
  },
];

export interface IEtherscanTransaction {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  from: string;
  contractAddress: string;
  to: string;
  value: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: string;
  transactionIndex: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  cumulativeGasUsed: string;
  input: string;
  confirmations: string;
}

export interface IRecentTx {
  hash: string;
  timeStamp: number;
  value: string;
}
