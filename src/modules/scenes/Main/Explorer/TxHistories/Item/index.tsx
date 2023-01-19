/* eslint-disable import/no-internal-modules */

import { Dropdown, getCryptoAssetFormatter, Text } from '@swingby-protocol/pulsar';
import { DateTime } from 'luxon';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import { FormattedMessage, useIntl } from 'react-intl';
import { useTheme } from 'styled-components';

import type {
  Transaction,
  TransactionsHistoryQueryHookResult,
} from '../../../../../../generated/graphql';
import { PATH } from '../../../../../env';
import {
  castGraphQlType,
  castUiStatus,
  convertTxTime,
  currencyNetwork,
  getBorderColor,
  getRequiredBlockConfirmations,
  TxStatus,
} from '../../../../../explorer';
import { transactionDetailByTxId } from '../../../../../swap';
import { AddressLinkP } from '../../../../Common';
import { swingbyTextDisplay } from '../../../../../coins';

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
  RowAbsolute,
  RowAddress,
  RowAmount,
  Status,
  StatusCircle,
  StatusText,
  TextConfirmation,
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
  const [sendingAddress, setSendingAddress] = useState(tx.sendingAddress);
  const [receivingAddress, setReceivingAddress] = useState(tx.receivingAddress);

  const reverseUD = async (search_value: String) => {
    if (!search_value) return search_value;
    const API_URL = 'https://resolve.unstoppabledomains.com/reverse/';
    const API_KEY1 = process.env.NEXT_PUBLIC_UD_API_KEY;
    try {
      var res = await axios.get(API_URL + search_value, {
        headers: {
          Authorization: `bearer ${API_KEY1}`,
        },
      });

      if (res.data.meta.domain === '') return search_value.toLowerCase();
      return res.data.meta.owner;
    } catch (err) {
      return search_value.toLowerCase();
    }
  };

  useEffect(() => {
    reverseUD(sendingAddress).then((res) => {
      setSendingAddress(res);
    });
    reverseUD(receivingAddress).then((res) => {
      setReceivingAddress(res);
    });
  });

  return (
    <Link href={`${chainBridge === 'floats' ? PATH.FLOAT : PATH.SWAP}/${tx.id}`}>
      <TxHistoryRow key={tx.id} bg={bgKey % 2 !== 0} borderColor={borderColor} style={style}>
        <Column>
          <Status>
            <StatusCircle status={tx.status} />
            <StatusText variant="accent">{castUiStatus(tx.status)}</StatusText>
          </Status>
          <Row>
            <TextTime variant="label">{convertTxTime(DateTime.fromISO(tx.at))}</TextTime>
          </Row>
          {tx.status === TxStatus.PENDING && (
            <RowAbsolute>
              <TextConfirmation variant="label">
                <FormattedMessage
                  id="home.recent-swaps.confirmation"
                  values={{
                    confirmations: getRequiredBlockConfirmations(oldTxType.currencyIn),
                  }}
                />
              </TextConfirmation>
            </RowAbsolute>
          )}
        </Column>
        <ColumnM>
          <RowAddress>
            <Text variant="label">
              <FormattedMessage id="common.from" />
            </Text>
            <AddressLinkP>{sendingAddress}</AddressLinkP>
          </RowAddress>
          <RowAddress>
            <Text variant="label">
              <FormattedMessage id="common.to" />
            </Text>
            <AddressLinkP>{receivingAddress}</AddressLinkP>
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
              displaySymbol: swingbyTextDisplay(oldTxType.feeCurrency),
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
