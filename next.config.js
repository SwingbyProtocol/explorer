/* eslint-disable */
// Ref: https://github.com/cyrilwanner/next-compose-plugins
// Ref: https://nextjs.org/docs/api-reference/next.config.js/static-optimization-indicator

const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const i18n = require('react-intl');

const nextConfig = {
  // Memo: take out pretender indicator when running `yarn dev`
  devIndicators: {
    autoPrerender: false,
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty',
      };
    }

    return config;
  },
};

module.exports = withPlugins(
  [
    [
      withImages,
      {
        webpack(config, options) {
          return config;
        },
      },
    ],
    [
      i18n,
      {
        locales: ['en-US'],
        defaultLocale: 'en-US',
      },
    ],
  ],
  nextConfig,
);

// module.exports = {
//   i18n: {
//     locales: ['en', 'ja', 'zh', 'zh-TW'],
//     defaultLocale: 'en',
//   },
// };
