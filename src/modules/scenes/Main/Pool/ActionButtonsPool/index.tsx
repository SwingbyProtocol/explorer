import { Button } from '@swingby-protocol/pulsar';
import React from 'react';
import { useDispatch } from 'react-redux';

import { PoolMode } from '../../../../pool';
import { toggleMode } from '../../../../store';

import { ActionButtonsPoolContainer, Buttons, TextTitle, TextAPY, RowText } from './styled';

export const ActionButtonsPool = () => {
  const dispatch = useDispatch();
  const apyRate = 45.23;
  return (
    <ActionButtonsPoolContainer>
      <RowText>
        <TextTitle variant="accent">APY: </TextTitle>
        <TextAPY variant="accent">{apyRate}%</TextAPY>
      </RowText>
      <Buttons>
        <Button variant="secondary" size="city">
          Withdraw
        </Button>
        <Button
          variant="primary"
          size="city"
          onClick={() => dispatch(toggleMode(PoolMode.AddLiquidity))}
        >
          + Add Liquidity
        </Button>
      </Buttons>
    </ActionButtonsPoolContainer>
  );
};
