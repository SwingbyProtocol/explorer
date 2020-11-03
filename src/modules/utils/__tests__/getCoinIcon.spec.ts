import { CoinSymbol } from '../../constants';
import { getCoinIcon } from '../getCoinIcon';

it('should return svg file name of chosen coins', () => {
  expect(getCoinIcon(CoinSymbol.BTC)).toStrictEqual('BTC.svg');

  expect(getCoinIcon(CoinSymbol.BTC_S)).toStrictEqual('BTCS.svg');

  expect(getCoinIcon(CoinSymbol.BTC_B)).toStrictEqual('BTCS.svg');

  expect(getCoinIcon('DummyCoin')).toStrictEqual('');
});
