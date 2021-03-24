import { SkybridgeBridge } from '@swingby-protocol/sdk';

import {
  ENDPOINT_BSCSCAN,
  ENDPOINT_ETHERSCAN,
  etherscanApiKey,
  bscscanApiKey,
  CONTRACT_SB_BTC,
  CONTRACT_BEP20_SB_BTC,
} from '../../../env';

export const getScanBaseEndpoint = (bridge: SkybridgeBridge) => {
  switch (bridge) {
    case 'btc_erc':
      return ENDPOINT_ETHERSCAN;

    case 'btc_bep20':
      return ENDPOINT_BSCSCAN;

    default:
      return ENDPOINT_ETHERSCAN;
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

export const getSbBtcContract = (bridge: SkybridgeBridge) => {
  switch (bridge) {
    case 'btc_erc':
      return CONTRACT_SB_BTC;

    case 'btc_bep20':
      return CONTRACT_BEP20_SB_BTC;

    default:
      return CONTRACT_SB_BTC;
  }
};
