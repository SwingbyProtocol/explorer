import { getFiatAssetFormatter, Text, Tooltip } from '@swingby-protocol/pulsar';
import React from 'react';
import { FormattedMessage, FormattedNumber, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

import { PoolMode } from '../../../../pool';
import { togglePoolMode } from '../../../../store';
import { CoinSymbol } from '../../../../coins';
import { PATH } from '../../../../env';
import { useGetPoolApr, useToggleBridge } from '../../../../hooks';
import { URL } from '../../../../links';
import { Atag, ColumnInlineBlock } from '../../../Common';

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
  const theme = useTheme();

  const { apr } = useGetPoolApr();

  const formattedTvlAmountUsd = getFiatAssetFormatter({
    locale,
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(bridge ? apr[bridge].farmTvl : 0);

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
              <Tooltip
                content={
                  <Tooltip.Content>
                    <Text variant="normal">
                      <FormattedMessage
                        id="home.network.apy.sbbtc"
                        values={{
                          value: (
                            <FormattedNumber
                              value={bridge ? apr[bridge].sbBtc : 0}
                              maximumFractionDigits={2}
                              minimumFractionDigits={2}
                            />
                          ),
                        }}
                      />
                    </Text>
                    <br />
                    <Text variant="normal">
                      <FormattedMessage
                        id="home.network.apr.farm"
                        values={{
                          value: (
                            <FormattedNumber
                              value={bridge ? apr[bridge].farm : 0}
                              maximumFractionDigits={2}
                              minimumFractionDigits={2}
                            />
                          ),
                        }}
                      />
                    </Text>
                  </Tooltip.Content>
                }
                targetHtmlTag="span"
              >
                <Text variant="title-xs">
                  <FormattedMessage
                    id="pool.stake-card.stake-on-farm-apr"
                    values={{
                      value:
                        bridge && apr[bridge].total ? (
                          <FormattedNumber
                            value={bridge && apr[bridge].total}
                            maximumFractionDigits={2}
                            minimumFractionDigits={2}
                          />
                        ) : (
                          <ColumnInlineBlock>
                            <PulseLoader
                              margin={7}
                              size={4}
                              color={theme.pulsar.color.text.normal}
                            />
                          </ColumnInlineBlock>
                        ),
                    }}
                  />
                </Text>
              </Tooltip>
            </div>
            <div>
              <TextTvl variant="label">
                {/* Todo: remove condition once published sbBTC pool on BSC */}
                {bridge !== 'btc_skypool' && (
                  <FormattedMessage
                    id="pool.stake-card.stake-on-farm-tvl"
                    values={{
                      value:
                        bridge && apr[bridge].farmTvl > 0 ? (
                          formattedTvlAmountUsd
                        ) : (
                          <ColumnInlineBlock>
                            <PulseLoader
                              margin={3}
                              size={3}
                              color={theme.pulsar.color.text.normal}
                            />
                          </ColumnInlineBlock>
                        ),
                    }}
                  />
                )}
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
              <FormattedMessage id="pool.stake-card.trading-fee" />
            </TextTitle>
          </RowFeatures>
          <RowFeatures>
            <IconTick />
            <TextTitle variant="normal">
              {bridge !== 'btc_skypool' ? (
                <FormattedMessage
                  id="pool.stake-card.stake-apr"
                  values={{
                    swingbyPerDay:
                      bridge && apr[bridge].swingbyPerBlock > 0 ? (
                        <FormattedNumber
                          value={swingbyPerBlock}
                          maximumFractionDigits={0}
                          minimumFractionDigits={0}
                        />
                      ) : (
                        <ColumnInlineBlock>
                          <PulseLoader margin={3} size={2} color={theme.pulsar.color.text.normal} />
                        </ColumnInlineBlock>
                      ),
                  }}
                />
              ) : (
                'Yield farming is coming soon'
              )}
            </TextTitle>
          </RowFeatures>
          {/* Todo: remove condition once published sbBTC pool on BSC */}
          <Buttons>
            {bridge !== 'btc_skypool' && (
              <Atag href={URL.YieldFarming} rel="noopener noreferrer" target="_blank">
                <ButtonLink variant="primary" size="town" shape="fill" isMultiButton={true}>
                  <FormattedMessage id="pool.stake-card.stake" />
                </ButtonLink>
              </Atag>
            )}
            {/* Todo: remove condition once published sbBTC pool on BSC */}
            <ButtonLink
              isMultiButton={bridge !== 'btc_skypool' ? true : false}
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
