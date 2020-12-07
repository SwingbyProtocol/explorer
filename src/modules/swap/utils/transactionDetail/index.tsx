import { CoinSymbol, ETHCoins, BTCBCoins } from '../../../coins';
import { mode } from '../../../env';

const btcExplorerBaseUrl =
  mode === 'production'
    ? 'https://www.blockchain.com/btc'
    : 'https://www.blockchain.com/btc-testnet';

const bnbExplorerBaseUrl =
  mode === 'production' ? 'https://explorer.binance.org' : 'https://testnet-explorer.binance.org';

const etherExplorerBaseUrl =
  mode === 'production' ? 'https://etherscan.io' : 'https://goerli.etherscan.io';

export const transactionDetailByTxId = (currency: string, hash: string): string => {
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

export const transactionDetailByAddress = (currency: string, address: string): string => {
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
