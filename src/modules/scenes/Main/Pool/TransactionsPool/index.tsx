import { Text } from '@swingby-protocol/pulsar';
import React from 'react';

import { SeeMore } from '../../../../../components/SeeMore';
import { TXS_COUNT } from '../../../../env';
import { convertTxTime } from '../../../../explorer';

import {
  AddressP,
  TransactionsContainer,
  Row,
  TextAmount,
  TitleText,
  TransactionsPoolContainer,
} from './styled';

export const TransactionsPool = () => {
  const currentTime = Date.now() / 1000;
  const txsData = [
    {
      timestamp: currentTime - 60,
      txId: '0xf8c3f7b71ee69ffff3c8d124239abd1cab7e7e428a2f023ab07c09f488141413',
      amount: 0.123,
    },
    {
      timestamp: currentTime - 3559,
      txId: '0xf8c3f7b71ee69ffff3c8d124239abd1cab7e7e428a2f023ab07c09f488141413',
      amount: -0.123,
    },
    {
      timestamp: currentTime - 30000,
      txId: '0xf8c3f7b71ee69ffff3c8d124239abd1cab7e7e428a2f023ab07c09f488141413',
      amount: 0.223,
    },
    {
      timestamp: currentTime - 60000,
      txId: '0xf8c3f7b71ee69ffff3c8d124239abd1cab7e7e428a2f023ab07c09f488141413',
      amount: -0.223,
    },
    {
      timestamp: currentTime - 200000,
      txId: '0xf8c3f7b71ee69ffff3c8d124239abd1cab7e7e428a2f023ab07c09f488141413',
      amount: 1.123,
    },
    {
      timestamp: currentTime - 250000,
      txId: '0xf8c3f7b71ee69ffff3c8d124239abd1cab7e7e428a2f023ab07c09f488141413',
      amount: 1000.123,
    },
  ];

  const txsDataSlice = txsData.slice(0, TXS_COUNT);

  return (
    <TransactionsPoolContainer>
      <TitleText variant="accent">Transactions</TitleText>
      <TransactionsContainer>
        {txsDataSlice &&
          txsDataSlice.map((data, i) => {
            return (
              <Row key={i}>
                <Text variant="label">{convertTxTime(data.timestamp)}</Text>
                <AddressP>{data.txId}</AddressP>
                <TextAmount variant="accent">{data.amount}</TextAmount>
              </Row>
            );
          })}
        {txsData.length > 4 && txsData.length !== 5 && <SeeMore />}
      </TransactionsContainer>
    </TransactionsPoolContainer>
  );
};
