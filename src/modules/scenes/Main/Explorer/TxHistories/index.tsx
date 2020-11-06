import { logos, Text } from '@swingby-protocol/pulsar';
import React from 'react';

import {
  AddressP,
  AmountSpan,
  Bottom,
  CoinImg,
  Column,
  ColumnAmount,
  Ellipsis,
  Filter,
  Left,
  Right,
  Status,
  StatusText,
  SwapHorizontal,
  TitleRow,
  Top,
  TxHistoriesContainer,
  TxHistoriesRow,
} from './styled';

export const TxHistories = () => {
  return (
    <TxHistoriesContainer>
      <TitleRow>
        <Left>
          <Text variant="section-title">Recent Swaps</Text>
        </Left>
        <Right>
          <Text variant="section-title">Fees</Text>
          <Filter />
        </Right>
      </TitleRow>
      <TxHistoriesRow>
        <Column>
          <Status>
            {/* Todo: Add circle icon */}
            <StatusText variant="accent">Waiting</StatusText>
          </Status>
          <Bottom>
            <Text variant="label">1 min. ago</Text>
          </Bottom>
        </Column>
        <Column>
          <Top>
            <Text variant="label">From</Text>
          </Top>
          <Bottom>
            <Text variant="label">To</Text>
          </Bottom>
        </Column>
        <Column>
          <Top>
            <AddressP>tb1qcpkanu748ud8gs736nxvqqjn5d7q4pj5mhnnyp</AddressP>
          </Top>
          <Bottom>
            <AddressP>tbnb1lpq6tp2p72js9jjfk7ux8g2qjpm5udzpy4h7k5</AddressP>
          </Bottom>
        </Column>
        <ColumnAmount>
          <CoinImg src={logos.CoinBtc} alt="Coin" />
          <div>
            <Top>
              <Text variant="label">BTC</Text>
            </Top>
            <Bottom>
              <AmountSpan variant="accent">0.00039708</AmountSpan>
            </Bottom>
          </div>
        </ColumnAmount>
        <Column>
          <SwapHorizontal />
        </Column>
        <ColumnAmount>
          <CoinImg src={logos.CoinBtcb} alt="Coin" />
          <div>
            <Top>
              <Text variant="label">BTC on Bnbchain</Text>
            </Top>
            <Bottom>
              <AmountSpan variant="accent">0.00039308</AmountSpan>
            </Bottom>
          </div>
        </ColumnAmount>
        <Column>
          <Text variant="section-title">0.002BTC</Text>
        </Column>
        <Column>
          <Ellipsis />
        </Column>
      </TxHistoriesRow>
    </TxHistoriesContainer>
  );
};
