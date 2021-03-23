import { useMatchMedia } from '@swingby-protocol/pulsar';
import { useRouter } from 'next/router';
import { rem } from 'polished';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import { StylingConstants } from '../../modules/styles';

import { SearchIcon, SearchInput } from './styled';

export const Search = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const { media } = StylingConstants;
  const lg = useMatchMedia({ query: `(min-width: ${rem(media.lg)})` });
  const md = useMatchMedia({ query: `(min-width: ${rem(media.md)})` });

  const { formatMessage } = useIntl();

  return (
    <SearchInput
      size={lg ? 'country' : md ? 'state' : 'country'}
      value={search || router.query.q}
      onChange={(evt) => {
        setSearch(evt.target.value);
        router.push({
          pathname: '/',
          query: { bridge: '', q: evt.target.value },
        });
      }}
      placeholder={formatMessage({ id: 'common.placeholder.search' })}
      right={<SearchIcon size="country" />}
    />
  );
};
