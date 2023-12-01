import { useMatchMedia } from '@swingby-protocol/pulsar';
import { useRouter } from 'next/router';
import axios from 'axios';
import { rem } from 'polished';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import { StylingConstants } from '../../modules/styles';
import { PATH } from '../../modules/env';

import { SearchIcon, SearchInput } from './styled';

export const Search = () => {
  const router = useRouter();
  const params = router.query;
  const chainBridge = String(params.bridge || '');

  const [search, setSearch] = useState(router.query.q);
  const { media } = StylingConstants;
  const lg = useMatchMedia({ query: `(min-width: ${rem(media.lg)})` });
  const md = useMatchMedia({ query: `(min-width: ${rem(media.md)})` });

  const { formatMessage } = useIntl();

  const checkUD = async (search_value) => {
    const API_URL = 'https://unstoppabledomains.g.alchemy.com/domains/';
    const API_KEY1 = process.env.NEXT_PUBLIC_ALCHEMY_API;
    try {
      var res = await axios.get(API_URL + search_value, {
        headers: {
          Authorization: `bearer ${API_KEY1}`,
        },
      });
      return res.data.records['crypto.ETH.address'];
    } catch (err) {
      return null;
    }
  };

  const handleSearch = async () => {
    var address = await checkUD(search);
    if (address)
      router.push({
        pathname: PATH.EXPLORER,
        query: {
          bridge: chainBridge,
          type: address ? 'search' : '',
          q: address,
        },
      });
    else
      router.push({
        pathname: PATH.EXPLORER,
        query: {
          bridge: chainBridge,
          type: search ? 'search' : '',
          q: search,
        },
      });
  };

  return (
    <SearchInput
      size={lg ? 'country' : md ? 'state' : 'country'}
      value={search}
      onKeyDown={(evt) => {
        if (evt.keyCode === 13) {
          handleSearch();
        }
      }}
      onChange={(evt) => {
        setSearch(evt.target.value);
      }}
      placeholder={formatMessage({ id: 'common.placeholder.search' })}
      right={<SearchIcon size="country" onClick={handleSearch} />}
    />
  );
};
