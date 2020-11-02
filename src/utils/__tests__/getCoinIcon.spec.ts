import { getCoinIcon } from '../getCoinIcon';
import { CoinSymbol } from '../../types';

it('should return svg file name of chosen coins', () => {
  expect(getCoinIcon(CoinSymbol.BTC)).toStrictEqual('BTC.svg');

  expect(getCoinIcon(CoinSymbol.BTC_S)).toStrictEqual('BTCS.svg');

  expect(getCoinIcon(CoinSymbol.BTC_B)).toStrictEqual('BTCS.svg');

  expect(getCoinIcon('DummyCoin')).toStrictEqual('');
});
