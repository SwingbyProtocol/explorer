import { Button } from '@swingby-protocol/pulsar';
import React from 'react';

import { TStatus, SwapRawObject } from '../../../../explorer';
import { allocateStatus } from '../../../../swap';

import { ActionButtonsSwapContainer, Buttons, SwapStatus } from './styled';

interface Props {
  tx: SwapRawObject;
}

export const ActionButtons = (props: Props) => {
  const { tx } = props;
  return (
    <ActionButtonsSwapContainer>
      <SwapStatus
        status={allocateStatus(tx.status) as TStatus}
        currencyIn={tx.currencyIn}
        currencyOut={tx.currencyOut}
      />
      <Buttons>
        <Button variant="secondary" size="city">
          Duplicate
        </Button>
        <Button variant="primary" size="city">
          Share
        </Button>
      </Buttons>
    </ActionButtonsSwapContainer>
  );
};
