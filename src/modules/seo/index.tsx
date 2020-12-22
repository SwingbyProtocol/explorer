import { NextSeo } from 'next-seo';
import React from 'react';

export const SEO = () => {
  const url = 'https://explorer.swingby.network/';
  const content =
    'Swap BTC to and from Binance Chain and other blockchains. It’s non-custodial and decentralized';
  const title = 'Swingby Skybridge';
  const image = 'https://dl.dropboxusercontent.com/s/m0gyt88p7h0cmte/OG_skybridge_1line%2Bcopy.jpg';

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
