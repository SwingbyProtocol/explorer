import { Dropdown, getCryptoAssetFormatter, Text } from '@swingby-protocol/pulsar';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useTheme } from 'styled-components';

import { Pagination } from '../../../../../components/Pagination';
import { Transaction, useTransactionsHistoryQuery } from '../../../../../generated/graphql';
import {
  capitalize,
  convertTxTime,
  currencyNetwork,
  getBorderColor,
  TSwapWidget,
  TTxRawObject,
  TxRowTransition,
  TxRowVariants,
} from '../../../../explorer';
import { transactionDetailByTxId } from '../../../../swap';

import {
  AddressP,
  AmountSpan,
  Bottom,
  BrowserFooter,
  Coin,
  Column,
  ColumnAmount,
  ColumnEllipsis,
  ColumnFee,
  Ellipsis,
  Left,
  Right,
  Status,
  StatusCircle,
  StatusText,
  IconArrowRight,
  TextFee,
  TitleRow,
  Top,
  TxHistoriesContainer,
  TxHistoryRow,
} from './styled';

interface Props {
  filter: JSX.Element;
  loader: JSX.Element;
  adjustIndex: number;
  page: number;
  maximumPage: number;
  bridge: string;
  isNoResult: boolean;
  isLoadingHistory: boolean;
  noResultFound: JSX.Element;
  currentTxs: TTxRawObject[];
  goNextPage: () => void;
  goBackPage: () => void;
  goToDetail: (arg: string) => void;
  linkToSwapWidget: (tx: TTxRawObject, action: TSwapWidget) => void;
}

export const TxHistories = (props: Props) => {
  const {
    filter,
    maximumPage,
    page,
    currentTxs,
    goNextPage,
    bridge,
    goBackPage,
    goToDetail,
    loader,
    linkToSwapWidget,
    isNoResult,
    isLoadingHistory,
    noResultFound,
    adjustIndex,
  } = props;

  const { locale } = useIntl();

  const dispatch = useDispatch();
  const [chosenTx, setChosenTx] = useState(null);
  const [toggleOpenLink, setToggleOpenLink] = useState(1);
  const router = useRouter();
  const theme = useTheme();
  const { data, fetchMore } = useTransactionsHistoryQuery({
    variables: { first: 25 },
  });

  useEffect(() => {
    if (chosenTx) {
      linkToSwapWidget(chosenTx, 'claim');
    }
  }, [chosenTx, toggleOpenLink, linkToSwapWidget]);

  const externalLinkMenu = (tx: Pick<Transaction, 'receivingTxHash' | 'receivingCurrency'>) => (
    <>
      <Dropdown.Item
        onClick={() => {
          setChosenTx(tx);
          setToggleOpenLink(toggleOpenLink + 1);
        }}
      >
        <p>
          <FormattedMessage id="home.recent-swaps.check-swap-progress" />
        </p>
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
    </>
  );

  // Memo: px for row height
  const rowHeight = 90;
  const rowHeightWithTxs = currentTxs && currentTxs.length * rowHeight;

  return (
    <>
      <TxHistoriesContainer txsHeight={rowHeightWithTxs}>
        <TitleRow>
          <Left>
            <Text variant="section-title">
              <FormattedMessage id="home.recent-swaps.recent-swaps" />
            </Text>
          </Left>
          <Right isFloats={bridge === 'floats'}>
            <TextFee variant="section-title">
              {bridge === 'floats' ? (
                <FormattedMessage id="home.recent-swaps.fees-max" />
              ) : (
                <FormattedMessage id="home.recent-swaps.fees" />
              )}
            </TextFee>
            {filter}
          </Right>
        </TitleRow>
        {router.query.q && isNoResult && noResultFound}
        {/* Memo: show loader */}
        {page > 1 ? !currentTxs.length && loader : isLoadingHistory && loader}
        {data?.transactions.edges.map(({ node: tx }, i) => {
          const bgKey = i - adjustIndex;
          const borderColor = getBorderColor({ status: tx.status, theme });
          return (
            <TxHistoryRow
              key={tx.id}
              bg={bgKey % 2 !== 0}
              borderColor={borderColor}
              onClick={() => goToDetail(tx.id)}
              variants={page === 1 && TxRowVariants}
              transition={page === 1 && TxRowTransition}
              initial={page === 1 ? 'initial' : null}
              animate={page === 1 ? 'in' : null}
            >
              <Column>
                <Status>
                  <StatusCircle status={tx.status} />
                  <StatusText variant="accent">{capitalize(tx.status)}</StatusText>
                </Status>
                <Bottom>
                  <Text variant="label">{convertTxTime(DateTime.fromISO(tx.at))}</Text>
                </Bottom>
              </Column>
              <Column>
                <Top>
                  <Text variant="label">
                    <FormattedMessage id="common.from" />
                  </Text>
                </Top>
                <Bottom>
                  <Text variant="label">
                    <FormattedMessage id="common.to" />
                  </Text>
                </Bottom>
              </Column>
              <Column>
                <Top>
                  <AddressP>{tx.depositAddress.toLowerCase()}</AddressP>
                </Top>
                <Bottom>
                  <AddressP>{tx.receivingAddress.toLowerCase()}</AddressP>
                </Bottom>
              </Column>
              <ColumnAmount>
                <Coin symbol={tx.depositCurrency} />
                <div>
                  <Top>
                    <Text variant="label">{currencyNetwork(tx.depositCurrency)}</Text>
                  </Top>
                  <Bottom>
                    <AmountSpan variant="accent">{tx.depositAmount}</AmountSpan>
                  </Bottom>
                </div>
              </ColumnAmount>
              <Column>
                <IconArrowRight />
              </Column>
              <ColumnAmount>
                <Coin symbol={tx.receivingCurrency} />
                <div>
                  <Top>
                    <Text variant="label">{currencyNetwork(tx.receivingCurrency)}</Text>
                  </Top>
                  <Bottom>
                    <AmountSpan variant="accent">{tx.receivingAmount}</AmountSpan>
                  </Bottom>
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
              <ColumnEllipsis
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                <Dropdown target={<Ellipsis />} data-testid="dropdown">
                  {externalLinkMenu(tx)}
                </Dropdown>
              </ColumnEllipsis>
            </TxHistoryRow>
          );
        })}
      </TxHistoriesContainer>
      <BrowserFooter>
        <Pagination
          goNextPage={goNextPage}
          goBackPage={goBackPage}
          page={page}
          maximumPage={maximumPage}
          isSimple={true}
        />
      </BrowserFooter>
    </>
  );
};
