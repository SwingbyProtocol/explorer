import { Dropdown, getCryptoAssetFormatter, Text } from '@swingby-protocol/pulsar';
import { DateTime } from 'luxon';
import { useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useTheme } from 'styled-components';

import { LinkToWidgetModal } from '../../../../../../components/LinkToWidgetModal';
import type { TransactionsHistoryQueryHookResult } from '../../../../../../generated/graphql';
import {
  capitalize,
  castGraphQlType,
  convertTxTime,
  currencyNetwork,
  getBorderColor,
  TxRowTransition,
  TxRowVariants,
} from '../../../../../explorer';
import { useLinkToWidget } from '../../../../../hooks';
import { selectSwapDetails } from '../../../../../store';
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
  Top,
  TxHistoryRow,
  TextTime,
} from './styled';

type QueriedTransaction = TransactionsHistoryQueryHookResult['data']['transactions']['edges'][number]['node'];

export const TxHistoriesItem = ({
  tx,
  goToDetail,
  bgKey,
}: {
  tx: QueriedTransaction;
  goToDetail: (arg: string) => void;
  bgKey: number;
}) => {
  const { locale } = useIntl();
  const dispatch = useDispatch();
  const theme = useTheme();

  const [toggleOpenLink, setToggleOpenLink] = useState(1);

  const borderColor = getBorderColor({ status: tx.status, theme });

  const oldTxType = useMemo(
    () => ({
      addressDeposit: tx.depositAddress,
      addressIn: tx.depositAddress,
      addressOut: tx.receivingAddress,
      amountIn: tx.depositAmount,
      amountOut: tx.receivingAmount,
      currencyIn: tx.depositCurrency,
      currencyOut: tx.receivingCurrency,
      status: tx.status,
      hash: tx.id,
      fee: tx.feeTotal,
      feeCurrency: tx.feeCurrency,
      timestamp: DateTime.fromISO(tx.at).toMillis(),
    }),
    [tx],
  );

  const { isClaimWidgetModalOpen, setIsClaimWidgetModalOpen } = useLinkToWidget({
    toggleOpenLink,
    tx: oldTxType,
    action: 'claim',
  });

  return (
    <>
      <LinkToWidgetModal
        isWidgetModalOpen={isClaimWidgetModalOpen}
        setIsWidgetModalOpen={setIsClaimWidgetModalOpen}
        tx={oldTxType}
      />
      <TxHistoryRow
        key={tx.id}
        bg={bgKey % 2 !== 0}
        borderColor={borderColor}
        onClick={() => goToDetail(tx.id)}
        onMouseEnter={() => {
          const txData = castGraphQlType(tx);
          dispatch(selectSwapDetails(txData));
        }}
        variants={TxRowVariants}
        transition={TxRowTransition}
        initial={'initial'}
        animate={'in'}
      >
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
            <AddressLinkP>{tx.depositAddress.toLowerCase()}</AddressLinkP>
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
              <NetworkText variant="label">{currencyNetwork(tx.depositCurrency)}</NetworkText>
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
              <NetworkText variant="label">{currencyNetwork(tx.receivingCurrency)}</NetworkText>
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
              displaySymbol: tx.feeCurrency,
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
              <Dropdown.Item onClick={() => setToggleOpenLink(toggleOpenLink + 1)}>
                <FormattedMessage id="home.recent-swaps.check-swap-progress" />
              </Dropdown.Item>
              {tx.receivingTxHash && (
                <Dropdown.Item
                  onClick={() =>
                    window.open(
                      transactionDetailByTxId(tx.receivingCurrency, tx.receivingTxHash),
                      '_blank',
                      'noopener',
                    )
                  }
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
    </>
  );
};
