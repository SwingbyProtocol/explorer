import { PulsarThemeProvider } from '@swingby-protocol/pulsar';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useTheme } from 'styled-components';

import { AccountId } from '../../../../components/AccountId';
import { Footer } from '../../../../components/Footer';
import { Search } from '../../../../components/Search';
import { scrollToTop, titleGenerator } from '../../../common';
import { PATH } from '../../../env';
import { useThemeSettings } from '../../../store/settings';
import {
  Browser,
  BrowserAsset,
  BrowserDetail,
  BrowserFees,
  BrowserMetanodes,
  BrowserPool,
  BrowserLiquidity,
  BrowserSwap,
} from '../../Main';

import { ExplorerMainContainer, HeadLine, TitleH1 } from './styled';

export const ExplorerMain = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  useEffect(() => {
    scrollToTop();
  }, [currentPath]);

  const [theme] = useThemeSettings();
  const { pulsar } = useTheme();
  const themeId = pulsar.id;

  const switchBrowser = (path: string): JSX.Element => {
    switch (path) {
      case PATH.ROOT:
        return <BrowserSwap />;
      case PATH.EXPLORER:
        return <Browser />;
      case PATH.LIQUIDITY:
        return <BrowserLiquidity />;
      case PATH.SWAP + '/[hash]':
        return <BrowserDetail />;
      case PATH.FLOAT + '/[hash]':
        return <BrowserDetail />;
      case PATH.POOL:
        return <BrowserPool />;
      case PATH.METANODES:
        return <BrowserMetanodes />;
      case PATH.FEES:
        return <BrowserFees />;
      case PATH.ASSET_BTC:
        return <BrowserAsset />;
      case PATH.ASSET_WBTC:
        return <BrowserAsset />;

      default:
        <Browser />;
    }
  };

  const switchRightComponent = (path: string): JSX.Element => {
    switch (path) {
      case PATH.ROOT:
        return <></>;
      case PATH.EXPLORER:
        return <Search />;
      case PATH.LIQUIDITY:
        return <></>;
      case PATH.SWAP + '/[hash]':
        return <Search />;
      case PATH.FLOAT + '/[hash]':
        return <Search />;
      case PATH.POOL:
        return <AccountId />;
      case PATH.METANODES:
        return <></>;
      case PATH.FEES:
        return <></>;
      case PATH.ASSET_BTC:
        return <></>;
      case PATH.ASSET_WBTC:
        return <></>;

      default:
        return <Search />;
    }
  };

  return (
    <PulsarThemeProvider theme="accent">
      <ExplorerMainContainer isLightTheme={themeId === 'PulsarLight'}>
        <HeadLine>
          <TitleH1>{titleGenerator(currentPath)}</TitleH1>
          <PulsarThemeProvider theme={theme}>
            {switchRightComponent(currentPath)}
          </PulsarThemeProvider>
        </HeadLine>
        <PulsarThemeProvider theme={theme}>
          {switchBrowser(currentPath)}
          <Footer />
        </PulsarThemeProvider>
      </ExplorerMainContainer>
    </PulsarThemeProvider>
  );
};
