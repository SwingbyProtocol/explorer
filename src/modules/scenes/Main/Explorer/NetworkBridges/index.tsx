import { getFiatAssetFormatter, Text, Tooltip } from '@swingby-protocol/pulsar';
import { CONTRACTS } from '@swingby-protocol/sdk';
import React from 'react';
import { FormattedMessage, FormattedNumber, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

import { CoinSymbol } from '../../../../coins';
import { isEnableBscSupport, mode, PATH, URL_BSCSCAN, URL_ETHERSCAN } from '../../../../env';
import { useGetAllBridgesTvl } from '../../../../hooks';

import {
  BridgeContainer,
  BridgeInfos,
  Coin,
  CoinContainer,
  CoinInfo,
  DataDiv,
  FloatSpan,
  NetworkBridgeContainer,
  Row,
  RowBridgeTitle,
  TitleText,
  VolSpan,
  IconExternalLink,
  Atag,
  RowTitelText,
  RowLoader,
  TextTvl,
  IconInfo,
  RowTvlText,
} from './styled';

interface IBridgeData {
  coin: CoinSymbol;
  float: number;
  vol: number;
}

export const NetworkBridges = () => {
  const { tvl } = useGetAllBridgesTvl(PATH.ROOT);
  const { locale } = useIntl();
  console.log('locale', locale);
  const tvlUsd = getFiatAssetFormatter({
    locale,
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(tvl.floatBalance + tvl.metanodeLocked.allBridges);

  const tvlFloatBal = getFiatAssetFormatter({
    locale,
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(tvl.floatBalance);

  const tvlMetanodeLockedUsd = getFiatAssetFormatter({
    locale,
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(tvl.metanodeLocked.allBridges);

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
      float: isEnableBscSupport ? floatBalances.btcBsc : 9999,
      vol: isEnableBscSupport ? stats.volume1wksBTCB : 9999,
    },
    {
      coin: CoinSymbol.BTC_B,
      float: isEnableBscSupport ? floatBalances.btcb : 9999,
      vol: isEnableBscSupport ? stats.volume1wksBTCB : 9999,
    },
  ];

  const placeholderLoader = (
    <PulseLoader margin={3} size={4} color={theme.pulsar.color.text.normal} />
  );

  const placeholderLoaderTvl = (
    <RowLoader>
      <PulseLoader margin={3} size={2} color={theme.pulsar.color.text.masked} />
    </RowLoader>
  );

  const bridgeInfo = (bridgeData: IBridgeData[], isEnableSupport: boolean) => {
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
                  {isLoading ? (
                    placeholderLoader
                  ) : (
                    <FloatSpan>
                      {isEnableSupport ? <FormattedNumber value={Number(coin.float)} /> : 'N/A'}
                    </FloatSpan>
                  )}
                </Row>
                <Row>
                  <Text variant="label">
                    <FormattedMessage id="home.network.vol" />
                  </Text>
                  {isLoading ? (
                    placeholderLoader
                  ) : (
                    <VolSpan>
                      {isEnableSupport ? <FormattedNumber value={Number(coin.vol)} /> : 'N/A'}
                    </VolSpan>
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
          <CoinContainer>{bridgeInfo(dataEthBridge, true)}</CoinContainer>
        </BridgeContainer>
        <BridgeContainer>
          <RowBridgeTitle>
            <Text variant="label">
              <FormattedMessage id="home.network.bitcoin-bsc" />
            </Text>
            {networkScan(URL_BSCSCAN)}
          </RowBridgeTitle>
          <CoinContainer>{bridgeInfo(dataBscBridge, isEnableBscSupport)}</CoinContainer>
        </BridgeContainer>
      </BridgeInfos>
    </NetworkBridgeContainer>
  );
};
