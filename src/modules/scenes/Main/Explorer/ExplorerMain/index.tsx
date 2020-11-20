import { PulsarThemeProvider } from '@swingby-protocol/pulsar';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { PATH } from '../../../../env';
import { StylingConstants } from '../../../../styles';
// Todo: Fix error: 'Reaching to "../../../Detail/BrowserDetail" is not allowed.eslintimport/no-internal-modules'
import { BrowserDetail } from '../../../Detail/BrowserDetail';
import { Browser } from '../Browser';

import { ExplorerMainContainer, HeadLine, SearchIcon, SearchInput, TitleH1 } from './styled';

export const ExplorerMain = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const { media } = StylingConstants;
  const explorer = useSelector((state) => state.explorer);
  const { width } = explorer;
  const [browser, setBrowser] = useState(router.pathname === PATH.ROOT ? 'Explorer' : 'Detail');

  return (
    <PulsarThemeProvider theme="accent">
      <ExplorerMainContainer>
        <HeadLine>
          <TitleH1>Skybridge Explorer</TitleH1>
          <PulsarThemeProvider>
            <SearchInput
              size={width > media.lg ? 'country' : width > media.md ? 'state' : 'country'}
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
          {browser === 'Explorer' ? (
            <Browser setBrowser={setBrowser} />
          ) : (
            <BrowserDetail setBrowser={setBrowser} />
          )}
        </PulsarThemeProvider>
      </ExplorerMainContainer>
    </PulsarThemeProvider>
  );
};
