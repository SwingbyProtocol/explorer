import React from 'react';
import { FormattedMessage } from 'react-intl';

import { RewardButton } from '../../../../../components/RewardButton';

import {
  ActionButtonMetanodesContainer,
  ButtonContainer,
  RowText,
  TextAPY,
  TextTitle,
} from './styled';

export const ActionButtonMetanodes = () => {
  const apy = 52;
  return (
    <ActionButtonMetanodesContainer>
      <RowText>
        <TextTitle variant="accent">
          <FormattedMessage id="pool.apy" />
        </TextTitle>
        <TextAPY variant="accent">{apy}%</TextAPY>
      </RowText>
      <ButtonContainer>
        <RewardButton />
      </ButtonContainer>
    </ActionButtonMetanodesContainer>
  );
};
