import { Button, Modal, Text } from '@swingby-protocol/pulsar';
import { createWidget, openPopup } from '@swingby-protocol/widget';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { mode } from '../../modules/env';
import { SwapRawObject } from '../../modules/explorer';

import { Buttons, ModalContainer, TextAddress } from './styled';

interface Props {
  isWidgetModalOpen: boolean;
  setIsWidgetModalOpen: (arg: boolean) => void;
  tx: SwapRawObject;
}

export const DuplicateSwapWidgetModal = (props: Props) => {
  const { isWidgetModalOpen, setIsWidgetModalOpen, tx } = props;
  const address = tx && tx.addressOut;
  const widget =
    tx &&
    createWidget({
      mode,
      size: 'big',
      resource: 'swap',
      defaultCurrencyIn: tx.currencyIn,
      defaultCurrencyOut: tx.currencyOut,
      defaultAddressUserIn: tx.addressOut,
      defaultAmountUser: tx.amountIn,
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
            <Button variant="primary" size="city" onClick={() => openPopup({ widget })}>
              <FormattedMessage id="common.modal.yes" />
            </Button>
            <Button variant="secondary" size="city" onClick={() => setIsWidgetModalOpen(false)}>
              <FormattedMessage id="common.modal.back" />
            </Button>
          </Buttons>
        </ModalContainer>
      </Modal.Content>
    </Modal>
  );
};
