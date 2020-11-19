import { Icon, Text } from '@swingby-protocol/pulsar';
import React from 'react';

import { convertTxTime, currencyNetwork, statusColor, SwapRawObject } from '../../../../explorer';

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
  currentTxs: SwapRawObject[];
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
  } = props;
  return (
    <>
      <TxHistoriesMobileContainer>
        <TitleRow>
          <Left>
            <Text variant="section-title">Recent Swaps</Text>
          </Left>
          <Right>{filter}</Right>
        </TitleRow>
        {!currentTxs.length && loader}
        {currentTxs &&
          currentTxs.map((tx: SwapRawObject, i: number) => {
            return (
              <TxHistoryRow key={i} bg={i % 2 !== 0} onClick={() => goToDetail(tx.txIdIn)}>
                <Column>
                  <Status>
                    <StatusCircle variant={statusColor(tx.status)} />
                    <StatusText variant="accent">{tx.status}</StatusText>
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
            <Text variant="label">Page {page}</Text>
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
