import { PATH } from '../../../env';

export const titleGenerator = (path: string): string => {
  switch (path) {
    case PATH.ROOT:
      return 'Skybridge Explorer';
    case PATH.SWAP + '/[hash]':
      return 'Skybridge Explorer';
    case PATH.POOL:
      return 'Pool Liquidity';

    default:
      break;
  }
};
