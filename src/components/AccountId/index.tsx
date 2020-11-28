import * as blockies from 'blockies-ts';
import React from 'react';
import { useSelector } from 'react-redux';

import { ellipseAddress } from '../../modules/common';

import { AccountIdContainer, AccountIdWrapper, IconClose, ImageIcon, TextAddress } from './styled';

export const AccountId = () => {
  const pool = useSelector((state) => state.pool);
  const { userAddress, onboard } = pool;
  const imgSrc = userAddress && blockies.create({ seed: userAddress }).toDataURL();

  return (
    <AccountIdWrapper>
      {userAddress && (
        <AccountIdContainer>
          <ImageIcon src={imgSrc} alt="avatar" />
          <TextAddress variant="section-title">{ellipseAddress(userAddress)}</TextAddress>
          <IconClose onClick={onboard && onboard.walletReset} />
        </AccountIdContainer>
      )}
    </AccountIdWrapper>
  );
};
