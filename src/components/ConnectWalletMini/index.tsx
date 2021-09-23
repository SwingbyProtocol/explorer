import { Button } from '@swingby-protocol/pulsar';
import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';

import { ellipseAddress } from '../../modules/common';
import { logger } from '../../modules/logger';
import { useOnboard } from '../../modules/onboard';

import { StyledNetworkTag, WalletWrapper } from './styled';

export const ConnectWalletMini = () => {
  const { address, network, onboard } = useOnboard();

  const login = useCallback(async () => {
    await onboard?.walletSelect();
    await onboard?.walletCheck();
  }, [onboard]);

  return (
    <WalletWrapper>
      {!!address && <StyledNetworkTag network={network} />}
      <Button
        variant="secondary"
        size="street"
        shape="fit"
        onClick={() => {
          (async () => {
            try {
              if (address) {
                onboard?.walletReset();
                return;
              }
              await login();
              return;
            } catch (e) {
              logger.error(e);
            }
          })();
        }}
      >
        {address ? ellipseAddress(address, 5) : <FormattedMessage id="wallet.connect" />}
      </Button>
    </WalletWrapper>
  );
};
