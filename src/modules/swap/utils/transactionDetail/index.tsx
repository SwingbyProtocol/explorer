import { CoinSymbol, ETHCoins, BTCBCoins } from '../../../coins';
import { BTC_EXPLORER, URL_BSCSCAN, URL_ETHERSCAN } from '../../../env';

export const transactionDetailByTxId = (currency: CoinSymbol, hash: string): string => {
  const btcBaseUrl = BTC_EXPLORER + '/tx';

  const bnbBaseUrl = URL_BSCSCAN + '/tx';

  const etherBaseUrl = URL_ETHERSCAN + '/tx';

  if (currency === CoinSymbol.BTC) {
    return `${btcBaseUrl}/${hash}`;
  }
  if (ETHCoins.includes(currency)) {
    return `${etherBaseUrl}/${hash}`;
  }
  if (BTCBCoins.includes(currency)) {
    return `${bnbBaseUrl}/${hash}`;
  }
  return 'invalid format';
};

export const transactionDetailByAddress = (currency: CoinSymbol, address: string): string => {
  const btcBaseUrl = BTC_EXPLORER + '/address';

  const bnbBaseUrl = URL_BSCSCAN + '/address';

  const etherBaseUrl = URL_ETHERSCAN + '/address';

  if (currency === CoinSymbol.BTC) {
    return `${btcBaseUrl}/${address}`;
  }
  if (ETHCoins.includes(currency)) {
    return `${etherBaseUrl}/${address}`;
  }
  if (BTCBCoins.includes(currency)) {
    return `${bnbBaseUrl}/${address}`;
  }
  return 'invalid format';
};
