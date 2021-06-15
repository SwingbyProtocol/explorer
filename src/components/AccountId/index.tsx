import useCopy from '@react-hook/copy';
import * as blockies from 'blockies-ts';
import React from 'react';
import { useDispatch } from 'react-redux';

import { ellipseAddress } from '../../modules/common';
import { useOnboard } from '../../modules/onboard';
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
  const { address, onboard } = useOnboard();
  const avatarSrc = address && blockies.create({ seed: address }).toDataURL();

  const { copy } = useCopy(address);

  return (
    <AccountIdWrapper>
      {address && (
        <AccountIdContainer>
          <ImageAvatar src={avatarSrc} alt="avatar" />
          <TextAddress
            variant="section-title"
            onClick={() => copyToClipboard(copy, toastCopyAddress)}
          >
            {ellipseAddress(address)}
          </TextAddress>
          <IconClose
            onClick={() => {
              onboard && onboard.walletReset();
              dispatch(resetPoolState());
            }}
          />
        </AccountIdContainer>
      )}
    </AccountIdWrapper>
  );
};
