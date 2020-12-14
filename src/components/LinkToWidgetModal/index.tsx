import { Button, Modal, Text } from '@swingby-protocol/pulsar';
import { createWidget, getUrl } from '@swingby-protocol/widget';
import React from 'react';

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
          <Text variant="title-xs">Please verify your wallet address</Text>
          <TextAddress variant="accent">{address}</TextAddress>
          <Buttons>
            <Button
              variant="primary"
              size="city"
              onClick={() => window.open(getUrl({ widget }), '_blank', 'noopener')}
            >
              Yes, that's mine
            </Button>
            <Button variant="secondary" size="city" onClick={() => setIsWidgetModalOpen(false)}>
              Go back
            </Button>
          </Buttons>
        </ModalContainer>
      </Modal.Content>
    </Modal>
  );
};
