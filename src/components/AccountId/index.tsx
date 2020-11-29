import useCopy from '@react-hook/copy';
import * as blockies from 'blockies-ts';
import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { ellipseAddress } from '../../modules/common';

import {
  AccountIdContainer,
  AccountIdWrapper,
  IconClose,
  ImageAvatar,
  TextAddress,
} from './styled';

export const AccountId = () => {
  const pool = useSelector((state) => state.pool);
  const { userAddress, onboard } = pool;
  const avatarSrc = userAddress && blockies.create({ seed: userAddress }).toDataURL();

  const { copy } = useCopy(userAddress);
  const copyAddress = () => {
    copy();
    toast.info('Copied your address!', {
      autoClose: 3000,
      draggable: true,
      hideProgressBar: true,
    });
  };

  return (
    <AccountIdWrapper>
      {userAddress && (
        <AccountIdContainer>
          <ImageAvatar src={avatarSrc} alt="avatar" />
          <TextAddress variant="section-title" onClick={copyAddress}>
            {ellipseAddress(userAddress)}
          </TextAddress>
          <IconClose onClick={onboard && onboard.walletReset} />
        </AccountIdContainer>
      )}
    </AccountIdWrapper>
  );
};
