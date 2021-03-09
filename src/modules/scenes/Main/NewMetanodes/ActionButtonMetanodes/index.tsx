import React from 'react';
import { FormattedMessage } from 'react-intl';

import { ButtonScale } from '../../../Common';

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
        <ButtonScale variant="primary" size="city" onClick={() => console.log('hello')}>
          <FormattedMessage id="metanodes.distribute-rewards" />
        </ButtonScale>
      </ButtonContainer>
    </ActionButtonMetanodesContainer>
  );
};
