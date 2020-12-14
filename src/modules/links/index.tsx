import { Icon } from '@swingby-protocol/pulsar';

export const URL = {
  Swingby: 'https://swingby.network/',
  Earn: 'https://swingby.network/earn',
  WhatIsSwingby: 'https://swingby.network/about-swingby',
  WhitePaper: 'https://docs.swingby.network/SwingbySkybridge_WhitePaper_v1.0.0_14112019.pdf',
  SwingbyDocs: 'https://skybridge-docs.swingby.network/',
  TermsOfUse: 'https://docs.swingby.network/terms.pdf',
  PrivacyPolicy: 'https://docs.swingby.network/privacy-policy.pdf',
  Discord: 'https://swingby.network/discord',
  Twitter: 'https://swingby.network/telegram',
  Medium: 'https://swingby.medium.com/',
  Reddit: 'https://swingby.network/reddit',
  GitHub: 'https://github.com/SwingbyProtocol/',
  Support: 'support@swingby.network',
  HowItWorks: 'https://skybridge-docs.swingby.network/how-it-works',
};

export const Links = [
  { link: URL.WhatIsSwingby, description: 'What is Swingby?' },
  { link: URL.Earn, description: 'Earn' },
];
export const Developers = [
  { link: URL.WhitePaper, description: 'White Paper' },
  { link: URL.SwingbyDocs, description: 'Documentation' },
];

export const Terms = [
  {
    link: URL.PrivacyPolicy,
    description: 'Privacy Policy',
  },
  { link: URL.TermsOfUse, description: 'Terms of Use' },
];

export const Media = [
  {
    link: URL.Discord,
    icon: <Icon.Discord />,
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
    link: URL.Reddit,
    icon: <Icon.Search />,
  },
  {
    link: URL.GitHub,
    icon: <Icon.GitHub />,
  },
];
