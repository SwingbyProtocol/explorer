import { Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { FormattedNumber } from 'react-intl';

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
} from './styled';

interface Props {
  floatBalances: IFloat;
  stats: IStats;
}

export const NetworkBridges = (props: Props) => {
  const { floatBalances, stats } = props;
  const data = [
    { coin: CoinSymbol.BTC, float: floatBalances.btc, vol: stats.volume24HrBTC },
    { coin: CoinSymbol.BTC_E, float: floatBalances.wbtc, vol: stats.volume24HrWBTC },
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
                  <FloatSpan>
                    <FormattedNumber value={Number(coin.float)} />
                  </FloatSpan>
                </Row>
                <Row>
                  <Text variant="label">Vol</Text>
                  <VolSpan>
                    <FormattedNumber value={coin.vol} />
                  </VolSpan>
                </Row>
              </DataDiv>
            </CoinInfo>
          );
        })}
      </CoinContainer>
    </NetworkBridgeContainer>
  );
};
