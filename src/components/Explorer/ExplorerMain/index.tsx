import { PulsarThemeProvider } from '@swingby-protocol/pulsar';
import React, { useState } from 'react';

import Browser from '../Browser';

import { ExplorerMainContainer, HeadLine, SearchIcon, SearchInput, TitleH1 } from './styled';

const ExplorerMain = (): JSX.Element => {
  const [search, setSearch] = useState('');
  return (
    <PulsarThemeProvider theme="accent">
      <ExplorerMainContainer>
        <HeadLine>
          <TitleH1>Skybridge Explorer</TitleH1>
          <PulsarThemeProvider>
            <SearchInput
              size="country"
              value={search}
              onChange={(evt) => setSearch(evt.target.value)}
              placeholder="Search by address or Txn Hash"
              right={<SearchIcon size="country" />}
            />
          </PulsarThemeProvider>
        </HeadLine>
        <PulsarThemeProvider>
          <Browser />
        </PulsarThemeProvider>
      </ExplorerMainContainer>
    </PulsarThemeProvider>
  );
};

export { ExplorerMain };
