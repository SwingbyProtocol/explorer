import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { StylingConstants } from '../../modules/styles';

import { SearchIcon, SearchInput } from './styled';

export const Search = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const { media } = StylingConstants;

  const explorer = useSelector((state) => state.explorer);
  const { width } = explorer;
  return (
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
  );
};
