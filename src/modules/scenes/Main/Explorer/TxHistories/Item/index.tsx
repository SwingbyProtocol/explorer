import { stringifyUrl } from 'query-string';
import { Dropdown, getCryptoAssetFormatter, Text } from '@swingby-protocol/pulsar';
import { DateTime } from 'luxon';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo, useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useTheme } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { resolveAddressSelector, fetchResolvedAddress } from '../../../../../store';
import type {
  Transaction,
  TransactionsHistoryQueryHookResult,
} from '../../../../../../generated/graphql';
import { PATH, ADDRESS_RESOLVER } from '../../../../../env';
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
import { fetcher } from '../../../../../../modules/fetch';

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

type QueriedTransaction =
  TransactionsHistoryQueryHookResult['data']['transactions']['edges'][number]['node'];

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
  const dispatch = useDispatch();

  const { locale } = useIntl();
  const theme = useTheme();
  const { query } = useRouter();
  const params = query;
  const chainBridge = String(params.bridge || '');
  const borderColor = getBorderColor({ status: tx.status, theme });
  const oldTxType = useMemo(() => castGraphQlType(tx as Transaction), [tx]);

  const txSendingAddress = tx.sendingAddress?.toLowerCase();
  const txReceivingAddress = tx.receivingAddress?.toLowerCase();
  const sendingAddress = useSelector(resolveAddressSelector(txSendingAddress));
  const receivingAddress = useSelector(resolveAddressSelector(txReceivingAddress));

  const resolveAddress = async (search_value: string) => {
    const resolveAddressUrl = stringifyUrl({
      url: `/api/v1/addr-resolve`,
      query: { address: search_value, resolver: ADDRESS_RESOLVER.UD },
    });

    try {
      const result = await fetcher<{ address: string; isResolved: boolean }>(resolveAddressUrl);
      if (result.isResolved) return result.address;
      else return search_value;
    } catch {
      return search_value;
    }
  };

  useEffect(() => {
    if (sendingAddress || !txSendingAddress) return;
    resolveAddress(txSendingAddress).then((resolvedAddress) => {
      dispatch(fetchResolvedAddress(resolvedAddress, txSendingAddress));
    });
  }, [dispatch, sendingAddress, txSendingAddress]);

  useEffect(() => {
    if (receivingAddress || !txReceivingAddress) return;
    resolveAddress(txReceivingAddress).then((resolvedAddress) => {
      dispatch(fetchResolvedAddress(resolvedAddress, txReceivingAddress));
    });
  }, [dispatch, receivingAddress, txReceivingAddress]);

  return (
    <Link href={`${chainBridge === 'floats' ? PATH.FLOAT : PATH.EXPLORER}/${tx.id}`}>
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
            <AddressLinkP>{sendingAddress ?? txSendingAddress}</AddressLinkP>
          </RowAddress>
          <RowAddress>
            <Text variant="label">
              <FormattedMessage id="common.to" />
            </Text>
            <AddressLinkP>{receivingAddress ?? txReceivingAddress}</AddressLinkP>
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
              event.preventDefault();
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
