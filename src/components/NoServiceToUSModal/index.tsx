import { Modal, Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { ModalContainer } from './styled';

interface Props {
  isWidgetModalOpen: boolean;
  setIsWidgetModalOpen: (arg: boolean) => void;
}

export const NoServiceToUSModal = (props: Props) => {
  const { isWidgetModalOpen, setIsWidgetModalOpen } = props;
  return (
    <Modal open={isWidgetModalOpen} onClose={() => setIsWidgetModalOpen(false)}>
      <Modal.Content>
        <ModalContainer>
          <Text variant="title-xs">
            <FormattedMessage id="common.modal.no-service-to-US" />
          </Text>
        </ModalContainer>
      </Modal.Content>
    </Modal>
  );
};
