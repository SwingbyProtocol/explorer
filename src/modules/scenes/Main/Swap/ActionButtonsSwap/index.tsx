import useCopy from '@react-hook/copy';
import { Tooltip } from '@swingby-protocol/pulsar';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { copyToClipboard, toastCopyURL } from '../../../../../components/Toast';
import { TTxRawObject, TStatus, TSwapWidget, TxStatus } from '../../../../explorer';
import { ButtonScale } from '../../../Common';

import {
  ActionButtonsSwapContainer,
  ButtonClaimSwapRow,
  ButtonClaimSwapTablet,
  Buttons,
  SwapStatus,
} from './styled';

interface Props {
  tx: TTxRawObject;
  linkToSwapWidget: (tx: TTxRawObject, action: TSwapWidget) => void;
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
        <Tooltip
          content={
            <Tooltip.Content>
              <FormattedMessage id="swap.duplicate-popup" />
            </Tooltip.Content>
          }
          data-testid="tooltip"
        >
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
        </Tooltip>
        <ButtonScale
          variant="primary"
          size="city"
          onClick={() => copyToClipboard(copy, toastCopyURL)}
        >
          <FormattedMessage id="swap.share" />
        </ButtonScale>
        {tx.status === TxStatus.WAITING && (
          <ButtonClaimSwapTablet
            variant="tertiary"
            size="city"
            onClick={() => setToggleOpenLink(toggleOpenLink + 1)}
          >
            <FormattedMessage id="swap.claim-swap" />
          </ButtonClaimSwapTablet>
        )}
      </Buttons>
      {tx.status === TxStatus.WAITING && (
        <ButtonClaimSwapRow>
          <Tooltip
            content={
              <Tooltip.Content>
                <FormattedMessage id="swap.claim-swap-popup" />
              </Tooltip.Content>
            }
            data-testid="tooltip"
          >
            <ButtonScale
              variant="tertiary"
              size="city"
              onClick={() => setToggleOpenLink(toggleOpenLink + 1)}
            >
              <FormattedMessage id="swap.claim-swap" />
            </ButtonScale>
          </Tooltip>
        </ButtonClaimSwapRow>
      )}
    </ActionButtonsSwapContainer>
  );
};
