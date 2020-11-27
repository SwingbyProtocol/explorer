import Onboard from 'bnc-onboard';

import { BLOCK_NATIVE_API_KEY, GOERLI_NETWORK } from '../../env';

const networkId = GOERLI_NETWORK;
const dappId = BLOCK_NATIVE_API_KEY;

// Ref: https://github.com/blocknative/react-demo/blob/master/src/services.js
export const initOnboard = (subscriptions) => {
  return Onboard({
    dappId,
    networkId,
    hideBranding: true,
    subscriptions,
    walletSelect: {
      wallets: [{ walletName: 'metamask' }],
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
