import React from 'react';
import { useSelector } from 'react-redux';

import { AccountIdContainer, AccountIdWrapper, IconClose, ImageIcon, TextAddress } from './styled';

export const AccountId = () => {
  const pool = useSelector((state) => state.pool);
  const { userAddress, onboard } = pool;

  return (
    <AccountIdWrapper>
      {userAddress && (
        <AccountIdContainer>
          {/* Ref: https://avatars.dicebear.com/ */}
          <ImageIcon
            src={`https://avatars.dicebear.com/api/identicon/${userAddress}.svg`}
            alt="avatar"
          />
          <TextAddress variant="section-title">
            {userAddress && userAddress.slice(0, 12) + '...' + userAddress.slice(-11)}
          </TextAddress>
          <IconClose onClick={userAddress && onboard && onboard.walletReset} />
        </AccountIdContainer>
      )}
    </AccountIdWrapper>
  );
};
