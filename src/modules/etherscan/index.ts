import { SkybridgeBridge } from '@swingby-protocol/sdk';

import {
  bscscanApiKey,
  ENDPOINT_BSCSCAN,
  ENDPOINT_ETHERSCAN,
  etherscanApiKey,
  URL_BSCSCAN,
  URL_ETHERSCAN,
} from '../env';

export type EtherscanResult = {
  result: Array<{
    blockNumber: string;
    timeStamp: string;
    input: string;
    hash: string;
  }>;
};

export const getScanApiBaseEndpoint = (bridge: SkybridgeBridge) => {
  switch (bridge) {
    case 'btc_erc':
      return ENDPOINT_ETHERSCAN;

    case 'btc_bep20':
      return ENDPOINT_BSCSCAN;

    default:
      return ENDPOINT_ETHERSCAN;
  }
};

export const getScanDetailBaseEndpoint = (bridge: SkybridgeBridge) => {
  switch (bridge) {
    case 'btc_erc':
      return URL_ETHERSCAN;

    case 'btc_bep20':
      return URL_BSCSCAN;

    default:
      return URL_ETHERSCAN;
  }
};

export const getScanApiKey = (bridge: SkybridgeBridge) => {
  switch (bridge) {
    case 'btc_erc':
      return etherscanApiKey;

    case 'btc_bep20':
      return bscscanApiKey;

    default:
      return etherscanApiKey;
  }
};
