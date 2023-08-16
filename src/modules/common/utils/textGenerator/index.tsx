import { FormattedMessage } from 'react-intl';

import { AssetTitle } from '../../../../components/AssetTitle/';
import { PATH } from '../../../env';

export const titleGenerator = (path: string): JSX.Element => {
  switch (path) {
    case PATH.ROOT:
      return <FormattedMessage id="pool.swap" />;
    case PATH.EXPLORER:
      return <FormattedMessage id="home.explorer" />;
    case PATH.LIQUIDITY:
      return <FormattedMessage id="pool.liquidity" />;
    case PATH.EXPLORER + '/[hash]':
      return <FormattedMessage id="home.explorer" />;
    case PATH.POOL:
      return <FormattedMessage id="pool.liquidity" />;
    case PATH.METANODES:
      return <FormattedMessage id="metanodes.metanodes" />;
    case PATH.FEES:
      return <FormattedMessage id="fees.fees" />;
    case PATH.ASSET_BTC:
      return <AssetTitle />;
    case PATH.ASSET_WBTC:
      return <AssetTitle />;
    case PATH.MIGRATE:
      return <FormattedMessage id="migrate.title" />;

    default:
      break;
  }
};

export const ellipseAddress = (address: string = '', width: number = 12): string => {
  return `${address.slice(0, width)}...${address.slice(-width)}`;
};
