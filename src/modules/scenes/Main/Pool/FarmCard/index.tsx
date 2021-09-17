import { getFiatAssetFormatter, Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { FormattedMessage, FormattedNumber, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

import { PoolMode } from '../../../../pool';
import { togglePoolMode } from '../../../../store';
import { CoinSymbol } from '../../../../coins';
import { PATH } from '../../../../env';
import { useGetPoolApr, useToggleBridge } from '../../../../hooks';
import { URL } from '../../../../links';
import { Atag } from '../../../Common';

import {
  AprBox,
  ButtonLink,
  Buttons,
  Coin,
  FarmCardContainer,
  FeaturesBox,
  IconTick,
  RowFeatures,
  RowTitle,
  TextTitle,
  TextTvl,
  Box,
} from './styled';

export const FarmCard = () => {
  const { bridge } = useToggleBridge(PATH.POOL);
  const { locale } = useIntl();
  const dispatch = useDispatch();

  const { apr } = useGetPoolApr();

  const formattedTvlAmountUsd = getFiatAssetFormatter({
    locale,
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(bridge && apr[bridge].farmTvl);

  const swingbyPerBlock = bridge ? (60 / 13) * 60 * 24 * apr[bridge].swingbyPerBlock : 0;

  return (
    <FarmCardContainer>
      <Box>
        <AprBox>
          <div>
            <TextTitle variant="accent">
              <FormattedMessage id="common.sbbtc" />
            </TextTitle>
            <div>
              <Text variant="title-xs">
                <FormattedMessage
                  id="pool.stake-card.stake-on-farm-apr"
                  values={{
                    value: (
                      <FormattedNumber
                        value={bridge && apr[bridge].total}
                        maximumFractionDigits={2}
                        minimumFractionDigits={2}
                      />
                    ),
                  }}
                />
              </Text>
            </div>
            <div>
              <TextTvl variant="label">
                <FormattedMessage
                  id="pool.stake-card.stake-on-farm-tvl"
                  values={{
                    value: formattedTvlAmountUsd,
                  }}
                />
              </TextTvl>
            </div>
          </div>
          <Coin symbol={CoinSymbol.ERC20_SB_BTC} />
        </AprBox>
        <FeaturesBox>
          <RowTitle>
            <TextTitle variant="accent">
              <FormattedMessage id="pool.stake-card.features" />
            </TextTitle>
          </RowTitle>
          <RowFeatures>
            <IconTick />
            <TextTitle variant="normal">
              <FormattedMessage
                id="pool.stake-card.trading-fee"
                values={{
                  value: (
                    <FormattedNumber
                      value={bridge && apr[bridge].sbBtc}
                      maximumFractionDigits={2}
                      minimumFractionDigits={2}
                    />
                  ),
                }}
              />
            </TextTitle>
          </RowFeatures>
          <RowFeatures>
            <IconTick />
            <TextTitle variant="normal">
              <FormattedMessage
                id="pool.stake-card.stake-apr"
                values={{
                  apr: (
                    <FormattedNumber
                      value={bridge && apr[bridge].farm}
                      maximumFractionDigits={2}
                      minimumFractionDigits={2}
                    />
                  ),
                  swingbyPerDay: (
                    <FormattedNumber
                      value={swingbyPerBlock}
                      maximumFractionDigits={0}
                      minimumFractionDigits={0}
                    />
                  ),
                }}
              />
            </TextTitle>
          </RowFeatures>
          <Buttons>
            <Atag href={URL.YieldFarming} rel="noopener noreferrer" target="_blank">
              <ButtonLink variant="primary" size="town" shape="fill">
                <FormattedMessage id="pool.stake-card.stake" />
              </ButtonLink>
            </Atag>
            <ButtonLink
              variant="secondary"
              size="town"
              shape="fill"
              onClick={() => dispatch(togglePoolMode(PoolMode.AddLiquidity))}
            >
              <FormattedMessage id="pool.stake-card.get-sbbtc" />
            </ButtonLink>
          </Buttons>
        </FeaturesBox>
      </Box>
    </FarmCardContainer>
  );
};
