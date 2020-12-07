import type { Mode } from '@swingby-protocol/sdk';

export const mode: Mode = process.env.NEXT_PUBLIC_MODE === 'production' ? 'production' : 'test';
export const PAGE_COUNT = 4;
export const TXS_COUNT = 10;

export const API_KEY_ETHERSCAN = 'NYXXH5CD1NQJMYJGZYAFK7G9G6AZGZTT3H';
export const API_KEY_BLOCK_NATIVE = '52950909-d5f6-42eb-8621-acb35a8ee1d3';
export const ETHER_NETWORK = { id: 5, network: 'goerli' };
export const INFURA_KEY = 'f35c2a4f3d0941a38a3edb62ed10c847';
export const RPC_URL = `https://${ETHER_NETWORK.network}.infura.io/v3/${INFURA_KEY}`;
export const APP_NAME = 'Swingby Explorer';

export const ENDPOINT_WBTC_NODE = 'https://tbtc-goerli-1.swingby.network';
export const ENDPOINT_BTCB_NODE = 'https://testnet-node.swingby.network';
export const ENDPOINT_COINGECKO = 'https://api.coingecko.com/api/v3';
export const ENDPOINT_ETHERSCAN = 'https://api-goerli.etherscan.io';
export const URL_ETHERSCAN = 'https://goerli.etherscan.io';

export const WIDGET_URL = process.env.NEXT_PUBLIC_SWAP_URL || 'https://widget-seven.vercel.app';

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

export const CONTRACT_BTCE = '0xeb47a21c1fc00d1e863019906df1771b80dbe182';
export const CONTRACT_LP = '0x4B979a05F0f8306FCC0d047d4965A72E4e25fDcc';
export const CONTRACT_SWAP = '0xf50b87c16bfb0781a86d4a7e91eb9e1da16906c4';
