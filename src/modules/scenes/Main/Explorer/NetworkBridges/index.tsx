import { Text } from '@swingby-protocol/pulsar';
import React from 'react';

import { CoinSymbol } from '../../../../coins';

import { AmountSpan, Coin, CoinContainer, CoinInfo, DataDiv, Row } from './styled';

const dummyData = [
  { coin: CoinSymbol.BTC, float: 24.493, vol: 232.12 },
  { coin: CoinSymbol.BTC_E, float: 24.493, vol: 232.12 },
  { coin: CoinSymbol.BNB, float: 24.493, vol: 232.12 },
  { coin: CoinSymbol.BTC_B, float: 24.493, vol: 232.12 },
];

export const NetworkBridges = () => {
  return (
    <div>
      <Text variant="section-title">Network Bridges</Text>
      <CoinContainer>
        {dummyData.map((coin) => {
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
    </div>
  );
};
