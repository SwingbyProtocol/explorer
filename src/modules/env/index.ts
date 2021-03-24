import { CONTRACTS, SkybridgeMode } from '@swingby-protocol/sdk';

export const logLevel =
  process.env.NEXT_PUBLIC_LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'debug' : 'trace');

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
  ASSET_BTC = '/asset/btc',
  ASSET_WBTC = '/asset/wbtc',
  METANODE_EARNERS = '/metanode-earners',
}

export enum LOCAL_STORAGE {
  SelectedWallet = 'selectedWallet',
  UserWalletAddress = 'userWalletAddress',
  Theme = 'themeMode',
}

export const mode: SkybridgeMode =
  process.env.NEXT_PUBLIC_MODE === MODE.PRODUCTION ? MODE.PRODUCTION : MODE.TEST;

export const PAGE_COUNT = 25;

export const TXS_COUNT = 10;

export const NODES_PER_PAGE = 10;

export const GA_TAG = process.env.NEXT_PUBLIC_GA_TAG || 'G-8C02VKBZ6P';

export const etherscanApiKey = process.env.ETHERSCAN_KEY || 'NYXXH5CD1NQJMYJGZYAFK7G9G6AZGZTT3H';

export const bscscanApiKey = 'Y57NEYW477ZGHRNY8ADUF24I8S4UX8BK8S';

export const blocknativeApiKey =
  process.env.NEXT_PUBLIC_BLOCKNATIVE_KEY || '52950909-d5f6-42eb-8621-acb35a8ee1d3';

export const ETHER_NETWORK =
  mode === MODE.PRODUCTION ? { id: 1, network: 'mainnet' } : { id: 5, network: 'goerli' };

export const infuraApiKey =
  process.env.NEXT_PUBLIC_INFURA_KEY || 'f35c2a4f3d0941a38a3edb62ed10c847';

export const RPC_URL = `https://${ETHER_NETWORK.network}.infura.io/v3/${infuraApiKey}`;

export const appName = 'Swingby Explorer';

export const ENDPOINT_SKYBRIDGE_EXCHANGE = 'https://network.skybridge.exchange/api/v1';

export const ENDPOINT_ETHEREUM_NODE =
  process.env.NEXT_PUBLIC_ETHEREUM_NODE_ENDPOINT || mode === MODE.PRODUCTION
    ? 'https://btc-wbtc-mainnet.quantexe.com'
    : 'https://tbtc-goerli-node-1.swingby.network';

export const ENDPOINT_BINANCE_NODE =
  process.env.NEXT_PUBLIC_BINANCE_NODE_ENDPOINT || 'https://testnet-node.swingby.network';

export const ENDPOINT_EARNINGS =
  process.env.NEXT_PUBLIC_EARNINGS_ENDPOINT || 'https://earnings-api.vercel.app/api/earnings';

export const ENDPOINT_COINGECKO = 'https://api.coingecko.com/api/v3';

export const ENDPOINT_ETHERSCAN =
  mode === MODE.PRODUCTION ? 'https://api.etherscan.io' : 'https://api-goerli.etherscan.io';

export const ENDPOINT_BSCSCAN =
  mode === MODE.PRODUCTION ? 'https://api.bscscan.com' : 'https://api-testnet.bscscan.com';

export const URL_ETHERSCAN =
  mode === MODE.PRODUCTION ? 'https://etherscan.io' : 'https://goerli.etherscan.io';

export const CACHED_ENDPOINT = 'https://metanode-earnings.vercel.app/api';

// Memo: BTCE contract address as WBTC in testnet
export const CONTRACT_WBTC =
  process.env.NEXT_PUBLIC_CONTRACT_WBTC || mode === MODE.PRODUCTION
    ? CONTRACTS.coins.WBTC.production.address
    : CONTRACTS.coins.WBTC.test.address;

export const CONTRACT_SB_BTC =
  process.env.NEXT_PUBLIC_SB_BTC || mode === MODE.PRODUCTION
    ? CONTRACTS.coins.sbBTC.production.address
    : CONTRACTS.coins.sbBTC.test.address;

// Todo: implement production address once sbBTC_BEP20 for mainnet has been deployed
export const CONTRACT_BEP20_SB_BTC =
  process.env.NEXT_PUBLIC_SB_BTC || mode === MODE.PRODUCTION
    ? CONTRACTS.coins['sbBTC.BEP20'].test.address
    : CONTRACTS.coins['sbBTC.BEP20'].test.address;

// Memo: BTC is not on Ethereum, it doesn’t have an address, so the contract uses this one to represent BTC
export const ZERO_ADDRESS = CONTRACTS.coins.BTC.production.address;
