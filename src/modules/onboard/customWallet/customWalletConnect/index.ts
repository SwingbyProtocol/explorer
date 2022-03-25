import WalletConnectProvider from '@walletconnect/web3-provider';
import { CommonWalletOptions, Helpers, WalletModule } from 'bnc-onboard/dist/src/interfaces'; // eslint-disable-line
import { infuraApiKey, WC_BRIDGE } from '../../../env';

import { walletConnectLogo } from './logo';

export function customWalletConnect(
  options: CommonWalletOptions & { isMobile: boolean },
): WalletModule {
  const { networkId, isMobile, preferred } = options;

  return {
    name: 'WalletConnect',
    iconSrc: walletConnectLogo,
    iconSrcSet: walletConnectLogo,
    svg: walletConnectLogo,
    wallet: async () => {
      const POLLING_INTERVAL = 12000;
      const bscRpcUrl = 'https://bsc-dataseed1.binance.org:443';
      const provider = new WalletConnectProvider({
        rpc: {
          1: `https://mainnet.infura.io/v3/${infuraApiKey}`,
          56: bscRpcUrl,
        },
        bridge: WC_BRIDGE,
        pollingInterval: POLLING_INTERVAL,
        chainId: networkId,
      });

      return {
        provider,
        interface: {
          name: 'WalletConnect',
          connect: () =>
            new Promise((resolve, reject) => {
              provider
                .enable()
                .then(resolve)
                .catch(() =>
                  reject({
                    message: 'This dapp needs access to your account information.',
                  }),
                );
            }),
          address: {
            onChange: (func) => {
              provider
                .send('eth_accounts')
                .then((accounts: string[]) => accounts[0] && func(accounts[0]));
              provider.on('accountsChanged', (accounts: string[]) => func(accounts[0]));
            },
          },
          network: {
            onChange: (func) => {
              provider.send('eth_chainId').then(func);
              provider.on('chainChanged', func);
            },
          },
          balance: {
            get: async () => {
              // Memo: No function to check the balance. Return 1 to bypass the error
              return 1;
            },
          },
          disconnect: () => {
            provider.wc.killSession();
            provider.stop();
          },
        },
      };
    },
    type: 'sdk',
    link: 'https://walletconnect.org/',
    desktop: true,
    mobile: isMobile,
    preferred,
  };
}
