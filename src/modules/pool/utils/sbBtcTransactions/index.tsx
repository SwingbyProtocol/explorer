import { SkybridgeBridge } from '@swingby-protocol/sdk';

import {
  ENDPOINT_ETHERSCAN,
  etherscanApiKey,
  CONTRACT_SKYPOOL_SB_BTC,
  URL_ETHERSCAN,
} from '../../../env';

export const getScanApiBaseEndpoint = (bridge: SkybridgeBridge) => {
  switch (bridge) {
    case 'btc_skypool':
      return ENDPOINT_ETHERSCAN;

    default:
      return ENDPOINT_ETHERSCAN;
  }
};

export const getScanDetailBaseEndpoint = (bridge: SkybridgeBridge) => {
  switch (bridge) {
    case 'btc_skypool':
      return URL_ETHERSCAN;

    default:
      return URL_ETHERSCAN;
  }
};

export const getScanApiKey = (bridge: SkybridgeBridge) => {
  switch (bridge) {
    case 'btc_skypool':
      return etherscanApiKey;

    default:
      return etherscanApiKey;
  }
};

export const getSbBtcContract = (bridge: SkybridgeBridge) => {
  switch (bridge) {
    case 'btc_skypool':
      return CONTRACT_SKYPOOL_SB_BTC;

    default:
      return CONTRACT_SKYPOOL_SB_BTC;
  }
};
