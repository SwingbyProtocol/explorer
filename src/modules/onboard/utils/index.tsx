import { SkybridgeBridge } from '@swingby-protocol/sdk';

import { AVAILABLE_CHAIN_IDS, mode } from '../../env';

const AVAILABLE_CHAIN_IDS_NAME = {
  [AVAILABLE_CHAIN_IDS.Mainnet]: 'Ethereum mainnet',
  [AVAILABLE_CHAIN_IDS.Ropsten]: 'Ropsten testnet',
  [AVAILABLE_CHAIN_IDS.BSC]: 'BSC mainnet',
};

export const showConnectNetwork = (bridge: SkybridgeBridge): string => {
  if (bridge === 'btc_bep20') {
    return AVAILABLE_CHAIN_IDS_NAME[AVAILABLE_CHAIN_IDS.BSC];
  }
  return mode === 'production'
    ? AVAILABLE_CHAIN_IDS_NAME[AVAILABLE_CHAIN_IDS.Mainnet]
    : AVAILABLE_CHAIN_IDS_NAME[AVAILABLE_CHAIN_IDS.Ropsten];
};

export const getNetworkId = (bridge: SkybridgeBridge): AVAILABLE_CHAIN_IDS => {
  if (bridge === 'btc_bep20') {
    return AVAILABLE_CHAIN_IDS.BSC;
  }
  return mode === 'production' ? AVAILABLE_CHAIN_IDS.Mainnet : AVAILABLE_CHAIN_IDS.Ropsten;
};

export const getNetworkFromId = (id: 1 | 3 | 56): string => {
  switch (id) {
    case 1:
      return AVAILABLE_CHAIN_IDS_NAME[AVAILABLE_CHAIN_IDS.Mainnet];
    case 3:
      return AVAILABLE_CHAIN_IDS_NAME[AVAILABLE_CHAIN_IDS.Ropsten];
    case 56:
      return AVAILABLE_CHAIN_IDS_NAME[AVAILABLE_CHAIN_IDS.BSC];

    default:
      return AVAILABLE_CHAIN_IDS_NAME[AVAILABLE_CHAIN_IDS.Mainnet];
  }
};
