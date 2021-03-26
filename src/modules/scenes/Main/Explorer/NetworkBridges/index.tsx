import { Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

import { CoinSymbol } from '../../../../coins';
import { IFloat, IStats } from '../../../../explorer';

import {
  Coin,
  CoinContainer,
  CoinInfo,
  DataDiv,
  FloatSpan,
  NetworkBridgeContainer,
  Row,
  TitleText,
  VolSpan,
  BridgeContainer,
  BridgeInfos,
  RowBridgeTitle,
} from './styled';

interface Props {
  floatBalances: IFloat;
  stats: IStats;
}

interface IBridgeData {
  coin: CoinSymbol;
  float: number;
  vol: number;
}

export const NetworkBridges = (props: Props) => {
  const { floatBalances, stats } = props;
  const theme = useTheme();

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
                  {!coin.float ? (
                    placeholderLoader
                  ) : (
                    <FloatSpan>
                      <FormattedNumber value={Number(coin.float)} />
                    </FloatSpan>
                  )}
                </Row>
                <Row>
                  <Text variant="label">
                    <FormattedMessage id="home.network.vol" />
                  </Text>
                  {!coin.float ? (
                    placeholderLoader
                  ) : (
                    <VolSpan>
                      <FormattedNumber value={Number(coin.vol)} />
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
          <CoinContainer>{bridgeInfo(dataEthBridge)}</CoinContainer>
        </BridgeContainer>
        <BridgeContainer>
          <RowBridgeTitle>
            <Text variant="label">
              <FormattedMessage id="home.network.bitcoin-bsc" />
            </Text>
          </RowBridgeTitle>
          <CoinContainer>{bridgeInfo(dataBscBridge)}</CoinContainer>
        </BridgeContainer>
      </BridgeInfos>
    </NetworkBridgeContainer>
  );
};
