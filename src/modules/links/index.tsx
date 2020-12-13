import { Icon } from '@swingby-protocol/pulsar';

export const URL = {
  SwingbyDocs: 'https://skybridge-docs.swingby.network/',
  Support: 'support@swingby.network',
  HowItWorks: 'https://skybridge-docs.swingby.network/how-it-works',
  TermsOfUse: 'https://docs.swingby.network/terms.pdf',
  Swingby: 'https://swingby.network/en',
  StakingPortal: 'https://stake.swingby.network/',
  PrivacyPolicy: 'https://docs.swingby.network/privacy-policy.pdf',
  Discord: 'https://discord.com/invite/WV8H9jc',
  Twitter: 'https://twitter.com/swingbyprotocol/',
  Medium: 'https://swingby.medium.com/',
  GitHub: 'https://github.com/SwingbyProtocol/',
  MetamaskAddCoin:
    'https://metamask.zendesk.com/hc/en-us/articles/360015489031-How-to-View-See-Your-Tokens-in-Metamask',
};

export const Links = [
  { link: URL.Swingby, description: 'Home' },
  { link: URL.TermsOfUse, description: 'Terms of Use' },
  {
    link: URL.PrivacyPolicy,
    description: 'Privacy Policy',
  },
];

export const Media = [
  {
    link: URL.Discord,
    icon: <Icon.InfoCircle />,
  },
  {
    link: URL.Twitter,
    icon: <Icon.Twitter />,
  },
  {
    link: URL.Medium,
    icon: <Icon.Medium />,
  },
  {
    link: URL.GitHub,
    icon: <Icon.Search />,
  },
];
