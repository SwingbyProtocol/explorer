import { Text, useMatchMedia } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

import { PATH } from '../../../../env';
import { useGetPoolApr, useToggleBridge } from '../../../../hooks';
import { PoolMode } from '../../../../pool';
import { togglePoolMode } from '../../../../store';
import { StylingConstants } from '../../../../styles';
import { ButtonScale, IconArrowLeft } from '../../../Common';

import { ActionButtonsPoolContainer, Buttons, ColumnApr, RowText, TextAPR } from './styled';

export const ActionButtonsPool = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const mode = useSelector((state) => state.pool.mode);

  // const { estimateApr, isLoading } = useGetLiquidityApr();
  const { apr, isLoading } = useGetPoolApr();
  const { bridge } = useToggleBridge(PATH.POOL);

  const { media } = StylingConstants;
  const sm = useMatchMedia({ query: `(min-width: ${rem(media.sm)})` });

  const placeholderLoader = (
    <PulseLoader margin={3} size={4} color={theme.pulsar.color.text.normal} />
  );

  const aprInfo = (
    <ColumnApr>
      <RowText>
        <Text variant="accent">
          <FormattedMessage id="pool.sbBtc" />
        </Text>
        <TextAPR variant="accent">
          {isLoading ? (
            placeholderLoader
          ) : (
            <FormattedMessage
              id="common.percent"
              values={{
                value: (
                  <FormattedNumber
                    value={apr[bridge].sbBtc}
                    maximumFractionDigits={2}
                    minimumFractionDigits={2}
                  />
                ),
              }}
            />
          )}
        </TextAPR>
      </RowText>
      <RowText>
        <Text variant="accent">
          <FormattedMessage id="pool.farm" />
        </Text>
        <TextAPR variant="accent">
          {isLoading ? (
            placeholderLoader
          ) : (
            <FormattedMessage
              id="common.percent"
              values={{
                value: (
                  <FormattedNumber
                    value={apr[bridge].farm}
                    maximumFractionDigits={2}
                    minimumFractionDigits={2}
                  />
                ),
              }}
            />
          )}
        </TextAPR>
      </RowText>
    </ColumnApr>
  );

  return (
    <ActionButtonsPoolContainer>
      {mode === PoolMode.Summary ? (
        aprInfo
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
