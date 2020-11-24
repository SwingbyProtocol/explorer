import { Text } from '@swingby-protocol/pulsar';
import React from 'react';

import { AccountIdContainer, AccountIdWrapper, IconAvatar, IconClose } from './styled';

export const AccountId = () => {
  const address = '0xb680c8F33f058163185AB6121F7582BAb57Ef8a1';
  const addressShort = address.slice(0, 12) + '...' + address.slice(-11);

  return (
    <AccountIdWrapper>
      <AccountIdContainer>
        <IconAvatar />
        <Text variant="section-title">{addressShort}</Text>
        <IconClose />
      </AccountIdContainer>
    </AccountIdWrapper>
  );
};
