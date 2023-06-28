module.exports = {
  i18n: {
    locales: ['en', 'ja', 'zh', 'zh-TW'],
    defaultLocale: 'en',
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /@walletconnect\/.*.js$/,
      use: [options.defaultLoaders.babel],
    });

    return config;
  },
};
