export const NETWORK: 'testnet' | 'mainnet' = 'testnet';
export const PAGE_COUNT = 4;
export const TXS_COUNT = 5;
export const isDevelopment = process.env.NODE_ENV !== 'production';

export const BLOCK_NATIVE_API_KEY = '52950909-d5f6-42eb-8621-acb35a8ee1d3';
export const GOERLI_NETWORK = 5;

export const ENDPOINT_API = {
  BTCE_NODE: 'https://tbtc-goerli-1.swingby.network',
  BTCB_NODE: 'https://testnet-node.swingby.network',
  COINGECKO: 'https://api.coingecko.com/api/v3',
};

export const swapUrl = process.env.NEXT_PUBLIC_SWAP_URL || 'https://widget-seven.vercel.app/';

export const PATH = {
  ROOT: '/',
  SWAP: '/swap',
  POOL: '/pool',
  METANODES: '/metanodes',
  ANALYTICS: '/analytics',
};
