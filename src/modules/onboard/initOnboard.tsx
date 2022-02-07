import Onboard from 'bnc-onboard';
import type { Subscriptions } from 'bnc-onboard/dist/src/interfaces'; // eslint-disable-line import/no-internal-modules

import { appName, blocknativeApiKey, infuraApiKey, WC_BRIDGE } from '../env';

import { getNetworkFromId } from '.';

const RPC_URLS = {
  1: `https://mainnet.infura.io/v3/${infuraApiKey}`,
  3: `https://ropsten.infura.io/v3/${infuraApiKey}`,
  56: 'https://bsc-dataseed1.binance.org:443',
  97: 'https://data-seed-prebsc-1-s1.binance.org:8545',
} as const;

export const initOnboard = ({
  networkId = 1,
  subscriptions,
}: {
  networkId?: keyof typeof RPC_URLS;
  subscriptions: Subscriptions;
}) => {
  const rpcUrl = RPC_URLS[networkId];
  if (!rpcUrl) {
    throw new Error(`Could not find RPC URL for network ID: "${networkId}"`);
  }
  const networkName = getNetworkFromId(networkId);

  // Onboard bug: metamask's `preferred` becomes 'false' if gives 'preferred: true' to other wallets
  const wallets = [
    { walletName: 'metamask', preferred: true },
    // customWalletConnect({
    //   walletName: 'WalletConnect',
    //   isMobile: true,
    //   networkId,
    // }),
    {
      walletName: 'walletConnect',
      bridge: WC_BRIDGE,
      preferred: true,
      rpc: RPC_URLS,
    },
    {
      walletName: 'ledger',
      rpcUrl,
      preferred: true,
    },
    { walletName: 'walletLink', rpcUrl, appName, preferred: true },
    { walletName: 'authereum' },
    { walletName: 'lattice', rpcUrl, appName },
    { walletName: 'torus' },
    { walletName: 'opera' },
    {
      walletName: 'trezor',
      email: 'info@swingby.network',
      appUrl: appName,
      rpcUrl,
    },
  ];

  return Onboard({
    dappId: blocknativeApiKey,
    networkId,
    networkName,
    hideBranding: true,
    subscriptions,
    walletSelect: {
      wallets,
    },
    walletCheck: [
      { checkName: 'derivationPath' },
      { checkName: 'connect' },
      { checkName: 'accounts' },
      { checkName: 'network' },
      // Memo: Remove this for bypass miss leading when connect BSC
      // { checkName: 'balance', minimumBalance: '100000' },
    ],
  });
};
