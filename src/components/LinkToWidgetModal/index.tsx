import { Modal, Text } from '@swingby-protocol/pulsar';
import { createWidget, getUrl } from '@swingby-protocol/widget';
import { useRouter } from 'next/router';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { useAffiliateCode } from '../../modules/affiliate-code';
import { mode } from '../../modules/env';
import { TTxRawObject } from '../../modules/explorer';
import { ButtonScale } from '../../modules/scenes/Common';
import { useThemeSettings } from '../../modules/store/settings';

import { Buttons, ModalContainer, TextAddress } from './styled';

interface Props {
  isWidgetModalOpen: boolean;
  setIsWidgetModalOpen: (arg: boolean) => void;
  tx: TTxRawObject;
}

export const LinkToWidgetModal = (props: Props) => {
  const { isWidgetModalOpen, setIsWidgetModalOpen, tx } = props;
  const { locale } = useRouter();
  const affiliateCode = useAffiliateCode();
  const [theme] = useThemeSettings();

  const address = tx && tx.addressOut;
  const widget =
    tx &&
    createWidget({
      resource: 'swap',
      mode,
      size: 'banner',
      hash: tx.hash,
      theme,
      locale,
      affiliateCode,
    });
  return (
    <Modal open={isWidgetModalOpen} onClose={() => setIsWidgetModalOpen(false)}>
      <Modal.Content>
        <ModalContainer>
          <Text variant="title-xs">
            <FormattedMessage id="common.modal.verify-address" />
          </Text>
          <TextAddress variant="accent">{address}</TextAddress>
          <Buttons>
            <ButtonScale
              variant="primary"
              size="city"
              onClick={() => window.open(getUrl({ widget }), '_blank', 'noopener')}
            >
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
