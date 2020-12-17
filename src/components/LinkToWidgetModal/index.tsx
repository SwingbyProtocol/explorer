import { Button, Modal, Text } from '@swingby-protocol/pulsar';
import { createWidget, getUrl } from '@swingby-protocol/widget';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { SwapRawObject } from '../../modules/explorer';
import { mode } from '../../modules/env';

import { ModalContainer, Buttons, TextAddress } from './styled';

interface Props {
  isWidgetModalOpen: boolean;
  setIsWidgetModalOpen: (arg: boolean) => void;
  tx: SwapRawObject;
}

export const LinkToWidgetModal = (props: Props) => {
  const { isWidgetModalOpen, setIsWidgetModalOpen, tx } = props;
  const address = tx && tx.addressOut;
  const widget = tx && createWidget({ mode, variant: 'banner', swapHash: tx.hash });
  return (
    <Modal open={isWidgetModalOpen} onClose={() => setIsWidgetModalOpen(false)}>
      <Modal.Content>
        <ModalContainer>
          <Text variant="title-xs">
            <FormattedMessage id="common.modal.verifyAddress" />
          </Text>
          <TextAddress variant="accent">{address}</TextAddress>
          <Buttons>
            <Button
              variant="primary"
              size="city"
              onClick={() => window.open(getUrl({ widget }), '_blank', 'noopener')}
            >
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
