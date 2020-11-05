import { logos, Text } from '@swingby-protocol/pulsar';
import React from 'react';

import { DescribeSpan } from '../../../DescribeSpan';

import { AmountSpan, CoinContainer, CoinImg, CoinInfo, DataDiv, Row } from './styled';

const dummyData = [
  { coin: logos.CoinBtc, float: 24.493, vol: 232.12 },
  { coin: logos.CoinBtce, float: 24.493, vol: 232.12 },
  { coin: logos.CoinBnb, float: 24.493, vol: 232.12 },
  { coin: logos.CoinBtcb, float: 24.493, vol: 232.12 },
];

const NetworkBridges = (): JSX.Element => {
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
                  <DescribeSpan>Float</DescribeSpan>
                  <AmountSpan>{coin.float}</AmountSpan>
                </Row>
                <Row>
                  <DescribeSpan>Vol</DescribeSpan>
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

export default NetworkBridges;
