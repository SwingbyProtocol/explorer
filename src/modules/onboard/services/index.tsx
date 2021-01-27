import Onboard from 'bnc-onboard';

import { blocknativeApiKey, ETHER_NETWORK, infuraApiKey, appName, RPC_URL } from '../../env';

// Ref: https://github.com/blocknative/react-demo/blob/master/src/services.js
export const initOnboard = ({ subscriptions }) => {
  return Onboard({
    dappId: blocknativeApiKey,
    networkId: ETHER_NETWORK.id,
    hideBranding: true,
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
          infuraKey: infuraApiKey,
          preferred: true,
        },
        { walletName: 'walletLink', rpcUrl: RPC_URL, appName: appName, preferred: true },
        { walletName: 'authereum' },
        { walletName: 'lattice', rpcUrl: RPC_URL, appName: appName },
        { walletName: 'torus' },
        { walletName: 'opera' },
        {
          walletName: 'trezor',
          // Memo: Not sure if it is necessary to set the email
          // email: CONTACT_EMAIL,
          appUrl: appName,
          rpcUrl: RPC_URL,
        },
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
