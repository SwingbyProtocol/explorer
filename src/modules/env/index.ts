export const NETWORK = 'testnet';
export const PAGE_COUNT = 4;
export const isDevelopment = process.env.NODE_ENV !== 'production';

export const ENDPOINT_API = {
  FLOAT_BALANCES: 'https://testnet-staking-api.swingby.network/v1/floats',
  BTCE_NODE: 'https://tbtc-goerli-1.swingby.network',
  BTCB_NODE: 'https://testnet-node.swingby.network',
  COINGECKO: 'https://api.coingecko.com/api/v3',
};

export const swapUrl = process.env.NEXT_PUBLIC_SWAP_URL || 'https://widget-seven.vercel.app/';

export const PATH = {
  ROOT: '/',
  DETAIL: '/detail',
};
