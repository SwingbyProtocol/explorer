import { Modal, Text } from '@swingby-protocol/pulsar';
import { createWidget, openPopup } from '@swingby-protocol/widget';
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

export const DuplicateSwapWidgetModal = (props: Props) => {
  const { isWidgetModalOpen, setIsWidgetModalOpen, tx } = props;
  const affiliateCode = useAffiliateCode();
  const { locale } = useRouter();
  const [theme] = useThemeSettings();

  const address = tx && tx.addressOut;
  const widget =
    tx &&
    createWidget({
      mode,
      size: 'big',
      resource: 'swap',
      locale,
      theme,
      affiliateCode,
      defaultCurrencyDeposit: tx.currencyIn as any,
      defaultCurrencyReceiving: tx.currencyOut as any,
      defaultAddressReceiving: tx.addressOut,
      defaultAmountDesired: tx.amountIn,
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
