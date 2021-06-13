import { getFiatAssetFormatter, Text, Tooltip } from '@swingby-protocol/pulsar';
import { CONTRACTS } from '@swingby-protocol/sdk';
import React from 'react';
import { FormattedMessage, FormattedNumber, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

import { CoinSymbol } from '../../../../coins';
import { mode, URL_BSCSCAN, URL_ETHERSCAN } from '../../../../env';
import { useGetTvlSummary } from '../../../../hooks';

import {
  Atag,
  BridgeContainer,
  BridgeInfos,
  Coin,
  CoinContainer,
  CoinInfo,
  DataDiv,
  FloatSpan,
  IconExternalLink,
  IconInfo,
  NetworkBridgeContainer,
  Row,
  RowBridgeTitle,
  RowLoader,
  RowTitelText,
  RowTvlText,
  TextTvl,
  TitleText,
  VolSpan,
} from './styled';

interface IBridgeData {
  coin: CoinSymbol;
  float: number;
  vol: number;
}

export const NetworkBridges = () => {
  const { tvl, isLoading: isLoadingTvl } = useGetTvlSummary();
  const { locale } = useIntl();

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

  const theme = useTheme();
  const isLoading = useSelector((state) => state.explorer.isLoading);
  const networkInfos = useSelector((state) => state.explorer.networkInfos);
  const { floatBalances, stats } = networkInfos;

  const dataEthBridge = [
    { coin: CoinSymbol.BTC, float: floatBalances.btcEth, vol: stats.volume1wksWBTC },
    { coin: CoinSymbol.WBTC, float: floatBalances.wbtc, vol: stats.volume1wksWBTC },
  ];

  const dataBscBridge = [
    {
      coin: CoinSymbol.BTC,
      float: floatBalances.btcBsc,
      vol: stats.volume1wksBTCB,
    },
    {
      coin: CoinSymbol.BTC_B,
      float: floatBalances.btcb,
      vol: stats.volume1wksBTCB,
    },
  ];

  const placeholderLoader = (
    <PulseLoader margin={3} size={4} color={theme.pulsar.color.text.normal} />
  );

  const isLoadingAll = isLoadingTvl || isLoading;
  const placeholderLoaderTvl = (
    <RowLoader>
      <PulseLoader margin={3} size={2} color={theme.pulsar.color.text.masked} />
    </RowLoader>
  );

  const bridgeInfo = (bridgeData: IBridgeData[]) => {
    return (
      <>
        {bridgeData.map((coin: IBridgeData) => {
          return (
            <CoinInfo key={coin.coin}>
              <Coin symbol={coin.coin} />
              <DataDiv>
                <Row>
                  <Text variant="label">
                    <FormattedMessage id="home.network.float" />
                  </Text>
                  {isLoadingAll ? (
                    placeholderLoader
                  ) : (
                    <FloatSpan>{<FormattedNumber value={Number(coin.float)} />}</FloatSpan>
                  )}
                </Row>
                <Row>
                  <Text variant="label">
                    <FormattedMessage id="home.network.vol" />
                  </Text>
                  {isLoadingAll ? (
                    placeholderLoader
                  ) : (
                    <VolSpan>{<FormattedNumber value={Number(coin.vol)} />}</VolSpan>
                  )}
                </Row>
              </DataDiv>
            </CoinInfo>
          );
        })}
      </>
    );
  };

  const networkScan = (scanBaseUrl: string) => {
    const getScanName = (scanBaseUrl: string) => {
      switch (scanBaseUrl) {
        case URL_ETHERSCAN:
          return 'Etherscan';
        case URL_BSCSCAN:
          return 'BscScan';

        default:
          return 'Etherscan';
      }
    };

    const getContract = (scanBaseUrl: string) => {
      switch (scanBaseUrl) {
        case URL_ETHERSCAN:
          return CONTRACTS.bridges.btc_erc[mode].address;
        case URL_BSCSCAN:
          return CONTRACTS.bridges.btc_bep20[mode].address;

        default:
          return CONTRACTS.bridges.btc_erc[mode].address;
      }
    };

    return (
      <Atag
        href={`${scanBaseUrl}/address/${getContract(scanBaseUrl)}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Text variant="label">{getScanName(scanBaseUrl)}</Text>
        <IconExternalLink />
      </Atag>
    );
  };

  return (
    <NetworkBridgeContainer>
      <RowTitelText>
        <TitleText variant="section-title">
          <FormattedMessage id="home.network.network-bridges" />
        </TitleText>
        <RowTvlText>
          <TextTvl variant="label">
            <FormattedMessage id="common.tvl" /> {isLoadingAll ? placeholderLoaderTvl : tvlUsd}
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
              </Tooltip.Content>
            }
            data-testid="tooltip"
          >
            <IconInfo />
          </Tooltip>
        </RowTvlText>
      </RowTitelText>
      <BridgeInfos>
        <BridgeContainer>
          <RowBridgeTitle>
            <Text variant="label">
              <FormattedMessage id="home.network.bitcoin-ethereum" />
            </Text>
            {networkScan(URL_ETHERSCAN)}
          </RowBridgeTitle>
          <CoinContainer>{bridgeInfo(dataEthBridge)}</CoinContainer>
        </BridgeContainer>
        <BridgeContainer>
          <RowBridgeTitle>
            <Text variant="label">
              <FormattedMessage id="home.network.bitcoin-bsc" />
            </Text>
            {networkScan(URL_BSCSCAN)}
          </RowBridgeTitle>
          <CoinContainer>{bridgeInfo(dataBscBridge)}</CoinContainer>
        </BridgeContainer>
      </BridgeInfos>
    </NetworkBridgeContainer>
  );
};
