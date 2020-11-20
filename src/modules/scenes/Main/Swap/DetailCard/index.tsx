import { Text } from '@swingby-protocol/pulsar';
import React from 'react';

import { currencyNetwork } from '../../../../explorer';

import {
  Coin,
  Column,
  DetailCardContainer,
  AmountSpan,
  AddressP,
  Row,
  Top,
  Bottom,
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
      <Text variant="section-title">{role}</Text>
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
      <Row>
        <Text variant="label">{role}</Text>
        <AddressP>{address}</AddressP>
      </Row>
      <Row>
        <Text variant="label">TxId</Text>
        <AddressP>{txId}</AddressP>
      </Row>
    </DetailCardContainer>
  );
};
