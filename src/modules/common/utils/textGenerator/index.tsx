import { FormattedMessage } from 'react-intl';

import { PATH } from '../../../env';

export const titleGenerator = (path: string): JSX.Element => {
  switch (path) {
    case PATH.ROOT:
      return <FormattedMessage id="home.explorer" />;
    case PATH.SWAP + '/[hash]':
      return <FormattedMessage id="home.explorer" />;
    case PATH.POOL:
      return <FormattedMessage id="pool.liquidity" />;
    case PATH.METANODES:
      return <FormattedMessage id="metanodes.metanodes" />;
    case PATH.FEES:
      return <FormattedMessage id="fees.fees" />;

    default:
      break;
  }
};

export const ellipseAddress = (address: string = '', width: number = 12): string => {
  return `${address.slice(0, width)}...${address.slice(-width)}`;
};
