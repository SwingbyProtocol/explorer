import { CONTRACTS, SkybridgeMode } from '@swingby-protocol/sdk';

// Memo: Default URL as testnet environment.
// Memo: Mainnet endpoints are defined in Vercel as environment variable.

export const DEPLOYED_URL =
  process.env.NEXT_PUBLIC_DEPLOYED_URL || 'https://testnet.skybridge.info/';

export enum MODE {
  PRODUCTION = 'production',
  TEST = 'test',
}

export enum PATH {
  ROOT = '/',
  SWAP = '/swap',
  FLOAT = '/float',
  POOL = '/pool',
  METANODES = '/metanodes',
  FEES = '/fees',
}

export enum LOCAL_STORAGE {
  SelectedWallet = 'selectedWallet',
  UserWalletAddress = 'userWalletAddress',
  ThemeMode = 'themeMode',
}

export const mode: SkybridgeMode =
  process.env.NEXT_PUBLIC_MODE === MODE.PRODUCTION ? MODE.PRODUCTION : MODE.TEST;

export const PAGE_COUNT = 25;

export const TXS_COUNT = 10;

export const NODES_PER_PAGE = 10;

export const GA_TAG = process.env.NEXT_PUBLIC_GA_TAG || 'G-8C02VKBZ6P';

export const IPSTACK_API_KEY =
  process.env.NEXT_PUBLIC_IPSTACK || 'b74a888cf8d2112ef1a0a72367e4c696';

export const etherscanApiKey =
  process.env.NEXT_PUBLIC_ETHERSCAN_KEY || 'NYXXH5CD1NQJMYJGZYAFK7G9G6AZGZTT3H';

export const blocknativeApiKey =
  process.env.NEXT_PUBLIC_BLOCKNATIVE_KEY || '52950909-d5f6-42eb-8621-acb35a8ee1d3';

export const ETHER_NETWORK =
  mode === MODE.PRODUCTION ? { id: 1, network: 'mainnet' } : { id: 5, network: 'goerli' };

export const infuraApiKey =
  process.env.NEXT_PUBLIC_INFURA_KEY || 'f35c2a4f3d0941a38a3edb62ed10c847';

export const RPC_URL = `https://${ETHER_NETWORK.network}.infura.io/v3/${infuraApiKey}`;

export const infuraAppName = 'Swingby Explorer';

export const ENDPOINT_SKYBRIDGE_EXCHANGE = 'https://network.skybridge.exchange/api/v1';

export const ENDPOINT_ETHEREUM_NODE =
  process.env.NEXT_PUBLIC_ETHEREUM_NODE_ENDPOINT || 'https://tbtc-goerli-node-1.swingby.network';

export const ENDPOINT_BINANCE_NODE =
  process.env.NEXT_PUBLIC_BINANCE_NODE_ENDPOINT || 'https://testnet-node.swingby.network';

export const ENDPOINT_EARNINGS =
  process.env.NEXT_PUBLIC_EARNINGS_ENDPOINT || 'https://earnings-api.vercel.app/api/earnings';

export const ENDPOINT_COINGECKO = 'https://api.coingecko.com/api/v3';

export const ENDPOINT_ETHERSCAN =
  mode === MODE.PRODUCTION ? 'https://api.etherscan.io' : 'https://api-goerli.etherscan.io';

export const URL_ETHERSCAN =
  mode === MODE.PRODUCTION ? 'https://etherscan.io' : 'https://goerli.etherscan.io';

// Memo: BTCE contract address as WBTC in testnet
export const CONTRACT_WBTC = process.env.NEXT_PUBLIC_CONTRACT_WBTC || CONTRACTS.WBTC.test.address;

export const CONTRACT_SB_BTC = process.env.NEXT_PUBLIC_SB_BTC || CONTRACTS.sbBTC.test.address;

export const CONTRACT_SWAP =
  process.env.NEXT_PUBLIC_CONTRACT_SWAP || CONTRACTS.skybridge.test.address;

// Memo: BTC is not on Ethereum, it doesn’t have an address, so the contract uses this one to represent BTC
export const ZERO_ADDRESS = CONTRACTS.BTC.production.address;
