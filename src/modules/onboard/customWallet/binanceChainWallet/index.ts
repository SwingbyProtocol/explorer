import { CommonWalletOptions, Helpers, WalletModule } from 'bnc-onboard/dist/src/interfaces'; // eslint-disable-line
import { binanceChainWalletLogo } from './logo';

// Ref: https://github.com/blocknative/onboard/blob/develop/src/modules/select/wallets/metamask.ts

const extensionInstallMessage = (helpers: {
  currentWallet: string | undefined;
  selectedWallet: string;
}) => {
  const { currentWallet, selectedWallet } = helpers;

  if (currentWallet) {
    return `
    <p style="font-size: 0.889rem; font-family: inherit; margin: 0.889rem 0;">
    We have detected that you already have
    <b>${currentWallet}</b>
    installed. If you would prefer to use
    <b>${selectedWallet}</b>
    instead, then click below to install.
    </p>
    <p style="font-size: 0.889rem; font-family: inherit; margin: 0.889rem 0;">
    <b>Tip:</b>
    If you already have ${selectedWallet} installed, check your
    browser extension settings to make sure that you have it enabled
    and that you have disabled any other browser extension wallets.
    <span
      class="bn-onboard-clickable"
      style="color: #4a90e2; font-size: 0.889rem; font-family: inherit;"
      onclick="window.location.reload();">
      Then refresh the page.
    </span>
    </p>
    `;
  } else {
    return `
    <p style="font-size: 0.889rem; font-family: inherit; margin: 0.889rem 0;">
    You'll need to install <b>${selectedWallet}</b> to continue. Once you have it installed, go ahead and
    <span
    class="bn-onboard-clickable"
      style="color: #4a90e2; font-size: 0.889rem; font-family: inherit;"
      onclick={window.location.reload();}>
      refresh the page.
    </span>
    ${
      selectedWallet === 'Opera'
        ? '<br><br><i>Hint: If you already have Opera installed, make sure that your web3 wallet is <a style="color: #4a90e2; font-size: 0.889rem; font-family: inherit;" class="bn-onboard-clickable" href="https://help.opera.com/en/touch/crypto-wallet/" rel="noreferrer noopener" target="_blank">enabled</a></i>'
        : ''
    }
    </p>
    `;
  }
};

const mobileWalletInstallMessage = (helpers: { selectedWallet: string }) => {
  const { selectedWallet } = helpers;

  return `
  <p style="font-size: 0.889rem;">
  Tap the button below to <b>Open ${selectedWallet}</b>. Please access this site on ${selectedWallet}'s in-app browser for a seamless experience.
  </p>
  `;
};

export function binanceChainWallet(
  options: CommonWalletOptions & { isMobile: boolean },
): WalletModule {
  const { preferred, label, iconSrc, svg, isMobile } = options;

  return {
    name: label || 'Binance Chain Wallet',
    iconSrc: iconSrc || binanceChainWalletLogo,
    iconSrcSet: iconSrc || binanceChainWalletLogo,
    svg: svg || binanceChainWalletLogo,
    wallet: async (helpers: Helpers) => {
      const { createModernProviderInterface } = helpers;

      // Ref: https://binance-wallet.gitbook.io/binance-chain-extension-wallet
      const provider = (window as any).BinanceChain;

      return {
        provider,
        interface: provider && createModernProviderInterface(provider),
      };
    },
    type: 'injected',
    link: 'https://docs.binance.org/smart-chain/wallet/binance.html#download-link',
    installMessage: isMobile ? mobileWalletInstallMessage : extensionInstallMessage,
    desktop: true,
    mobile: false,
    preferred,
  };
}
