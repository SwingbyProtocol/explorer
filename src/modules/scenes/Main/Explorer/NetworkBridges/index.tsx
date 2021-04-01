import { Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

import { CoinSymbol } from '../../../../coins';
import { isEnableBscSupport } from '../../../../env';

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
} from './styled';

interface IBridgeData {
  coin: CoinSymbol;
  float: number;
  vol: number;
}

export const NetworkBridges = () => {
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

  return (
    <NetworkBridgeContainer>
      <TitleText variant="section-title">
        <FormattedMessage id="home.network.network-bridges" />
      </TitleText>
      <BridgeInfos>
        <BridgeContainer>
          <RowBridgeTitle>
            <Text variant="label">
              <FormattedMessage id="home.network.bitcoin-ethereum" />
            </Text>
          </RowBridgeTitle>
          <CoinContainer>{bridgeInfo(dataEthBridge, true)}</CoinContainer>
        </BridgeContainer>
        <BridgeContainer>
          <RowBridgeTitle>
            <Text variant="label">
              <FormattedMessage id="home.network.bitcoin-bsc" />
            </Text>
          </RowBridgeTitle>
          <CoinContainer>{bridgeInfo(dataBscBridge, isEnableBscSupport)}</CoinContainer>
        </BridgeContainer>
      </BridgeInfos>
    </NetworkBridgeContainer>
  );
};
