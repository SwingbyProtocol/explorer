import { logos, Text } from '@swingby-protocol/pulsar';
import React from 'react';

import { AmountSpan, CoinContainer, CoinImg, CoinInfo, DataDiv, Row } from './styled';

const dummyData = [
  { coin: logos.CoinBtc, float: 24.493, vol: 232.12 },
  { coin: logos.CoinBtce, float: 24.493, vol: 232.12 },
  { coin: logos.CoinBnb, float: 24.493, vol: 232.12 },
  { coin: logos.CoinBtcb, float: 24.493, vol: 232.12 },
];

export const NetworkBridges = () => {
  return (
    <div>
      <Text variant="section-title">Network Bridges</Text>
      <CoinContainer>
        {dummyData.map((coin) => {
          return (
            <CoinInfo key={coin.coin}>
              <CoinImg src={coin.coin} alt={coin.coin} />
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
