import { useMatchMedia } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { PoolMode } from '../../../../pool';
import { poolModeSelector, togglePoolMode } from '../../../../store';
import { StylingConstants } from '../../../../styles';
import { ButtonScale, IconArrowLeft } from '../../../Common';
import { useGetQueryParams } from '../../../../hooks';

import { ActionButtonsPoolContainer, Buttons, ColumnIcon } from './styled';

export const ActionButtonsPool = () => {
  const dispatch = useDispatch();
  const mode = useSelector(poolModeSelector);

  const queryParams = useGetQueryParams();
  const isBTC_ERC = queryParams.bridge === 'btc_erc';

  const { media } = StylingConstants;
  const sm = useMatchMedia({ query: `(min-width: ${rem(media.sm)})` });

  return (
    <ActionButtonsPoolContainer>
      {mode === PoolMode.Summary ? (
        <div />
      ) : (
        <ColumnIcon>
          <IconArrowLeft onClick={() => dispatch(togglePoolMode(PoolMode.Summary))} />
        </ColumnIcon>
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
          disabled={isBTC_ERC}
          onClick={() => dispatch(togglePoolMode(PoolMode.AddLiquidity))}
        >
          <FormattedMessage id="pool.add-liquidity" values={{ value: sm && '+ ' }} />
        </ButtonScale>
      </Buttons>
    </ActionButtonsPoolContainer>
  );
};
