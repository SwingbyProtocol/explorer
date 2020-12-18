import { Dropdown, getCryptoAssetFormatter, Icon, Text } from '@swingby-protocol/pulsar';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

import {
  capitalize,
  convertTxTime,
  currencyNetwork,
  statusColor,
  SwapRawObject,
} from '../../../../explorer';
import { selectSwapDetails } from '../../../../store';
import { transactionDetailByTxId } from '../../../../swap';

import {
  AddressP,
  AmountSpan,
  BackButton,
  Bottom,
  BrowserFooter,
  Coin,
  Column,
  ColumnAmount,
  ColumnEllipsis,
  ColumnFee,
  Ellipsis,
  Left,
  NextButton,
  PageRow,
  Pagination,
  Right,
  Status,
  StatusCircle,
  StatusText,
  SwapHorizontal,
  TextFee,
  TitleRow,
  Top,
  TxHistoriesContainer,
  TxHistoryRow,
} from './styled';

interface Props {
  filter: JSX.Element;
  loader: JSX.Element;
  page: number;
  maximumPage: number;
  isNoResult: boolean;
  isLoadingHistory: boolean;
  noResultFound: JSX.Element;
  currentTxs: SwapRawObject[];
  goNextPage: () => void;
  goBackPage: () => void;
  goToDetail: (arg: string) => void;
  linkToSwapWidget: (tx: SwapRawObject) => void;
}

export const TxHistories = (props: Props) => {
  const {
    filter,
    page,
    maximumPage,
    currentTxs,
    goNextPage,
    goBackPage,
    goToDetail,
    loader,
    linkToSwapWidget,
    isNoResult,
    isLoadingHistory,
    noResultFound,
  } = props;

  const { locale } = useIntl();

  const dispatch = useDispatch();
  const [chosenTx, setChosenTx] = useState(null);
  const [toggleOpenLink, setToggleOpenLink] = useState(1);
  useEffect(() => {
    if (chosenTx) {
      linkToSwapWidget(chosenTx);
    }
  }, [chosenTx, toggleOpenLink, linkToSwapWidget]);

  const externalLinkMenu = (tx: SwapRawObject) => (
    <>
      <Dropdown.Item
        onClick={() => {
          setChosenTx(tx);
          setToggleOpenLink(toggleOpenLink + 1);
        }}
      >
        <p>
          <FormattedMessage id="home.recentSwaps.checkSwapProgress" />
        </p>
      </Dropdown.Item>
      {tx.txIdOut && (
        <Dropdown.Item
          onClick={() =>
            window.open(transactionDetailByTxId(tx.currencyOut, tx.txIdOut), '_blank', 'noopener')
          }
        >
          <p>
            <FormattedMessage id="home.recentSwaps.getTxDetails" />
          </p>
        </Dropdown.Item>
      )}
    </>
  );

  // Memo: px for row height
  const rowHeight = 92;
  const rowHeightWithTxs = currentTxs && currentTxs.length * rowHeight;

  return (
    <>
      <TxHistoriesContainer txsHeight={rowHeightWithTxs}>
        <TitleRow>
          <Left>
            <Text variant="section-title">
              <FormattedMessage id="home.recentSwaps.recentSwaps" />
            </Text>
          </Left>
          <Right>
            <TextFee variant="section-title">
              <FormattedMessage id="home.recentSwaps.fees" />
            </TextFee>
            {filter}
          </Right>
        </TitleRow>
        {isNoResult && noResultFound}
        {/* Memo: show loader */}
        {page > 1 ? !currentTxs.length && loader : isLoadingHistory && loader}
        {currentTxs &&
          currentTxs.map((tx: SwapRawObject, i: number) => {
            return (
              <TxHistoryRow
                key={i}
                bg={i % 2 !== 0}
                onMouseEnter={() => dispatch(selectSwapDetails(tx))}
                onClick={() => goToDetail(tx.hash)}
              >
                <Column>
                  <Status>
                    <StatusCircle variant={statusColor(tx.status)} />
                    <StatusText variant="accent">{capitalize(tx.status)}</StatusText>
                  </Status>
                  <Bottom>
                    <Text variant="label">{convertTxTime(tx.timestamp)}</Text>
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
                    <AddressP>{tx.addressIn}</AddressP>
                  </Top>
                  <Bottom>
                    <AddressP>{tx.addressOut}</AddressP>
                  </Bottom>
                </Column>
                <ColumnAmount>
                  <Coin symbol={tx.currencyIn} />
                  <div>
                    <Top>
                      <Text variant="label">{currencyNetwork(tx.currencyIn)}</Text>
                    </Top>
                    <Bottom>
                      <AmountSpan variant="accent">{tx.amountIn}</AmountSpan>
                    </Bottom>
                  </div>
                </ColumnAmount>
                <Column>
                  <SwapHorizontal />
                </Column>
                <ColumnAmount>
                  <Coin symbol={tx.currencyOut} />
                  <div>
                    <Top>
                      <Text variant="label">{currencyNetwork(tx.currencyOut)}</Text>
                    </Top>
                    <Bottom>
                      <AmountSpan variant="accent">{tx.amountOut}</AmountSpan>
                    </Bottom>
                  </div>
                </ColumnAmount>
                <ColumnFee>
                  <Text variant="section-title">
                    {getCryptoAssetFormatter({
                      locale: locale,
                      displaySymbol: tx.currencyOut,
                    }).format(Number(tx.fee))}
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
        <Pagination>
          <BackButton
            variant="secondary"
            size="state"
            onClick={() => page > 1 && goBackPage()}
            disabled={1 >= page}
          >
            <Icon.CaretLeft />
          </BackButton>
          <PageRow page={page}>
            <Text variant="masked">
              <FormattedMessage id="common.page" />
              {page}
            </Text>
          </PageRow>
          <NextButton
            variant="secondary"
            size="state"
            onClick={() => maximumPage > page && goNextPage()}
            disabled={page >= maximumPage}
          >
            <Icon.CaretRight />
          </NextButton>
        </Pagination>
      </BrowserFooter>
    </>
  );
};
