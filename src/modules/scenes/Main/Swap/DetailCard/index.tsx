import { Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { currencyNetwork } from '../../../../explorer';
import { transactionDetailByTxId } from '../../../../swap/';
import { IconInfo } from '../../../Common';

import {
  Coin,
  Column,
  DetailCardContainer,
  TextAmount,
  AddressP,
  RowAddress,
  RowRole,
  Top,
  Bottom,
  TextRoom,
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
  const formattedRole = <FormattedMessage id={role === 'From' ? 'common.from' : 'common.to'} />;

  return (
    <DetailCardContainer>
      <RowRole>
        <Text variant="section-title">{formattedRole}</Text>
        {txId && (
          <a
            href={transactionDetailByTxId(currency, txId)}
            rel="noopener noreferrer"
            target="_blank"
          >
            <IconInfo />
          </a>
        )}
      </RowRole>
      <Column>
        <Coin symbol={currency} />
        <div>
          <Top>
            <TextRoom variant="label">{currencyNetwork(currency)}</TextRoom>
          </Top>
          <Bottom>
            <TextAmount variant="accent">{amount}</TextAmount>
          </Bottom>
        </div>
      </Column>
      <RowAddress>
        <TextRoom variant="label">{formattedRole}</TextRoom>
        <AddressP>{address}</AddressP>
      </RowAddress>
      <RowAddress>
        <TextRoom variant="label">
          <FormattedMessage id="swap.txId" />
        </TextRoom>
        <AddressP>{txId}</AddressP>
      </RowAddress>
    </DetailCardContainer>
  );
};
