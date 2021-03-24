import { CoinSymbol, ETHCoins, BTCBCoins } from '../../../coins';
import { MODE, mode } from '../../../env';

const btcExplorerBaseUrl =
  mode === MODE.PRODUCTION
    ? 'https://www.blockchain.com/btc'
    : 'https://www.blockchain.com/btc-testnet';

const bnbExplorerBaseUrl =
  mode === MODE.PRODUCTION
    ? 'https://explorer.binance.org'
    : 'https://testnet-explorer.binance.org';

const etherExplorerBaseUrl =
  mode === MODE.PRODUCTION ? 'https://etherscan.io' : 'https://goerli.etherscan.io';

export const transactionDetailByTxId = (currency: CoinSymbol, hash: string): string => {
  const btcBaseUrl = btcExplorerBaseUrl + '/tx';

  const bnbBaseUrl = bnbExplorerBaseUrl + '/tx';

  const etherBaseUrl = etherExplorerBaseUrl + '/tx';

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
  const btcBaseUrl = btcExplorerBaseUrl + '/address';

  const bnbBaseUrl = bnbExplorerBaseUrl + '/address';

  const etherBaseUrl = etherExplorerBaseUrl + '/address';

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
