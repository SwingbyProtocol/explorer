import { getFiatAssetFormatter, Text, Tooltip } from '@swingby-protocol/pulsar';
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
              <Tooltip
                content={
                  <Tooltip.Content>
                    <Text variant="normal">
                      <FormattedMessage
                        id="home.network.apr.sbbtc"
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
                    </Text>
                    <br />
                    <Text variant="normal">
                      <FormattedMessage
                        id="home.network.apr.farm"
                        values={{
                          value: (
                            <FormattedNumber
                              value={bridge && apr[bridge].farm}
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
              </Tooltip>
            </div>
            <div>
              <TextTvl variant="label">
                {/* Todo: remove condition once published sbBTC pool on BSC */}
                {bridge !== 'btc_bep20' && (
                  <FormattedMessage
                    id="pool.stake-card.stake-on-farm-tvl"
                    values={{
                      value: formattedTvlAmountUsd,
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
              {bridge !== 'btc_bep20' ? (
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
              ) : (
                'Yield farming is coming soon'
              )}
            </TextTitle>
          </RowFeatures>
          {/* Todo: remove condition once published sbBTC pool on BSC */}
          <Buttons>
            {bridge !== 'btc_bep20' && (
              <Atag href={URL.YieldFarming} rel="noopener noreferrer" target="_blank">
                <ButtonLink variant="primary" size="town" shape="fill" isMultiButton={true}>
                  <FormattedMessage id="pool.stake-card.stake" />
                </ButtonLink>
              </Atag>
            )}
            {/* Todo: remove condition once published sbBTC pool on BSC */}
            <ButtonLink
              isMultiButton={bridge === 'btc_erc' ? true : false}
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
