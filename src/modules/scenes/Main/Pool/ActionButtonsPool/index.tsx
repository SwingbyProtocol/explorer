import { useMatchMedia } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

import { useGetLiquidityApr } from '../../../../hooks';
import { PoolMode } from '../../../../pool';
import { togglePoolMode } from '../../../../store';
import { StylingConstants } from '../../../../styles';
import { ButtonScale, IconArrowLeft } from '../../../Common';

import { ActionButtonsPoolContainer, Buttons, RowText, TextAPR, TextTitle } from './styled';

export const ActionButtonsPool = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const mode = useSelector((state) => state.pool.mode);

  const { estimateApr, isLoading } = useGetLiquidityApr();

  const { media } = StylingConstants;
  const sm = useMatchMedia({ query: `(min-width: ${rem(media.sm)})` });

  const placeholderLoader = (
    <PulseLoader margin={3} size={4} color={theme.pulsar.color.text.normal} />
  );

  return (
    <ActionButtonsPoolContainer>
      {mode === PoolMode.Summary ? (
        <RowText>
          <TextTitle variant="accent">
            <FormattedMessage id="pool.apr" />
          </TextTitle>
          <TextAPR variant="accent">{isLoading ? placeholderLoader : estimateApr}</TextAPR>
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
          <FormattedMessage id="pool.add-liquidity" values={{ value: sm && '+ ' }} />
        </ButtonScale>
      </Buttons>
    </ActionButtonsPoolContainer>
  );
};
