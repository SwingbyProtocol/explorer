import Onboard from 'bnc-onboard';

import { APP_NAME, BLOCK_NATIVE_API_KEY, ETHER_NETWORK, INFURA_KEY, RPC_URL } from '../../env';

// Ref: https://github.com/blocknative/react-demo/blob/master/src/services.js
export const initOnboard = ({ isDarkMode, subscriptions }) => {
  return Onboard({
    dappId: BLOCK_NATIVE_API_KEY,
    networkId: ETHER_NETWORK.id,
    hideBranding: true,
    darkMode: isDarkMode,
    subscriptions,
    walletSelect: {
      wallets: [
        { walletName: 'metamask', preferred: true },
        {
          walletName: 'ledger',
          rpcUrl: RPC_URL,
          preferred: true,
        },
        {
          walletName: 'walletConnect',
          infuraKey: INFURA_KEY,
          preferred: true,
        },
        { walletName: 'walletLink', rpcUrl: RPC_URL, appName: APP_NAME, preferred: true },
      ],
    },
    walletCheck: [
      { checkName: 'derivationPath' },
      { checkName: 'connect' },
      { checkName: 'accounts' },
      { checkName: 'network' },
      { checkName: 'balance', minimumBalance: '100000' },
    ],
  });
};
