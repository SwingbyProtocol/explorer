import { Dropdown, getCryptoAssetFormatter, Text } from '@swingby-protocol/pulsar';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import { FormattedMessage, useIntl } from 'react-intl';
import { useTheme } from 'styled-components';

import { CoinSymbol } from '../../../../../coins';
import { PATH, ROOT_URL } from '../../../../../env';
import {
  castUiStatus,
  convertTxTime,
  currencyNetwork,
  getBorderColor,
  getRequiredBlockConfirmations,
  SkyPoolsQuery,
  TxStatus,
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

export const TxHistoriesItem = ({
  tx,
  bgKey,
  setToggleOpenLink,
  setTxDetail,
  toggleOpenLink,
}: {
  tx: SkyPoolsQuery;
  bgKey: number;
  toggleOpenLink: number;
  setToggleOpenLink: (arg: number) => void;
  setTxDetail: (tx: SkyPoolsQuery) => void;
}) => {
  const { locale } = useIntl();
  const theme = useTheme();
  const { query } = useRouter();
  const params = query;
  const chainBridge = String(params.bridge || '');
  const borderColor = getBorderColor({ status: tx.status, theme });

  return (
    <TxHistoryRow
      key={tx.hash}
      bg={bgKey % 2 !== 0}
      borderColor={borderColor}
      onClick={() => {
        window.open(
          `${ROOT_URL}${chainBridge === 'floats' ? PATH.FLOAT : PATH.SWAP}/${tx.hash}`,
          '_blank',
          'noopener',
        );
      }}
    >
      <Column>
        <Status>
          <StatusCircle status={tx.status} />
          <StatusText variant="accent">{castUiStatus(tx.status)}</StatusText>
        </Status>
        <Row>
          <TextTime variant="label">
            {convertTxTime(DateTime.fromMillis(tx.timestamp * 1000))}
          </TextTime>
        </Row>
        {tx.status === TxStatus.PENDING && (
          <RowAbsolute>
            <TextConfirmation variant="label">
              <FormattedMessage
                id="home.recent-swaps.confirmation"
                values={{
                  confirmations: getRequiredBlockConfirmations(tx.currencyIn as CoinSymbol),
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
          <AddressLinkP>{tx.addressOut && tx.addressOut.toLowerCase()}</AddressLinkP>
        </RowAddress>
        <RowAddress>
          <Text variant="label">
            <FormattedMessage id="common.to" />
          </Text>
          <AddressLinkP>{tx.addressIn?.toLowerCase()}</AddressLinkP>
        </RowAddress>
      </ColumnM>
      <ColumnAmount>
        <Coin symbol={tx.currencyIn} />
        <div>
          <Top>
            <NetworkText variant="label">{currencyNetwork(tx.currencyIn)}</NetworkText>
          </Top>
          <RowAmount>
            <AmountSpan variant="accent">{tx.amountIn}</AmountSpan>
          </RowAmount>
        </div>
      </ColumnAmount>
      <Column>
        <IconArrowRight />
      </Column>
      <ColumnAmount>
        <Coin symbol={tx.currencyOut} />
        <div>
          <Top>
            <NetworkText variant="label">{currencyNetwork(tx.currencyOut)}</NetworkText>
          </Top>
          <RowAmount>
            <AmountSpan variant="accent">{tx.amountOut}</AmountSpan>
          </RowAmount>
        </div>
      </ColumnAmount>
      <ColumnFee>
        <Text variant="section-title">
          {getCryptoAssetFormatter({
            locale,
            displaySymbol: tx.feeCurrency,
          }).format(Number(tx.fee))}
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
                setTxDetail(tx);
              }}
            >
              <FormattedMessage id="home.recent-swaps.check-swap-progress" />
            </Dropdown.Item>
            {tx.txIdOut && (
              <Dropdown.Item
                onClick={() => {
                  window.open(
                    transactionDetailByTxId(tx.currencyOut as CoinSymbol, tx.txIdOut),
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
  );
};
