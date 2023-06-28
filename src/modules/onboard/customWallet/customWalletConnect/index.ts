import { CommonWalletOptions, WalletModule } from 'bnc-onboard/dist/src/interfaces'; // eslint-disable-line
import { EthereumProvider } from '@walletconnect/ethereum-provider';

import { walletConnectLogo } from './logo';

function toHexChainId(chainId: number): string {
  return `0x${chainId.toString(16)}`;
}

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

      let hasSession = false;
      if (provider.session) {
        hasSession = true;
        if (networkId !== provider.chainId) {
          // WalletConnect exposes connected accounts, not chains: `eip155:${chainId}:${address}`
          const isConnectedToDesiredChain = provider.session.namespaces.eip155.accounts.some(
            (account: string) => account.startsWith(`eip155:${networkId}:`),
          );
          if (!isConnectedToDesiredChain) {
            throw new Error(
              `Unknown chain (${networkId}). Make sure to include any chains you might connect to in the "chains" or "optionalChains" parameters when initializing WalletConnect.`,
            );
          }
          await provider.request<void>({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${networkId.toString(16)}` }],
          });
        }
      }

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
              if (hasSession) {
                func(provider.accounts[0]);
              }
              provider.on('accountsChanged', (accounts: string[]) => func(accounts[0]));
            },
          },
          network: {
            onChange: (func) => {
              if (hasSession) {
                func(toHexChainId(provider.chainId));
              }
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
