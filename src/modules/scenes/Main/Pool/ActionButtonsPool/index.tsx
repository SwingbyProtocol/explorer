import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { useGetLiquidityApr } from '../../../../hooks';
import { PoolMode } from '../../../../pool';
import { togglePoolMode } from '../../../../store';
import { ButtonScale, IconArrowLeft } from '../../../Common';

import { ActionButtonsPoolContainer, Buttons, RowText, TextAPR, TextTitle } from './styled';

export const ActionButtonsPool = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.pool.mode);

  const { estimateApr, isLoading } = useGetLiquidityApr();

  return (
    <ActionButtonsPoolContainer>
      {mode === PoolMode.Summary ? (
        <RowText>
          <TextTitle variant="accent">
            <FormattedMessage id="pool.apr" />
          </TextTitle>
          <TextAPR variant="accent">{estimateApr}</TextAPR>
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
          <FormattedMessage id="pool.add-liquidity" />
        </ButtonScale>
      </Buttons>
    </ActionButtonsPoolContainer>
  );
};
