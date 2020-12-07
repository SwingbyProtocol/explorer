import Onboard from 'bnc-onboard';

import { APP_NAME, API_KEY_BLOCK_NATIVE, ETHER_NETWORK, INFURA_KEY, RPC_URL } from '../../env';

// Ref: https://github.com/blocknative/react-demo/blob/master/src/services.js
export const initOnboard = ({ isDarkMode, subscriptions }) => {
  return Onboard({
    dappId: API_KEY_BLOCK_NATIVE,
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
