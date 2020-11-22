import { Button } from '@swingby-protocol/pulsar';
import React from 'react';

import { ActionButtonsSwapContainer, Buttons } from './styled';

export const ActionButtons = () => {
  return (
    <ActionButtonsSwapContainer>
      <div>Status</div>
      <Buttons>
        <Button variant="secondary" size="town">
          Duplicate
        </Button>
        <Button variant="primary" size="town">
          Share
        </Button>
      </Buttons>
    </ActionButtonsSwapContainer>
  );
};
