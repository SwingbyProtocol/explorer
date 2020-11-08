export const NETWORK = 'testnet';

export const isDevelopment = process.env.NODE_ENV !== 'production';

export const ENDPOINT_API = {
  FLOAT_BALANCES: 'https://testnet-staking-api.swingby.network/v1/floats',
  BTCE_NODE: 'https://tbtc-goerli-1.swingby.network',
  BTCB_NODE: 'https://testnet-node.swingby.network',
};
