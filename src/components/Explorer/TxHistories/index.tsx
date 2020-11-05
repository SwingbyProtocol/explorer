import { logos, Text } from '@swingby-protocol/pulsar';
import React from 'react';

import { DescribeSpan } from '../../DescribeSpan';

import {
  AddressP,
  AmountSpan,
  Bottom,
  CoinImg,
  Column,
  ColumnAmount,
  Ellipsis,
  FeeSpan,
  Filter,
  Left,
  Right,
  Status,
  StatusText,
  SwapHorizontal,
  TimePastText,
  TitleRow,
  Top,
  TxHistoriesContainer,
  TxHistoriesRow,
} from './styled';

const TxHistories = () => {
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
            <StatusText>Waiting</StatusText>
          </Status>
          <Bottom>
            <TimePastText>1 min. ago</TimePastText>
          </Bottom>
        </Column>
        <Column>
          <Top>
            <DescribeSpan>From</DescribeSpan>
          </Top>
          <Bottom>
            <DescribeSpan>To</DescribeSpan>
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
              <DescribeSpan>BTC</DescribeSpan>
            </Top>
            <Bottom>
              <AmountSpan>0.00039708</AmountSpan>
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
              <DescribeSpan>BTC on Bnbchain</DescribeSpan>
            </Top>
            <Bottom>
              <AmountSpan>0.00039308</AmountSpan>
            </Bottom>
          </div>
        </ColumnAmount>
        <div />
        <Column>
          <FeeSpan>0.002BTC</FeeSpan>
        </Column>
        <Column>
          <Ellipsis />
        </Column>
      </TxHistoriesRow>
    </TxHistoriesContainer>
  );
};

export default TxHistories;
