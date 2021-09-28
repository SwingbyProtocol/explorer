import { Icon } from '@swingby-protocol/pulsar';

import { PATH } from '../env';

export const URL = {
  Swingby: 'https://swingby.network/',
  Earn: 'https://swingby.network/earn',
  WhatIsSwingby: 'https://swingby.network/about-swingby',
  WhitePaper: 'https://docs.swingby.network/SwingbySkybridge_WhitePaper_v1.0.0_14112019.pdf',
  SwingbyDocs: 'https://skybridge-docs.swingby.network/',
  TermsOfUse: 'https://docs.swingby.network/terms.pdf',
  PrivacyPolicy: 'https://docs.swingby.network/privacy-policy.pdf',
  Discord: 'https://swingby.network/discord',
  Twitter: 'https://twitter.com/SwingbyProtocol',
  Telegram: 'https://swingby.network/telegram',
  Medium: 'https://swingby.medium.com/',
  Reddit: 'https://swingby.network/reddit',
  GitHub: 'https://github.com/SwingbyProtocol/',
  Support: 'support@swingby.network',
  HowItWorks: 'https://skybridge-docs.swingby.network/how-it-works',
  SwapFees: 'https://tbtc-goerli-node-1.swingby.network/api/v1/swaps/fees',
  SkybridgeMainnet: 'https://skybridge.info/',
  SkybridgeTestnet: 'https://testnet.skybridge.info/',
  Erc20Bridge: 'https://bridge.swingby.network/',
  YieldFarming: 'https://farm.swingby.network/',
};

export const Links = [
  { link: URL.WhatIsSwingby, description: 'footer.what-is-swingby' },
  { link: URL.Earn, description: 'footer.earn' },
  { link: PATH.FEES, description: 'footer.transaction-fees' },
  { link: URL.Erc20Bridge, description: 'footer.erc20' },
  { link: URL.YieldFarming, description: 'footer.yield-farming' },
];

export const Developers = [
  { link: URL.WhitePaper, description: 'footer.white-paper' },
  { link: URL.SwingbyDocs, description: 'footer.documentation' },
];

export const Terms = [
  {
    link: URL.PrivacyPolicy,
    description: 'footer.privacy-policy',
  },
  { link: URL.TermsOfUse, description: 'footer.terms-of-use' },
];

export const Media = [
  {
    link: URL.Twitter,
    icon: <Icon.Twitter />,
  },
  {
    link: URL.Discord,
    icon: <Icon.Discord />,
  },
  {
    link: URL.Telegram,
    icon: <Icon.Telegram />,
  },
  {
    link: URL.Medium,
    icon: <Icon.Medium />,
  },
  {
    link: URL.Reddit,
    icon: <Icon.Reddit />,
  },
  {
    link: URL.GitHub,
    icon: <Icon.GitHub />,
  },
];
