import { CoinSymbol, ETHCoins, BTCBCoins } from '../../../coins';
import { NETWORK } from '../../../env';

export const transactionDetail = (currency: string, hash: string): string => {
  const btcExplorerBaseUrl = 'https://www.blockchain.com/btc-testnet/tx';

  const bnbExplorerBaseUrl =
    NETWORK === 'mainnet'
      ? 'https://explorer.binance.org/tx'
      : 'https://testnet-explorer.binance.org/tx';

  const etherExplorerBaseUrl =
    NETWORK === 'mainnet' ? 'https://etherscan.io/tx' : 'https://goerli.etherscan.io/tx';

  if (currency === CoinSymbol.BTC) {
    return `${btcExplorerBaseUrl}/${hash}`;
  }
  if (ETHCoins.includes(currency)) {
    return `${etherExplorerBaseUrl}/${hash}`;
  }
  if (BTCBCoins.includes(currency)) {
    return `${bnbExplorerBaseUrl}/${hash}`;
  }
  return 'invalid format';
};
