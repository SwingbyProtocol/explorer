import { Button } from '@swingby-protocol/pulsar';
import React from 'react';

import { ActionButtonsSwapContainer, Buttons } from './styled';

export const ActionButtons = () => {
  return (
    <ActionButtonsSwapContainer>
      <div>Status</div>
      <Buttons>
        <Button variant="secondary" size="city">
          Duplicate
        </Button>
        <Button variant="primary" size="city">
          Share
        </Button>
      </Buttons>
    </ActionButtonsSwapContainer>
  );
};
