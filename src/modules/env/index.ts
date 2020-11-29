export const NETWORK: 'testnet' | 'mainnet' = 'testnet';
export const PAGE_COUNT = 4;
export const TXS_COUNT = 5;
export const isDevelopment = process.env.NODE_ENV !== 'production';

export const BLOCK_NATIVE_API_KEY = '52950909-d5f6-42eb-8621-acb35a8ee1d3';
export const ETHER_NETWORK = { id: 5, network: 'goerli' };
export const INFURA_KEY = 'f35c2a4f3d0941a38a3edb62ed10c847';
export const RPC_URL = `https://${ETHER_NETWORK.network}.infura.io/v3/${INFURA_KEY}`;
export const APP_NAME = 'Swingby Explorer';

export const ENDPOINT_API = {
  BTCE_NODE: 'https://tbtc-goerli-1.swingby.network',
  BTCB_NODE: 'https://testnet-node.swingby.network',
  COINGECKO: 'https://api.coingecko.com/api/v3',
};

export const swapUrl = process.env.NEXT_PUBLIC_SWAP_URL || 'https://widget-seven.vercel.app/';

export enum PATH {
  ROOT = '/',
  SWAP = '/swap',
  POOL = '/pool',
  METANODES = '/metanodes',
  ANALYTICS = '/analytics',
}

export enum LOCAL_STORAGE {
  SelectedWallet = 'selectedWallet',
  UserWalletAddress = 'userWalletAddress',
}
