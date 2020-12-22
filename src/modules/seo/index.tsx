import { NextSeo } from 'next-seo';
import React from 'react';

import { DEPLOYED_URL } from '../env';

export const SEO = () => {
  const url = DEPLOYED_URL;
  const content =
    'Swap BTC to and from Binance Chain and other blockchains. It’s non-custodial and decentralized';
  const title = 'Swingby Skybridge';
  const image = 'https://dl.dropboxusercontent.com/s/133s5bap3tbbonv/RebrandOG.jpg';

  return (
    <NextSeo
      title={title}
      description={content}
      openGraph={{
        url: url,
        title: title,
        description: title,
        images: [
          {
            url: image,
            width: 1280,
            height: 672,
            alt: title,
          },
        ],
        site_name: title,
      }}
      twitter={{
        handle: '@SwingbyProtocol',
        site: '@SwingbyProtocol',
        cardType: 'summary_large_image',
      }}
    />
  );
};
