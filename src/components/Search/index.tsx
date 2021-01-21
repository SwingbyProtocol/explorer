import { useRouter } from 'next/router';
import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { setSearch } from '../../modules/store';
import { StylingConstants } from '../../modules/styles';

import { SearchIcon, SearchInput } from './styled';

export const Search = () => {
  const router = useRouter();
  const { media } = StylingConstants;

  const explorer = useSelector((state) => state.explorer);
  const { width, search } = explorer;
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  return (
    <SearchInput
      size={width > media.lg ? 'country' : width > media.md ? 'state' : 'country'}
      value={search || router.query.q}
      onChange={(evt) => {
        dispatch(setSearch(evt.target.value));
        router.push({
          pathname: '/',
          query: { bridge: '', q: evt.target.value, page: 1 },
        });
      }}
      placeholder={formatMessage({ id: 'common.placeholder.search' })}
      right={<SearchIcon size="country" />}
    />
  );
};
