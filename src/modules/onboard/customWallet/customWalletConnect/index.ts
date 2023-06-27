import { CommonWalletOptions, WalletModule } from 'bnc-onboard/dist/src/interfaces'; // eslint-disable-line
import { EthereumProvider } from '@walletconnect/ethereum-provider';

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
      const provider = await EthereumProvider.init({
        projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID, // required
        chains: [networkId], // required
        showQrModal: true, // requires @walletconnect/modal
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
              provider.on('accountsChanged', (accounts: string[]) => func(accounts[0]));
            },
          },
          network: {
            onChange: (func) => {
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
            provider.disconnect();
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
