import { Button } from '@swingby-protocol/pulsar';
import React, { useEffect, useState } from 'react';
import useCopy from '@react-hook/copy';

import { SwapRawObject, TStatus } from '../../../../explorer';
import { copyToClipboard, toastCopyURL } from '../../../../../components/Toast';

import {
  ActionButtonsSwapContainer,
  ButtonClaimSwapRow,
  ButtonClaimSwapTablet,
  Buttons,
  SwapStatus,
} from './styled';

interface Props {
  tx: SwapRawObject;
  linkToSwapWidget: (tx: SwapRawObject) => void;
}

export const ActionButtons = (props: Props) => {
  const { tx, linkToSwapWidget } = props;
  const [toggleOpenLink, setToggleOpenLink] = useState(1);
  const currentUrl = typeof window !== 'undefined' && window.location.href;
  const { copy } = useCopy(currentUrl);

  useEffect(() => {
    if (toggleOpenLink > 1) {
      linkToSwapWidget(tx);
    }
  }, [toggleOpenLink, linkToSwapWidget, tx]);

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
        <Button variant="primary" size="city" onClick={() => copyToClipboard(copy, toastCopyURL)}>
          Share
        </Button>
        <ButtonClaimSwapTablet
          variant="tertiary"
          size="city"
          onClick={() => setToggleOpenLink(toggleOpenLink + 1)}
        >
          Claim Swap
        </ButtonClaimSwapTablet>
      </Buttons>
      <ButtonClaimSwapRow>
        <Button
          variant="tertiary"
          size="city"
          onClick={() => setToggleOpenLink(toggleOpenLink + 1)}
        >
          Claim Swap
        </Button>
      </ButtonClaimSwapRow>
    </ActionButtonsSwapContainer>
  );
};
