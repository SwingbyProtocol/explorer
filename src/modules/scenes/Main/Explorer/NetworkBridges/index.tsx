import { Text } from '@swingby-protocol/pulsar';
import React from 'react';

import { CoinSymbol } from '../../../../coins';
import { IFloat } from '../../../../explorer';

import {
  AmountSpan,
  Coin,
  CoinContainer,
  CoinInfo,
  DataDiv,
  NetworkBridgeContainer,
  Row,
  TitleText,
} from './styled';

interface Props {
  floatBalances: IFloat;
}

export const NetworkBridges = (props: Props) => {
  const { floatBalances } = props;
  const data = [
    { coin: CoinSymbol.BTC, float: floatBalances.btc, vol: 232.12 },
    { coin: CoinSymbol.BTC_E, float: 24.493, vol: 232.12 },
    { coin: CoinSymbol.BNB, float: floatBalances.bnb, vol: 232.12 },
    { coin: CoinSymbol.BTC_B, float: floatBalances.btcb, vol: 232.12 },
  ];
  return (
    <NetworkBridgeContainer>
      <TitleText variant="section-title">Network Bridges</TitleText>
      <CoinContainer>
        {data.map((coin) => {
          return (
            <CoinInfo key={coin.coin}>
              <Coin symbol={coin.coin} />
              <DataDiv>
                <Row>
                  <Text variant="label">Float</Text>
                  <AmountSpan>{coin.float}</AmountSpan>
                </Row>
                <Row>
                  <Text variant="label">Vol</Text>
                  <AmountSpan>{coin.vol}</AmountSpan>
                </Row>
              </DataDiv>
            </CoinInfo>
          );
        })}
      </CoinContainer>
    </NetworkBridgeContainer>
  );
};
