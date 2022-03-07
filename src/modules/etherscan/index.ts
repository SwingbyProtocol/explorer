import { SkybridgeBridge } from '@swingby-protocol/sdk';

import { ENDPOINT_ETHERSCAN, etherscanApiKey, URL_ETHERSCAN } from '../env';

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

    default:
      return ENDPOINT_ETHERSCAN;
  }
};

export const getScanDetailBaseEndpoint = (bridge: SkybridgeBridge) => {
  switch (bridge) {
    case 'btc_erc':
      return URL_ETHERSCAN;

    default:
      return URL_ETHERSCAN;
  }
};

export const getScanApiKey = (bridge: SkybridgeBridge) => {
  switch (bridge) {
    case 'btc_erc':
      return etherscanApiKey;

    default:
      return etherscanApiKey;
  }
};
