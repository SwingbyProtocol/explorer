import type { Mode } from '@swingby-protocol/sdk';

export enum MODE {
  PRODUCTION = 'production',
  TEST = 'test',
}

export const mode: Mode =
  process.env.NEXT_PUBLIC_MODE === MODE.PRODUCTION ? MODE.PRODUCTION : MODE.TEST;
export const PAGE_COUNT = 4;
export const TXS_COUNT = 10;
export const NODES_PER_PAGE = 10;

export const etherscanApiKey =
  process.env.NEXT_PUBLIC_ETHERSCAN_KEY || 'NYXXH5CD1NQJMYJGZYAFK7G9G6AZGZTT3H';
export const blocknativeApiKey =
  process.env.NEXT_PUBLIC_BLOCKNATIVE_KEY || '52950909-d5f6-42eb-8621-acb35a8ee1d3';
export const ETHER_NETWORK = { id: 5, network: 'goerli' };
export const infuraApiKey =
  process.env.NEXT_PUBLIC_INFURA_KEY || 'f35c2a4f3d0941a38a3edb62ed10c847';
export const RPC_URL = `https://${ETHER_NETWORK.network}.infura.io/v3/${infuraApiKey}`;
export const infuraAppName = 'Swingby Explorer';

export const ENDPOINT_WBTC_NODE = 'https://tbtc-goerli-node-1.swingby.network';
export const ENDPOINT_BTCB_NODE = 'https://testnet-node.swingby.network';
export const ENDPOINT_COINGECKO = 'https://api.coingecko.com/api/v3';
export const ENDPOINT_ETHERSCAN = 'https://api-goerli.etherscan.io';
export const URL_ETHERSCAN = 'https://goerli.etherscan.io';
export const ENDPOINT_EARNINGS = 'https://earnings-api.vercel.app/api/earnings';

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
  ThemeMode = 'themeMode',
}

export const CONTRACT_BTCE = '0xeb47a21c1fc00d1e863019906df1771b80dbe182';
export const CONTRACT_LP = '0xb7f7dd6d0e3addbb98f8bc84f010b580a6151b08';
export const CONTRACT_SWAP = '0xe06ff2b69b822807b8ac14479ff4386fe051e242';
