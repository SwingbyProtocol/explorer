export enum PoolMode {
  Summary = 'Summary',
  AddLiquidity = 'Add Liquidity',
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
