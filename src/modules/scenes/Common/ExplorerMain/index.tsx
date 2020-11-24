import { PulsarThemeProvider } from '@swingby-protocol/pulsar';
import { useRouter } from 'next/router';
import React from 'react';

import { AccountId } from '../../../../components/AccountId';
import { Search } from '../../../../components/Search';
import { titleGenerator } from '../../../common';
import { PATH } from '../../../env';
import { Browser, BrowserDetail, BrowserPool } from '../../Main';

import { ExplorerMainContainer, HeadLine, TitleH1 } from './styled';

export const ExplorerMain = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  const switchBrowser = (path: string): JSX.Element => {
    switch (path) {
      case PATH.ROOT:
        return <Browser />;
      case PATH.SWAP + '/[hash]':
        return <BrowserDetail />;
      case PATH.POOL:
        return <BrowserPool />;

      default:
        <Browser />;
    }
  };

  const switchRightComponent = (path: string): JSX.Element => {
    switch (path) {
      case PATH.ROOT:
        return <Search />;
      case PATH.SWAP + '/[hash]':
        return <Search />;
      case PATH.POOL:
        return <AccountId />;

      default:
        <Browser />;
    }
  };

  return (
    <PulsarThemeProvider theme="accent">
      <ExplorerMainContainer>
        <HeadLine>
          <TitleH1>{titleGenerator(currentPath)}</TitleH1>
          <PulsarThemeProvider>{switchRightComponent(currentPath)}</PulsarThemeProvider>
        </HeadLine>
        <PulsarThemeProvider>{switchBrowser(currentPath)}</PulsarThemeProvider>
      </ExplorerMainContainer>
    </PulsarThemeProvider>
  );
};
