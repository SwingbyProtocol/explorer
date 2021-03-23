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
} from '../../../../../explorer';
import { useLinkToWidget } from '../../../../../hooks';
import { selectSwapDetails } from '../../../../../store';
import { transactionDetailByTxId } from '../../../../../swap';
import { SizeM } from '../../../../Common';

import {
  AddressP,
  AmountSpan,
  Row,
  Coin,
  Column,
  ColumnAmount,
  ColumnEllipsis,
  ColumnFee,
  Ellipsis,
  IconArrowRight,
  Status,
  StatusCircle,
  StatusText,
  Top,
  TxHistoryRow,
  RowAmount,
  NetworkText,
  ColumnM,
  ColumnMobile,
  RowAddress,
  IconDetail,
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
        // variants={page === 1 && TxRowVariants}
        // transition={page === 1 && TxRowTransition}
        // initial={page === 1 ? 'initial' : null}
        // animate={page === 1 ? 'in' : null}
      >
        <Column>
          <Status>
            <StatusCircle status={tx.status} />
            <StatusText variant="accent">{capitalize(tx.status)}</StatusText>
          </Status>
          <Row>{/* <Text variant="label">{convertTxTime(DateTime.fromISO(tx.at))}</Text> */}</Row>
        </Column>
        {/* <ColumnM>
          <Row>
            <Text variant="label">
              <FormattedMessage id="common.from" />
            </Text>
          </Row>
          <Row>
            <Text variant="label">
              <FormattedMessage id="common.to" />
            </Text>
          </Row>
        </ColumnM> */}
        <ColumnM>
          <RowAddress>
            <Text variant="label">
              <FormattedMessage id="common.from" />
            </Text>
            <AddressP>{tx.depositAddress.toLowerCase()}</AddressP>
          </RowAddress>
          <RowAddress>
            <Text variant="label">
              <FormattedMessage id="common.to" />
            </Text>
            <AddressP>{tx.receivingAddress.toLowerCase()}</AddressP>
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
