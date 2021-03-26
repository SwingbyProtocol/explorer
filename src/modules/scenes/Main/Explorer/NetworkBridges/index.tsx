import { Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

import { CoinSymbol } from '../../../../coins';
import { mode } from '../../../../env';
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
  const theme = useTheme();
  const data = [
    { coin: CoinSymbol.BTC, float: floatBalances.btc, vol: stats.volume1wksBTC },
    { coin: CoinSymbol.WBTC, float: floatBalances.wbtc, vol: stats.volume1wksWBTC },
    // Todo: apply for production when ready
    mode === 'test' && {
      coin: CoinSymbol.BTC_B,
      float: floatBalances.btcb,
      vol: stats.volume1wksBTCB,
    },
  ];
  const placeholderLoader = (
    <PulseLoader margin={3} size={4} color={theme.pulsar.color.text.normal} />
  );
  return (
    <NetworkBridgeContainer>
      <TitleText variant="section-title">
        {' '}
        <FormattedMessage id="home.network.network-bridges" />
      </TitleText>
      <CoinContainer>
        {data.map((coin) => {
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
      </CoinContainer>
    </NetworkBridgeContainer>
  );
};
