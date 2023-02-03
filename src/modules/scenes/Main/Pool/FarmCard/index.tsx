import { getFiatAssetFormatter, Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { FormattedMessage, FormattedNumber, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

import { PoolMode } from '../../../../pool';
import { togglePoolMode } from '../../../../store';
import { CoinSymbol } from '../../../../coins';
import { PATH } from '../../../../env';
import { useGetPoolApr, useToggleBridge, useGetSbBtcBal } from '../../../../hooks';
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

  const { apr, isLoading: aprLoading } = useGetPoolApr();

  const formattedTvlAmountUsd = getFiatAssetFormatter({
    locale,
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(bridge ? apr[bridge].farmTvl : 0);

  const swingbyPerBlock = bridge ? (60 / 13) * 60 * 24 * apr[bridge].swingbyPerBlock : 0;

  const { balance: sbBtcBalance } = useGetSbBtcBal();

  return (
    <FarmCardContainer>
      <Box>
        <TextTitle variant="accent">
          <FormattedMessage
            id="home.network.apr.current"
            values={{
              currency: <FormattedMessage id="common.sbbtc" />,
            }}
          />
        </TextTitle>
        <AprBox>
          <div>
            <div>
              <Text variant="title-xs">
                <FormattedMessage
                  id="pool.stake-card.stake-on-farm-apr"
                  values={{
                    value: aprLoading ? (
                      <ColumnInlineBlock>
                        <PulseLoader margin={7} size={4} color={theme.pulsar.color.text.normal} />
                      </ColumnInlineBlock>
                    ) : (
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
                    value:
                      bridge && apr[bridge].farmTvl > 0 ? (
                        formattedTvlAmountUsd
                      ) : (
                        <ColumnInlineBlock>
                          <PulseLoader margin={3} size={3} color={theme.pulsar.color.text.normal} />
                        </ColumnInlineBlock>
                      ),
                  }}
                />
              </TextTvl>
            </div>
          </div>
          <div>
            <Text variant="label">
              <FormattedMessage
                id="home.network.apy.native"
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
            <Text variant="label">
              <FormattedMessage
                id="home.network.apr.farming"
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
          </div>
          <Coin symbol={CoinSymbol.ERC20_SB_BTC} />
        </AprBox>
        <AprBox>
          <div style={{ marginTop: theme.pulsar.size.house }}>
            <Text variant="label">
              <FormattedMessage
                id="pool.farm.wallet-balance"
                values={{
                  value: (
                    <FormattedNumber
                      value={bridge ? sbBtcBalance[bridge].wallet : 0}
                      maximumFractionDigits={18}
                      minimumFractionDigits={2}
                    />
                  ),
                }}
              />
            </Text>
            <br />
            <Text variant="label">
              <FormattedMessage
                id="pool.farm.farm-balance"
                values={{
                  value: (
                    <FormattedNumber
                      value={bridge ? sbBtcBalance[bridge].farm : 0}
                      maximumFractionDigits={18}
                      minimumFractionDigits={2}
                    />
                  ),
                }}
              />
            </Text>
          </div>
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
            </TextTitle>
          </RowFeatures>
          <Buttons>
            <Atag href={URL.YieldFarming} rel="noopener noreferrer" target="_blank">
              <ButtonLink variant="primary" size="town" shape="fill" isMultiButton={true}>
                <FormattedMessage id="pool.stake-card.stake" />
              </ButtonLink>
            </Atag>
            <ButtonLink
              isMultiButton
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
