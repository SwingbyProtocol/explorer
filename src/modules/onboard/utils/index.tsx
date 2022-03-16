import { AVAILABLE_CHAIN_IDS, mode } from '../../env';

const AVAILABLE_CHAIN_IDS_NAME = {
  [AVAILABLE_CHAIN_IDS.Mainnet]: 'Ethereum mainnet',
  [AVAILABLE_CHAIN_IDS.Ropsten]: 'Ropsten testnet',
};

export const showConnectNetwork = (): string => {
  return AVAILABLE_CHAIN_IDS_NAME[getNetworkId()];
};

export const getNetworkId = (): AVAILABLE_CHAIN_IDS => {
  return mode === 'production' ? AVAILABLE_CHAIN_IDS.Mainnet : AVAILABLE_CHAIN_IDS.Ropsten;
};

export const getNetworkFromId = (id: 1 | 3): string => {
  switch (id) {
    case 1:
      return AVAILABLE_CHAIN_IDS_NAME[AVAILABLE_CHAIN_IDS.Mainnet];
    case 3:
      return AVAILABLE_CHAIN_IDS_NAME[AVAILABLE_CHAIN_IDS.Ropsten];

    default:
      return AVAILABLE_CHAIN_IDS_NAME[AVAILABLE_CHAIN_IDS.Mainnet];
  }
};
