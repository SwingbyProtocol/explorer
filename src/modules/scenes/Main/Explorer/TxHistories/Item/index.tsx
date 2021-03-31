/* eslint-disable import/no-internal-modules */

import { Dropdown, getCryptoAssetFormatter, Text } from '@swingby-protocol/pulsar';
import { DateTime } from 'luxon';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useTheme } from 'styled-components';

import type {
  Transaction,
  TransactionsHistoryQueryHookResult,
} from '../../../../../../generated/graphql';
import { PATH } from '../../../../../env';
import {
  capitalize,
  castGraphQlType,
  convertTxTime,
  currencyNetwork,
  getBorderColor,
} from '../../../../../explorer';
import { transactionDetailByTxId } from '../../../../../swap';
import { AddressLinkP } from '../../../../Common';

import {
  AmountSpan,
  Coin,
  Column,
  ColumnAmount,
  ColumnEllipsis,
  ColumnFee,
  ColumnM,
  ColumnMobile,
  Ellipsis,
  IconArrowRight,
  IconDetail,
  NetworkText,
  Row,
  RowAddress,
  RowAmount,
  Status,
  StatusCircle,
  StatusText,
  TextTime,
  Top,
  TxHistoryRow,
} from './styled';

type QueriedTransaction = TransactionsHistoryQueryHookResult['data']['transactions']['edges'][number]['node'];

export const TxHistoriesItem = ({
  tx,
  bgKey,
  style,
  setToggleOpenLink,
  setTxDetail,
  toggleOpenLink,
}: {
  tx: QueriedTransaction;
  bgKey: number;
  style: any;
  toggleOpenLink: number;
  setToggleOpenLink: (arg: number) => void;
  setTxDetail: (tx: Transaction) => void;
}) => {
  const { locale } = useIntl();
  const theme = useTheme();
  const { query } = useRouter();
  const params = query;
  const chainBridge = String(params.bridge || '');
  const borderColor = getBorderColor({ status: tx.status, theme });
  const oldTxType = useMemo(() => castGraphQlType(tx as Transaction), [tx]);

  return (
    <Link href={`${chainBridge === 'floats' ? PATH.FLOAT : PATH.SWAP}/${tx.id}`}>
      <TxHistoryRow key={tx.id} bg={bgKey % 2 !== 0} borderColor={borderColor} style={style}>
        <Column>
          <Status>
            <StatusCircle status={tx.status} />
            <StatusText variant="accent">{capitalize(tx.status)}</StatusText>
          </Status>
          <Row>
            <TextTime variant="label">{convertTxTime(DateTime.fromISO(tx.at))}</TextTime>
          </Row>
        </Column>
        <ColumnM>
          <RowAddress>
            <Text variant="label">
              <FormattedMessage id="common.from" />
            </Text>
            <AddressLinkP>{tx.sendingAddress && tx.sendingAddress.toLowerCase()}</AddressLinkP>
          </RowAddress>
          <RowAddress>
            <Text variant="label">
              <FormattedMessage id="common.to" />
            </Text>
            <AddressLinkP>{tx.receivingAddress.toLowerCase()}</AddressLinkP>
          </RowAddress>
        </ColumnM>
        <ColumnAmount>
          <Coin symbol={tx.depositCurrency} />
          <div>
            <Top>
              <NetworkText variant="label">{currencyNetwork(oldTxType.currencyIn)}</NetworkText>
            </Top>
            <RowAmount>
              <AmountSpan variant="accent">{tx.depositAmount}</AmountSpan>
            </RowAmount>
          </div>
        </ColumnAmount>
        <Column>
          <IconArrowRight />
        </Column>
        <ColumnAmount>
          <Coin symbol={tx.receivingCurrency} />
          <div>
            <Top>
              <NetworkText variant="label">{currencyNetwork(oldTxType.currencyOut)}</NetworkText>
            </Top>
            <RowAmount>
              <AmountSpan variant="accent">{tx.receivingAmount}</AmountSpan>
            </RowAmount>
          </div>
        </ColumnAmount>
        <ColumnFee>
          <Text variant="section-title">
            {getCryptoAssetFormatter({
              locale,
              displaySymbol: oldTxType.feeCurrency,
            }).format(Number(tx.feeTotal))}
          </Text>
        </ColumnFee>
        <ColumnMobile>
          <IconDetail />
        </ColumnMobile>
        <ColumnM>
          <ColumnEllipsis
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <Dropdown target={<Ellipsis />} data-testid="dropdown">
              <Dropdown.Item
                onClick={() => {
                  setToggleOpenLink(toggleOpenLink + 1);
                  setTxDetail(tx as Transaction);
                }}
              >
                <FormattedMessage id="home.recent-swaps.check-swap-progress" />
              </Dropdown.Item>
              {tx.receivingTxHash && (
                <Dropdown.Item
                  onClick={() => {
                    console.log(tx);
                    window.open(
                      transactionDetailByTxId(oldTxType.currencyOut, tx.receivingTxHash),
                      '_blank',
                      'noopener',
                    );
                  }}
                >
                  <p>
                    <FormattedMessage id="home.recent-swaps.get-tx-details" />
                  </p>
                </Dropdown.Item>
              )}
            </Dropdown>
          </ColumnEllipsis>
        </ColumnM>
      </TxHistoryRow>
    </Link>
  );
};
