import { PulsarThemeProvider } from '@swingby-protocol/pulsar';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { StylingConstants } from '../../../../styles';
import { Browser } from '../Browser';

import { ExplorerMainContainer, HeadLine, SearchIcon, SearchInput, TitleH1 } from './styled';

export const ExplorerMain = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const { media } = StylingConstants;
  const explorer = useSelector((state) => state.explorer);
  const { width } = explorer;

  return (
    <PulsarThemeProvider theme="accent">
      <ExplorerMainContainer>
        <HeadLine>
          <TitleH1>Skybridge Explorer</TitleH1>
          <PulsarThemeProvider>
            <SearchInput
              size={width > media.sm ? 'country' : 'state'}
              value={search || router.query.q}
              onChange={(evt) => {
                setSearch(evt.target.value);
                router.push({
                  pathname: '/',
                  query: { bridge: '', q: evt.target.value, page: 1 },
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
