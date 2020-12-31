// Ref: https://github.com/SwingbyProtocol/skybridge-contract/blob/191b6f8e0051020379a2efeb87895da0b08b93b5/contracts/interfaces/ISwapContract.sol

export const ABI_SWAP = [
  {
    inputs: [],
    name: 'getCurrentPriceLP',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    type: 'function',
    constant: false,
    payable: false,
  },
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
    payable: false,
  },
  {
    inputs: [
      {
        name: '_token',
        type: 'address',
      },
      {
        // Memo: Satoshi
        name: '_amountOfFloat',
        type: 'uint256',
      },
    ],
    name: 'getDepositFeeRate',
    outputs: [
      {
        name: 'depositFeeRate',
        type: 'uint256',
      },
    ],
    type: 'function',
    constant: false,
    payable: false,
  },
  {
    inputs: [],
    name: 'withdrawalFeeBPS',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    type: 'function',
    constant: false,
    payable: false,
  },
  {
    inputs: [
      {
        // Memo: Satoshi
        name: '_minerFees',
        type: 'uint256',
      },
    ],
    name: 'getMinimumAmountOfLPTokens',
    outputs: [
      {
        name: 'amountOfLPTokens',
        type: 'uint256',
      },
      {
        name: 'nowPrice',
        type: 'uint256',
      },
    ],
    type: 'function',
    constant: false,
    payable: false,
  },
];
