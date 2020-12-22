import { Modal, Text } from '@swingby-protocol/pulsar';
import { createWidget, openPopup } from '@swingby-protocol/widget';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

import { mode } from '../../modules/env';
import { SwapRawObject } from '../../modules/explorer';
import { ButtonScale } from '../../modules/scenes/Common';

import { Buttons, ModalContainer, TextAddress } from './styled';

interface Props {
  isWidgetModalOpen: boolean;
  setIsWidgetModalOpen: (arg: boolean) => void;
  tx: SwapRawObject;
}

export const DuplicateSwapWidgetModal = (props: Props) => {
  const { isWidgetModalOpen, setIsWidgetModalOpen, tx } = props;
  const explorer = useSelector((state) => state.explorer);
  const { themeMode } = explorer;

  const address = tx && tx.addressOut;
  const widget =
    tx &&
    createWidget({
      mode,
      size: 'big',
      resource: 'swap',
      theme: themeMode,
      defaultCurrencyDeposit: tx.currencyIn,
      defaultCurrencyReceiving: tx.currencyOut,
      defaultAddressReceiving: tx.addressOut,
      defaultAmountDesired: tx.amountIn,
    });

  return (
    <Modal open={isWidgetModalOpen} onClose={() => setIsWidgetModalOpen(false)}>
      <Modal.Content>
        <ModalContainer>
          <Text variant="title-xs">
            <FormattedMessage id="common.modal.verifyAddress" />
          </Text>
          <TextAddress variant="accent">{address}</TextAddress>
          <Buttons>
            <ButtonScale variant="primary" size="city" onClick={() => openPopup({ widget })}>
              <FormattedMessage id="common.modal.yes" />
            </ButtonScale>
            <ButtonScale
              variant="secondary"
              size="city"
              onClick={() => setIsWidgetModalOpen(false)}
            >
              <FormattedMessage id="common.modal.back" />
            </ButtonScale>
          </Buttons>
        </ModalContainer>
      </Modal.Content>
    </Modal>
  );
};
