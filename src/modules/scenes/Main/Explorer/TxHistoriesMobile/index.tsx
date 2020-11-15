import { Icon, Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { useIntl } from 'react-intl';

import { convertTxTime, currencyNetwork, statusColor, SwapRawObject } from '../../../../explorer';

import {
  AmountText,
  Bottom,
  Coin,
  Column,
  ColumnAmount,
  Detail,
  LabelText,
  Left,
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
  BackButton,
  BrowserFooter,
  NextButton,
  PageRow,
  Pagination,
} from './styled';

interface Props {
  filter: JSX.Element;
  loader: JSX.Element;
  page: number;
  maximumPage: number;
  currentTxs: SwapRawObject[];
  goNextPage: () => void;
  goBackPage: () => void;
}

export const TxHistoriesMobile = (props: Props) => {
  const { filter, page, maximumPage, currentTxs, goNextPage, goBackPage, loader } = props;

  const { locale } = useIntl();

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
              <TxHistoryRow key={i} bg={i % 2 !== 0}>
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
                      <AmountText variant="accent">
                        {Number(tx.amountIn).toLocaleString()}
                      </AmountText>
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
                      <AmountText variant="accent">
                        {Number(tx.amountOut).toLocaleString()}
                      </AmountText>
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
