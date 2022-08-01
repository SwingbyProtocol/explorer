import { CONTRACTS, SkybridgeMode } from '@swingby-protocol/sdk';

export const logLevel =
  process.env.NEXT_PUBLIC_LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'debug' : 'trace');

export const DEPLOYED_URL =
  process.env.NEXT_PUBLIC_DEPLOYED_URL || 'https://testnet.skybridge.info/';

export const ROOT_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : DEPLOYED_URL;

export enum PATH {
  ROOT = '/',
  SWAP = '/swap',
  FLOAT = '/float',
  POOL = '/pool',
  METANODES = '/metanodes',
  FEES = '/fees',
  ASSET_BTC = '/asset/btc',
  ASSET_WBTC = '/asset/wbtc',
  METANODE_EARNERS = '/metanode-earners',
}

export enum LOCAL_STORAGE {
  Theme = 'themeMode',
  Wallet = 'wallet',
}

export const mode: SkybridgeMode =
  process.env.NEXT_PUBLIC_MODE === 'production' ? 'production' : 'test';

export const PAGE_COUNT = 25;

export const TXS_COUNT = 10;

export const NODES_PER_PAGE = 10;

export const graphEndpoint = 'https://network.skybridge.exchange/api/v3/graphql';

export const appName = 'Swingby Explorer';

export const ENDPOINT_SKYBRIDGE_EXCHANGE = 'https://network.skybridge.exchange/api/v3';

export const ENDPOINT_YIELD_FARMING = 'https://farm.swingby.network';

export const ENDPOINT_ETHEREUM_BRIDGE =
  mode === 'production'
    ? 'https://taitan-0083.zoo.farm'
    : 'https://tbtc-ropsten-node-1.swingby.network';

export const ENDPOINT_SKYPOOL_BRIDGE =
  mode === 'production'
    ? 'https://btc-skypool-1.swingby.network'
    : 'https://btc-skypool-1.swingby.network';

export const ENDPOINT_EARNINGS = 'https://earnings-api.vercel.app/api/earnings';

export const ENDPOINT_COINGECKO = 'https://api.coingecko.com/api/v3';

export const ENDPOINT_ETHERSCAN =
  mode === 'production' ? 'https://api.etherscan.io' : 'https://api-ropsten.etherscan.io';

export const ENDPOINT_BSCSCAN =
  mode === 'production' ? 'https://api.bscscan.com' : 'https://api-testnet.bscscan.com';

export const URL_ETHERSCAN =
  mode === 'production' ? 'https://etherscan.io' : 'https://ropsten.etherscan.io';

export const URL_BSCSCAN =
  mode === 'production' ? 'https://bscscan.com' : 'https://testnet.bscscan.com';

export const BTC_EXPLORER =
  mode === 'production'
    ? 'https://www.blockchain.com/btc'
    : 'https://www.blockchain.com/btc-testnet';

export const CONTRACT_SB_BTC =
  mode === 'production'
    ? CONTRACTS.coins.sbBTC.production.address
    : CONTRACTS.coins.sbBTC.test.address;

export const CONTRACT_SKYPOOL_SB_BTC =
  mode === 'production'
    ? CONTRACTS.coins['sbBTC.SKYPOOL'].production.address
    : CONTRACTS.coins['sbBTC.SKYPOOL'].test.address;

// Memo: BTC is not on Ethereum, it doesn’t have an address, so the contract uses this one to represent BTC
export const ZERO_ADDRESS = CONTRACTS.coins.BTC.production.address;

export const isEnableBscSupport =
  process.env.NEXT_PUBLIC_IS_BSC_SUPPORT === 'true' ? true : mode === 'test';

export const skybridgeEnabled = process.env.NEXT_PUBLIC_SKYBRIDGE_ENABLED === 'true';
export const skypoolsEnabled = process.env.NEXT_PUBLIC_SKYPOOLS_ENABLED === 'true';

export const GA_TAG = process.env.NEXT_PUBLIC_GA_TAG;

export const etherscanApiKey = process.env.NEXT_PUBLIC_ETHER_SCAN_KEY;

export const bscscanApiKey = process.env.NEXT_PUBLIC_BSC_SCAN_KEY;

export const blocknativeApiKey = process.env.NEXT_PUBLIC_BLOCKNATIVE_KEY;

export const infuraApiKey = process.env.NEXT_PUBLIC_INFURA_KEY;

export const WC_BRIDGE = process.env.NEXT_PUBLIC_WC_BRIDGE;

export const NETWORK_FETCH_RATE = 10 * 1000; // 5 minutes in milliseconds
