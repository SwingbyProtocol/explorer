import useCopy from '@react-hook/copy';
import * as blockies from 'blockies-ts';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ellipseAddress } from '../../modules/common';
import { LOCAL_STORAGE } from '../../modules/env';
import { resetPoolState } from '../../modules/store';
import { copyToClipboard, toastCopyAddress } from '../Toast';

import {
  AccountIdContainer,
  AccountIdWrapper,
  IconClose,
  ImageAvatar,
  TextAddress,
} from './styled';

export const AccountId = () => {
  const dispatch = useDispatch();
  const userAddress = useSelector((state) => state.pool.userAddress);
  const onboard = useSelector((state) => state.pool.onboard);
  const avatarSrc = userAddress && blockies.create({ seed: userAddress }).toDataURL();

  const { copy } = useCopy(userAddress);

  return (
    <AccountIdWrapper>
      {userAddress && (
        <AccountIdContainer>
          <ImageAvatar src={avatarSrc} alt="avatar" />
          <TextAddress
            variant="section-title"
            onClick={() => copyToClipboard(copy, toastCopyAddress)}
          >
            {ellipseAddress(userAddress)}
          </TextAddress>
          <IconClose
            onClick={() => {
              onboard && onboard.walletReset();
              window.localStorage.removeItem(LOCAL_STORAGE.UserWalletAddress);
              dispatch(resetPoolState());
            }}
          />
        </AccountIdContainer>
      )}
    </AccountIdWrapper>
  );
};
