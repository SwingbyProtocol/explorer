import { Button } from '@swingby-protocol/pulsar';
import React from 'react';

import { NETWORK_MODE, WIDGET_URL } from '../../../../env';
import { TStatus, SwapRawObject } from '../../../../explorer';
import { Atag } from '../../../Common';

import {
  ActionButtonsSwapContainer,
  Buttons,
  SwapStatus,
  ButtonClaimSwapRow,
  ButtonClaimSwapTablet,
} from './styled';

interface Props {
  tx: SwapRawObject;
}

export const ActionButtons = (props: Props) => {
  const { tx } = props;
  const swap = NETWORK_MODE.TESTNET ? '/test/swap/' : '/swap/';
  const urlSwap = WIDGET_URL + swap + tx.hash;
  return (
    <ActionButtonsSwapContainer>
      <SwapStatus
        status={tx.status as TStatus}
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
        <Atag href={urlSwap} rel="noopener noreferrer" target="_blank">
          <ButtonClaimSwapTablet variant="tertiary" size="city">
            Claim Swap
          </ButtonClaimSwapTablet>
        </Atag>
      </Buttons>
      <ButtonClaimSwapRow>
        <Atag href={urlSwap} rel="noopener noreferrer" target="_blank">
          <Button variant="tertiary" size="city">
            Claim Swap
          </Button>
        </Atag>
      </ButtonClaimSwapRow>
    </ActionButtonsSwapContainer>
  );
};
