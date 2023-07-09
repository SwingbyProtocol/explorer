import { useMatchMedia } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';

import { PoolMode } from '../../../../pool';
import { toggleLiquidityMode } from '../../../../store';
import { StylingConstants } from '../../../../styles';

import { ActionButtonsLiquidityContainer, Buttons, ButtonLiquidity } from './styled';

export const ActionButtonsLiquidity = () => {
  const dispatch = useDispatch();

  const { media } = StylingConstants;
  const sm = useMatchMedia({ query: `(min-width: ${rem(media.sm)})` });

  return (
    <ActionButtonsLiquidityContainer>
      <Buttons>
        <ButtonLiquidity
          variant="primary"
          size="city"
          onClick={() => dispatch(toggleLiquidityMode(PoolMode.AddLiquidity))}
        >
          <FormattedMessage id="pool.add-liquidity" values={{ value: sm && '+ ' }} />
        </ButtonLiquidity>
        <ButtonLiquidity
          variant="secondary"
          size="city"
          onClick={() => dispatch(toggleLiquidityMode(PoolMode.Withdraw))}
        >
          <FormattedMessage id="pool.withdraw" />
        </ButtonLiquidity>
      </Buttons>
    </ActionButtonsLiquidityContainer>
  );
};
