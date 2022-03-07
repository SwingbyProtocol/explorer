import { mode } from '../../env';

export const showConnectNetwork = () => {
  return mode === 'production' ? 'Ethereum mainnet' : 'Ropsten testnet';
};

export const getNetworkId = () => {
  return mode === 'production' ? 1 : 3;
};

export const getNetworkFromId = (id: 1 | 3 | 56 | 97) => {
  switch (id) {
    case 1:
      return 'Ethereum mainnet';
    case 3:
      return 'Ropsten';
    case 56:
      return 'BSC mainnet';
    case 97:
      return 'BSC testnet';

    default:
      return 'Ethereum mainnet';
  }
};
