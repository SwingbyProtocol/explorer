import useCopy from '@react-hook/copy';
import { Tooltip } from '@swingby-protocol/pulsar';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { DuplicateSwapWidgetModal } from '../../../../../components/DuplicateSwapWidgetModal';
import { LinkToWidgetModal } from '../../../../../components/LinkToWidgetModal';
import { copyToClipboard, toastCopyURL } from '../../../../../components/Toast';
import { TStatus, TSwapWidget, TTxRawObject, TxStatus } from '../../../../explorer';
import { useLinkToWidget } from '../../../../hooks';
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
}

export const ActionButtons = (props: Props) => {
  const { tx } = props;
  const [action, setAction] = useState<TSwapWidget | null>(null);

  // Memo: 1: Close the modal, More than 1: Open the modal
  const [toggleOpenLink, setToggleOpenLink] = useState<number>(1);
  const currentUrl = typeof window !== 'undefined' && window.location.href;
  const { copy } = useCopy(currentUrl);

  const {
    isClaimWidgetModalOpen,
    setIsClaimWidgetModalOpen,
    isDuplicateWidgetModalOpen,
    setIsDuplicateWidgetModalOpen,
  } = useLinkToWidget({
    toggleOpenLink,
    tx,
    action,
    setToggleOpenLink,
  });

  return (
    <>
      <LinkToWidgetModal
        isWidgetModalOpen={isClaimWidgetModalOpen}
        setIsWidgetModalOpen={setIsClaimWidgetModalOpen}
        tx={tx}
        setToggleOpenLink={setToggleOpenLink}
      />
      <DuplicateSwapWidgetModal
        isWidgetModalOpen={isDuplicateWidgetModalOpen}
        setIsWidgetModalOpen={setIsDuplicateWidgetModalOpen}
        tx={tx}
      />
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
              onClick={() => {
                setAction('duplicate');
                setToggleOpenLink(toggleOpenLink + 1);
              }}
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
              onClick={() => {
                setAction('duplicate');
                setToggleOpenLink(toggleOpenLink + 1);
              }}
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
                onClick={() => {
                  setAction('claim');
                  setToggleOpenLink(toggleOpenLink + 1);
                }}
              >
                <FormattedMessage id="swap.claim-swap" />
              </ButtonScale>
            </Tooltip>
          </ButtonClaimSwapRow>
        )}
      </ActionButtonsSwapContainer>
    </>
  );
};
