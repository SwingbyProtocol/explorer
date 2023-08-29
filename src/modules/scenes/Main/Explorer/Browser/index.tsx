import React from 'react';
import Head from 'next/head';
import { FormattedMessage, useIntl } from 'react-intl';
import { PulseLoader } from 'react-spinners';
import { getFiatAssetFormatter, Text, Tooltip } from '@swingby-protocol/pulsar';
import { useTheme } from 'styled-components';

import { useGetNetworkData, useGetTvlSummary } from '../../../../hooks';
import { FloatVolume } from '../FloatVolume';
import { StatsInfo } from '../StatsInfo';
import { TxHistories } from '../TxHistories';

import {
  Bottom,
  BrowserContainer,
  BrowserDiv,
  Top,
  IconInfo,
  RowLoader,
  RowTitleText,
  RowTvlText,
  TextTvl,
  TitleText,
} from './styled';

export const Browser = () => {
  useGetNetworkData();
  const { tvl, isLoading } = useGetTvlSummary();
  const { locale } = useIntl();
  const theme = useTheme();

  const tvlUsd = getFiatAssetFormatter({
    locale,
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(tvl.tvlUsd);

  const tvlFloatBal = getFiatAssetFormatter({
    locale,
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(tvl.floatUsd);

  const tvlMetanodeLockedUsd = getFiatAssetFormatter({
    locale,
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(tvl.lockedSwingbyUsd);

  const tvlYieldFarmingUsd = getFiatAssetFormatter({
    locale,
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(tvl.farmTvlUsd);

  const placeholderLoaderTvl = (
    <RowLoader>
      <PulseLoader margin={3} size={2} color={theme.pulsar.color.text.masked} />
    </RowLoader>
  );

  const networkBridges = (
    <RowTitleText>
      <TitleText variant="section-title">
        <FormattedMessage id="home.network.network-bridges" />
      </TitleText>
      <RowTvlText>
        <TextTvl variant="label">
          <FormattedMessage id="common.tvl" /> {isLoading ? placeholderLoaderTvl : tvlUsd}
        </TextTvl>
        <Tooltip
          content={
            <Tooltip.Content>
              <Text variant="masked">
                <FormattedMessage id="home.network.tvl.float" values={{ value: tvlFloatBal }} />
              </Text>
              <br />
              <Text variant="masked">
                <FormattedMessage
                  id="home.network.tvl.swingby"
                  values={{ value: tvlMetanodeLockedUsd }}
                />
              </Text>
              <br />
              <Text variant="masked">
                <FormattedMessage
                  id="home.network.tvl.yield-farming"
                  values={{ value: tvlYieldFarmingUsd }}
                />
              </Text>
            </Tooltip.Content>
          }
          data-testid="tooltip"
          interactive={true}
        >
          <IconInfo />
        </Tooltip>
      </RowTvlText>
    </RowTitleText>
  );

  return (
    <>
      <Head>
        <title>Swingby Skybridge | Explorer</title>
      </Head>
      <BrowserContainer>
        <BrowserDiv size="bare">
          {networkBridges}
          <Top>
            <FloatVolume />
            <StatsInfo />
          </Top>
          <Bottom>
            <TxHistories />
          </Bottom>
        </BrowserDiv>
      </BrowserContainer>
    </>
  );
};
