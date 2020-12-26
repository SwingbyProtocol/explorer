import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { PoolMode } from '../../../../pool';
import { togglePoolMode } from '../../../../store';
import { ButtonScale, IconArrowLeft } from '../../../Common';

import { ActionButtonsPoolContainer, Buttons, RowText, TextAPY, TextTitle } from './styled';

export const ActionButtonsPool = () => {
  const dispatch = useDispatch();
  const pool = useSelector((state) => state.pool);
  const { mode } = pool;
  return (
    <ActionButtonsPoolContainer>
      {mode === PoolMode.Summary ? (
        <RowText>
          <TextTitle variant="accent">
            <FormattedMessage id="pool.apy" />
          </TextTitle>
          <TextAPY variant="accent">
            <FormattedMessage id="common.comingSoon" />
          </TextAPY>
        </RowText>
      ) : (
        <IconArrowLeft onClick={() => dispatch(togglePoolMode(PoolMode.Summary))} />
      )}
      <Buttons>
        <ButtonScale
          variant="secondary"
          size="city"
          onClick={() => dispatch(togglePoolMode(PoolMode.Withdraw))}
        >
          <FormattedMessage id="pool.withdraw" />
        </ButtonScale>
        <ButtonScale
          variant="primary"
          size="city"
          onClick={() => dispatch(togglePoolMode(PoolMode.AddLiquidity))}
        >
          <FormattedMessage id="pool.addLiquidity" />
        </ButtonScale>
      </Buttons>
    </ActionButtonsPoolContainer>
  );
};
