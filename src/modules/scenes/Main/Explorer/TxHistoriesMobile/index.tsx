import { Icon, Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';

import {
  capitalize,
  convertTxTime,
  currencyNetwork,
  statusColor,
  SwapRawObject,
} from '../../../../explorer';
import { selectSwapDetails } from '../../../../store';

import {
  AmountText,
  BackButton,
  Bottom,
  BrowserFooter,
  Coin,
  Column,
  ColumnAmount,
  Detail,
  LabelText,
  Left,
  NextButton,
  PageRow,
  Pagination,
  Right,
  Status,
  StatusCircle,
  StatusText,
  SwapHorizontal,
  Time,
  TitleRow,
  Top,
  TxHistoriesMobileContainer,
  TxHistoryRow,
} from './styled';

interface Props {
  filter: JSX.Element;
  loader: JSX.Element;
  page: number;
  maximumPage: number;
  isNoResult: boolean;
  isLoadingHistory: boolean;
  currentTxs: SwapRawObject[];
  noResultFound: JSX.Element;
  goNextPage: () => void;
  goBackPage: () => void;
  goToDetail: (arg: string) => void;
}

export const TxHistoriesMobile = (props: Props) => {
  const {
    filter,
    page,
    maximumPage,
    currentTxs,
    goNextPage,
    goBackPage,
    goToDetail,
    loader,
    isLoadingHistory,
    isNoResult,
    noResultFound,
  } = props;
  const dispatch = useDispatch();

  return (
    <>
      <TxHistoriesMobileContainer>
        <TitleRow>
          <Left>
            <Text variant="section-title">
              <FormattedMessage id="home.recentSwaps.recentSwaps" />
            </Text>
          </Left>
          <Right>{filter}</Right>
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
                  <Time>
                    <LabelText variant="label">{convertTxTime(tx.timestamp)}</LabelText>
                  </Time>
                </Column>

                <ColumnAmount>
                  <Coin symbol={tx.currencyIn} />
                  <div>
                    <Top>
                      <LabelText variant="label">{currencyNetwork(tx.currencyIn)}</LabelText>
                    </Top>
                    <Bottom>
                      <AmountText variant="accent">{tx.amountIn}</AmountText>
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
                      <LabelText variant="label">{currencyNetwork(tx.currencyOut)}</LabelText>
                    </Top>
                    <Bottom>
                      <AmountText variant="accent">{tx.amountOut}</AmountText>
                    </Bottom>
                  </div>
                </ColumnAmount>
                <Column>
                  <Detail />
                </Column>
              </TxHistoryRow>
            );
          })}
      </TxHistoriesMobileContainer>
      <BrowserFooter>
        <Pagination>
          <BackButton
            variant="secondary"
            size="city"
            onClick={() => page > 1 && goBackPage()}
            disabled={1 >= page}
          >
            <Icon.CaretLeft />
          </BackButton>
          <PageRow page={page}>
            <Text variant="label">
              <FormattedMessage id="common.page" />
              {page}
            </Text>
          </PageRow>
          <NextButton
            variant="secondary"
            size="city"
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
