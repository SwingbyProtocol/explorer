import { Text } from '@swingby-protocol/pulsar';
import React from 'react';

import { currencyNetwork } from '../../../../explorer';
import { transactionDetail } from '../../../../swap/';

import {
  Coin,
  Column,
  DetailCardContainer,
  AmountSpan,
  AddressP,
  RowAddress,
  RowRole,
  Top,
  Bottom,
  IconInfo,
} from './styled';

interface Props {
  role: string;
  currency: string;
  amount: string;
  address: string;
  txId: string;
}

export const DetailCard = (props: Props) => {
  const { role, currency, amount, address, txId } = props;
  return (
    <DetailCardContainer>
      <RowRole>
        <Text variant="section-title">{role}</Text>
        {txId && (
          <a href={transactionDetail(currency, txId)} rel="noopener noreferrer" target="_blank">
            <IconInfo />
          </a>
        )}
      </RowRole>
      <Column>
        <Coin symbol={currency} />
        <div>
          <Top>
            <Text variant="label">{currencyNetwork(currency)}</Text>
          </Top>
          <Bottom>
            <AmountSpan variant="accent">{amount}</AmountSpan>
          </Bottom>
        </div>
      </Column>
      <RowAddress>
        <Text variant="label">{role}</Text>
        <AddressP>{address}</AddressP>
      </RowAddress>
      <RowAddress>
        <Text variant="label">TxId</Text>
        <AddressP>{txId}</AddressP>
      </RowAddress>
    </DetailCardContainer>
  );
};
