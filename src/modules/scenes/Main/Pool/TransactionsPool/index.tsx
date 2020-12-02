import { Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { useSelector } from 'react-redux';

import { SeeMore } from '../../../../../components/SeeMore';
import { URL_ETHERSCAN } from '../../../../env';
import { convertTxTime, toBTC } from '../../../../explorer';
import { IRecentTx } from '../../../../pool';

import { initialTxsData } from './initialData';
import {
  AddressA,
  Row,
  TextAmount,
  TitleText,
  TransactionsContainer,
  TransactionsPoolContainer,
} from './styled';

export const TransactionsPool = () => {
  const pool = useSelector((state) => state.pool);
  const { recentTxs, userAddress } = pool;

  const txsData = userAddress ? recentTxs : initialTxsData;

  return (
    <TransactionsPoolContainer>
      <TitleText variant="accent">Transactions</TitleText>
      <TransactionsContainer>
        {txsData &&
          txsData.map((data: IRecentTx) => {
            const value = toBTC(data.value);
            const time = convertTxTime(data.timeStamp);
            return (
              <Row key={data.hash}>
                <Text variant="label">{time}</Text>

                <AddressA
                  href={`${URL_ETHERSCAN}/tx/${data.hash}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {data.hash}
                </AddressA>
                <TextAmount variant="accent">{value}</TextAmount>
              </Row>
            );
          })}
        {txsData && txsData.length > 4 && txsData.length !== 5 && <SeeMore />}
      </TransactionsContainer>
    </TransactionsPoolContainer>
  );
};
