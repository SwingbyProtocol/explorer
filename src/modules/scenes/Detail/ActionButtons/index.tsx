import { Button } from '@swingby-protocol/pulsar';
import React from 'react';

import { ActionButtonsContainer, Buttons } from './styled';

export const ActionButtons = () => {
  return (
    <ActionButtonsContainer>
      <div>Status</div>
      <Buttons>
        <Button variant="secondary" size="town">
          Duplicate
        </Button>
        <Button variant="primary" size="town">
          Share
        </Button>
      </Buttons>
    </ActionButtonsContainer>
  );
};
