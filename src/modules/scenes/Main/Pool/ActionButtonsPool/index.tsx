import { useMatchMedia } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { PoolMode } from '../../../../pool';
import { togglePoolMode } from '../../../../store';
import { StylingConstants } from '../../../../styles';
import { ButtonScale, IconArrowLeft } from '../../../Common';

import { ActionButtonsPoolContainer, Buttons } from './styled';

export const ActionButtonsPool = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.pool.mode);

  const { media } = StylingConstants;
  const sm = useMatchMedia({ query: `(min-width: ${rem(media.sm)})` });

  return (
    <ActionButtonsPoolContainer>
      {mode === PoolMode.Summary ? (
        <div />
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
          <FormattedMessage id="pool.add-liquidity" values={{ value: sm && '+ ' }} />
        </ButtonScale>
      </Buttons>
    </ActionButtonsPoolContainer>
  );
};
