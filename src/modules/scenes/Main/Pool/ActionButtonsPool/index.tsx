import { Button } from '@swingby-protocol/pulsar';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { PoolMode } from '../../../../pool';
import { togglePoolMode } from '../../../../store';
import { IconArrowLeft } from '../../../Common';

import { ActionButtonsPoolContainer, Buttons, TextTitle, TextAPY, RowText } from './styled';

export const ActionButtonsPool = () => {
  const dispatch = useDispatch();
  const pool = useSelector((state) => state.pool);
  const { mode } = pool;
  const apyRate = 45.23;
  return (
    <ActionButtonsPoolContainer>
      {mode === PoolMode.Summary ? (
        <RowText>
          <TextTitle variant="accent">
            <FormattedMessage id="pool.apy" />
          </TextTitle>
          <TextAPY variant="accent">{apyRate}%</TextAPY>
        </RowText>
      ) : (
        <IconArrowLeft onClick={() => dispatch(togglePoolMode(PoolMode.Summary))} />
      )}
      <Buttons>
        <Button
          variant="secondary"
          size="city"
          onClick={() => dispatch(togglePoolMode(PoolMode.Withdraw))}
        >
          <FormattedMessage id="pool.withdraw" />
        </Button>
        <Button
          variant="primary"
          size="city"
          onClick={() => dispatch(togglePoolMode(PoolMode.AddLiquidity))}
        >
          <FormattedMessage id="pool.addLiquidity" />
        </Button>
      </Buttons>
    </ActionButtonsPoolContainer>
  );
};
