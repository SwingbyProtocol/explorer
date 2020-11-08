import { PulsarThemeProvider } from '@swingby-protocol/pulsar';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { Browser } from '../Browser';

import { ExplorerMainContainer, HeadLine, SearchIcon, SearchInput, TitleH1 } from './styled';

export const ExplorerMain = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();

  return (
    <PulsarThemeProvider theme="accent">
      <ExplorerMainContainer>
        <HeadLine>
          <TitleH1>Skybridge Explorer</TitleH1>
          <PulsarThemeProvider>
            <SearchInput
              size="country"
              value={search || router.query.q}
              onChange={(evt) => {
                setSearch(evt.target.value);
                router.push({
                  pathname: '/',
                  query: { q: evt.target.value, page: 1 },
                });
              }}
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
