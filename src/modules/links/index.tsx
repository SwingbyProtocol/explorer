import { Icon } from '@swingby-protocol/pulsar';

export const URL = {
  Swingby: 'https://swingby.network/',
  Earn: 'https://swingby.network/earn',
  Home: 'https://swingby.network',
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
  SwapFees: 'https://tbtc-ropsten-node-1.swingby.network/api/v1/swaps/fees',
  SkybridgeMainnet: 'https://app.swingby.network/',
  SkybridgeTestnet: 'https://testnet.skybridge.info/',
  Erc20Bridge: 'https://bridge.swingby.network/',
  YieldFarming: 'https://farm.swingby.network/',
  BecomeLiquidityProvider:
    'https://skybridge-docs.swingby.network/getting-start/becoming-a-liquidity-provider',
  Fees: 'https://skybridge-docs.swingby.network/getting-start/network-fees',

  MigrateBep20: 'https://bscscan.com/address/0x71de20e0c4616e7fcbfdd3f875d568492cbe4739',
  MigrateErc20: 'https://etherscan.io/token/0x8287c7b963b405b7b8d467db9d79eec40625b13a',
  MigrateIn: 'https://bscscan.com/address/0x640534D32D015e4C80318ad5256Ec7962fDB155f',
  MigrateOut: 'https://etherscan.io/address/0x640534D32D015e4C80318ad5256Ec7962fDB155f',
};

export const Links = [
  { link: URL.Home, description: 'footer.home' },
  { link: URL.Fees, description: 'footer.transaction-fees' },
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
