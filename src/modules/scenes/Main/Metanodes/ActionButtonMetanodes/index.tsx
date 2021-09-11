import React from 'react';
import { FormattedMessage } from 'react-intl';

import { RewardButton } from '../../../../../components/RewardButton';

import {
  ActionButtonMetanodesContainer,
  ButtonContainer,
  RowText,
  TextAPR,
  TextTitle,
} from './styled';

export const ActionButtonMetanodes = () => {
  const apr = 52;
  return (
    <ActionButtonMetanodesContainer>
      <RowText>
        <TextTitle variant="accent">
          <FormattedMessage id="pool.apr" />
        </TextTitle>
        <TextAPR variant="accent">
          <FormattedMessage id="common.percent" values={{ value: ' ' + apr }} />
        </TextAPR>
      </RowText>
      <ButtonContainer>
        <RewardButton />
      </ButtonContainer>
    </ActionButtonMetanodesContainer>
  );
};
