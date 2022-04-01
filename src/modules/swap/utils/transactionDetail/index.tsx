import { CoinSymbol, ETHCoins } from '../../../coins';
import { BTC_EXPLORER, URL_BSCSCAN, URL_ETHERSCAN } from '../../../env';

export const transactionDetailByTxId = (currency: CoinSymbol, hash: string): string => {
  const btcBaseUrl = BTC_EXPLORER + '/tx';

  const etherBaseUrl = URL_ETHERSCAN + '/tx';

  if (currency === CoinSymbol.BTC) {
    return `${btcBaseUrl}/${hash}`;
  }
  if (ETHCoins.includes(currency)) {
    return `${etherBaseUrl}/${hash}`;
  }
  return 'invalid format';
};

export const transactionDetailByAddress = (currency: CoinSymbol, address: string): string => {
  const btcBaseUrl = BTC_EXPLORER + '/address';

  const etherBaseUrl = URL_ETHERSCAN + '/address';

  if (currency === CoinSymbol.BTC) {
    return `${btcBaseUrl}/${address}`;
  }
  if (ETHCoins.includes(currency)) {
    return `${etherBaseUrl}/${address}`;
  }
  return 'invalid format';
};
