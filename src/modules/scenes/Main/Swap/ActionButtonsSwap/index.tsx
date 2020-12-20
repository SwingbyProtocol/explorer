import useCopy from '@react-hook/copy';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { copyToClipboard, toastCopyURL } from '../../../../../components/Toast';
import { SwapRawObject, TStatus, TSwapWidget, TxStatus } from '../../../../explorer';
import { ButtonScale } from '../../../Common';

import {
  ActionButtonsSwapContainer,
  ButtonClaimSwapRow,
  ButtonClaimSwapTablet,
  Buttons,
  SwapStatus,
} from './styled';

interface Props {
  tx: SwapRawObject;
  linkToSwapWidget: (tx: SwapRawObject, action: TSwapWidget) => void;
}

export const ActionButtons = (props: Props) => {
  const { tx, linkToSwapWidget } = props;
  const [toggleOpenLink, setToggleOpenLink] = useState(1);
  const [toggleDuplicateSwap, setToggleDuplicateSwap] = useState(1);
  const currentUrl = typeof window !== 'undefined' && window.location.href;
  const { copy } = useCopy(currentUrl);

  useEffect(() => {
    if (toggleOpenLink > 1) {
      linkToSwapWidget(tx, 'claim');
    }
  }, [toggleOpenLink, linkToSwapWidget, tx]);

  useEffect(() => {
    if (toggleDuplicateSwap > 1) {
      linkToSwapWidget(tx, 'duplicate');
    }
  }, [toggleDuplicateSwap, linkToSwapWidget, tx]);

  return (
    <ActionButtonsSwapContainer>
      <SwapStatus
        status={tx.status as TStatus}
        currencyIn={tx.currencyIn}
        currencyOut={tx.currencyOut}
      />
      <Buttons>
        <ButtonScale
          variant="secondary"
          size="city"
          disabled={
            tx.status === TxStatus.REFUNDED ||
            tx.status === TxStatus.REFUNDING ||
            tx.status === TxStatus.REJECTED
          }
          onClick={() => setToggleDuplicateSwap(toggleDuplicateSwap + 1)}
        >
          <FormattedMessage id="swap.duplicate" />
        </ButtonScale>
        <ButtonScale
          variant="primary"
          size="city"
          onClick={() => copyToClipboard(copy, toastCopyURL)}
        >
          <FormattedMessage id="swap.share" />
        </ButtonScale>
        <ButtonClaimSwapTablet
          variant="tertiary"
          size="city"
          onClick={() => setToggleOpenLink(toggleOpenLink + 1)}
        >
          <FormattedMessage id="swap.claimSwap" />
        </ButtonClaimSwapTablet>
      </Buttons>
      <ButtonClaimSwapRow>
        <ButtonScale
          variant="tertiary"
          size="city"
          onClick={() => setToggleOpenLink(toggleOpenLink + 1)}
        >
          <FormattedMessage id="swap.claimSwap" />
        </ButtonScale>
      </ButtonClaimSwapRow>
    </ActionButtonsSwapContainer>
  );
};
