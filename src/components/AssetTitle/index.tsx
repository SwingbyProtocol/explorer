import { Text } from '@swingby-protocol/pulsar';
import { useRouter } from 'next/router';
import React from 'react';

import { AssetTitleContainer, Coin } from './styled';

export const AssetTitle = () => {
  const router = useRouter();

  const getCoinName = (path: string) => {
    const pathStrings = path.split('/');
    const coin = pathStrings[pathStrings.length - 1];
    switch (coin) {
      case 'bitcoin':
        return { code: 'BTC', text: 'Bitcoin' };
      case 'wbtc':
        return {
          code: 'WBTC',
          text: 'WBTC',
        };

      default:
        break;
    }
  };

  const coin = getCoinName(router.pathname);

  return (
    <AssetTitleContainer>
      <Coin symbol={coin.code} />
      <Text>{coin.text}</Text>
    </AssetTitleContainer>
  );
};
