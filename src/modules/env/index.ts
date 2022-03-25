import {
  CONTRACTS,
  FIXED_NODE_ENDPOINT,
  SkybridgeBridge,
  SkybridgeMode,
} from '@swingby-protocol/sdk';

export const logLevel = process.env.NEXT_PUBLIC_LOG_LEVEL || 'debug';

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
  LastChurnedBlock = 'lastChurnedBlock',
  Terms = 'swingby-explorer.terms',
}

export enum AVAILABLE_CHAIN_IDS {
  Mainnet = 1,
  Ropsten = 3,
  BSC = 56,
}

export const mode: SkybridgeMode =
  process.env.NEXT_PUBLIC_MODE === 'production' ? 'production' : 'test';

export const isValidNetwork = (chainID: number): boolean =>
  Object.values(AVAILABLE_CHAIN_IDS).includes(chainID);

export const getNetwork = (bridge: SkybridgeBridge): AVAILABLE_CHAIN_IDS => {
  return bridge === 'btc_bep20'
    ? AVAILABLE_CHAIN_IDS.BSC
    : mode === 'production'
    ? AVAILABLE_CHAIN_IDS.Mainnet
    : AVAILABLE_CHAIN_IDS.Ropsten;
};

export const PAGE_COUNT = 12;

export const TXS_COUNT = 10;

export const appName = 'Swingby Explorer';

export const ENDPOINT_YIELD_FARMING = 'https://farm.swingby.network';

export const ENDPOINT_ETHEREUM_BRIDGE = FIXED_NODE_ENDPOINT['btc_erc'][mode][0];

export const ENDPOINT_COINGECKO = 'https://api.coingecko.com/api/v3';

export const ENDPOINT_BSC_BRIDGE = FIXED_NODE_ENDPOINT['btc_bep20'][mode][0];

export const ENDPOINT_ETHERSCAN =
  mode === 'production' ? 'https://api.etherscan.io' : 'https://api-ropsten.etherscan.io';

export const ENDPOINT_BSCSCAN = 'https://api.bscscan.com';

export const URL_ETHERSCAN =
  mode === 'production' ? 'https://etherscan.io' : 'https://ropsten.etherscan.io';

export const URL_BSCSCAN = 'https://bscscan.com';

export const BTC_EXPLORER =
  mode === 'production'
    ? 'https://www.blockchain.com/btc'
    : 'https://www.blockchain.com/btc-testnet';

export const CONTRACT_SB_BTC =
  mode === 'production'
    ? CONTRACTS.coins.sbBTC.production.address
    : CONTRACTS.coins.sbBTC.test.address;

export const CONTRACT_BEP20_SB_BTC = CONTRACTS.coins['sbBTC.BEP20'].production.address;

// Memo: Fake BTC contract address that used on smart contract
export const ZERO_ADDRESS = CONTRACTS.coins.BTC.production.address;

export const isEnableBscSupport = process.env.NEXT_PUBLIC_IS_BSC_SUPPORT === 'true' ? true : false;

export const GA_TAG = process.env.NEXT_PUBLIC_GA_TAG;

export const etherscanApiKey = process.env.NEXT_PUBLIC_ETHER_SCAN_KEY;

export const bscscanApiKey = process.env.NEXT_PUBLIC_BSC_SCAN_KEY;

export const blocknativeApiKey = process.env.NEXT_PUBLIC_BLOCKNATIVE_KEY;

export const infuraApiKey = process.env.NEXT_PUBLIC_INFURA_KEY;

export const WC_BRIDGE = process.env.NEXT_PUBLIC_WC_BRIDGE;
export const isSupportBsc = mode === 'production';
