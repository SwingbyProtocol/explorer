import { getCryptoAssetFormatter, Icon, Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

import { convertTxTime, currencyNetwork, statusColor, SwapRawObject } from '../../../../explorer';
import { selectSwapDetails } from '../../../../store';

import {
  AddressP,
  AmountSpan,
  BackButton,
  Bottom,
  BrowserFooter,
  Coin,
  Column,
  ColumnAmount,
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
  currentTxs: SwapRawObject[];
  goNextPage: () => void;
  goBackPage: () => void;
  goToDetail: (arg: string) => void;
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
  } = props;

  const { locale } = useIntl();
  const dispatch = useDispatch();

  return (
    <>
      <TxHistoriesContainer>
        <TitleRow>
          <Left>
            <Text variant="section-title">Recent Swaps</Text>
          </Left>
          <Right>
            <TextFee variant="section-title">Fees</TextFee>
            {filter}
          </Right>
        </TitleRow>
        {!currentTxs.length && loader}
        {currentTxs &&
          currentTxs.map((tx: SwapRawObject, i: number) => {
            return (
              <TxHistoryRow
                key={i}
                bg={i % 2 !== 0}
                onMouseEnter={() => {
                  console.log('hi');
                  dispatch(selectSwapDetails(tx));
                }}
                onClick={() => goToDetail(tx.hash)}
              >
                <Column>
                  <Status>
                    <StatusCircle variant={statusColor(tx.status)} />
                    <StatusText variant="accent">{tx.status}</StatusText>
                  </Status>
                  <Bottom>
                    <Text variant="label">{convertTxTime(tx.timestamp)}</Text>
                  </Bottom>
                </Column>
                <Column>
                  <Top>
                    <Text variant="label">From</Text>
                  </Top>
                  <Bottom>
                    <Text variant="label">To</Text>
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
                <Column>
                  <Ellipsis />
                </Column>
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
            // Request: Please make `cursor: not-allowed` when disabled = true
            disabled={1 >= page}
          >
            <Icon.CaretLeft />
          </BackButton>
          <PageRow page={page}>
            <Text variant="masked">
              {/* Memo: Disable `maximumPage` because `swapHistory.total` is never gonna fixed due to removing duplicated txs */}
              Page {page} {/* of {maximumPage} */}
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
