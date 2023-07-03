import React from 'react';
import { FormattedMessage } from 'react-intl';

import { useOnboard } from '../../../../onboard';

import { BackDrop, ButtonConnect, ConnectWalletContainer } from './styled';

export const ConnectWallet = () => {
  const { onboard } = useOnboard();

  return (
    <ConnectWalletContainer>
      <BackDrop />
      <ButtonConnect
        variant="primary"
        size="state"
        onClick={async () => await onboard?.walletSelect()}
      >
        <FormattedMessage id="pool.connectWallet" />
      </ButtonConnect>
    </ConnectWalletContainer>
  );
};
