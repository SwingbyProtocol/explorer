import { Text } from '@swingby-protocol/pulsar';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  currencyImg,
  currencyNetwork,
  fetchHistory,
  PAGE_COUNT,
  statusColor,
  SwapRawObject,
} from '../../../../explorer';
import { getHistory } from '../../../../store';

import {
  AddressP,
  AmountSpan,
  Bottom,
  BrowserFooter,
  CoinImg,
  Column,
  ColumnAmount,
  Ellipsis,
  Filter,
  IconCaretLeft,
  IconCaretRight,
  Left,
  Pagination,
  Right,
  Status,
  StatusCircle,
  StatusText,
  SwapHorizontal,
  TitleRow,
  Top,
  TxHistoriesContainer,
  TxHistoryRow,
} from './styled';

export const TxHistories = () => {
  const explorer = useSelector((state) => state.explorer);
  const { swapHistory } = explorer;
  const router = useRouter();
  const dispatch = useDispatch();
  const params = router.query;
  const q = String(params.q || '');
  const page = Number(params.page || 1);
  const maximumPage = swapHistory && Math.ceil(swapHistory.total / PAGE_COUNT);

  const currentTxs = (swapHistory && swapHistory.data[page - 1]) || [];

  const goNextPage = () => {
    router.push({
      pathname: '/',
      query: { q: q, page: page + 1 },
    });
  };

  const goBackPage = () => {
    if (page === 0) return;
    router.push({
      pathname: '/',
      query: { q: q, page: page - 1 },
    });
  };

  useEffect(() => {
    (async () => {
      const data = await fetchHistory(page - 1, q);
      dispatch(getHistory(data));
    })();
  }, [dispatch, page, q]);
  return (
    <>
      <TxHistoriesContainer>
        <TitleRow>
          <Left>
            <Text variant="section-title">Recent Swaps</Text>
          </Left>
          <Right>
            <Text variant="section-title">Fees</Text>
            <Filter />
          </Right>
        </TitleRow>
        {currentTxs &&
          currentTxs.map((tx: SwapRawObject, i: number) => {
            return (
              <TxHistoryRow key={i} bg={i % 2 !== 0}>
                <Column>
                  <Status>
                    <StatusCircle variant={statusColor(tx.status)} />
                    <StatusText variant="accent">{tx.status}</StatusText>
                  </Status>
                  <Bottom>
                    <Text variant="label">1 min. ago</Text>
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
                  <CoinImg src={currencyImg(tx.currencyIn)} alt={tx.currencyIn} />
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
                  <CoinImg src={currencyImg(tx.currencyOut)} alt={tx.currencyOut} />
                  <div>
                    <Top>
                      <Text variant="label">{currencyNetwork(tx.currencyOut)}</Text>
                    </Top>
                    <Bottom>
                      <AmountSpan variant="accent">{tx.amountOut}</AmountSpan>
                    </Bottom>
                  </div>
                </ColumnAmount>
                <Column>
                  <Text variant="section-title">
                    {tx.fee} {tx.currencyOut}
                  </Text>
                </Column>
                <Column>
                  <Ellipsis />
                </Column>
              </TxHistoryRow>
            );
          })}
      </TxHistoriesContainer>
      <BrowserFooter>
        <Pagination>
          <IconCaretLeft onClick={() => page > 1 && goBackPage()} disable={1 >= page} />
          <Text variant="masked">
            Page {page} of {maximumPage}
          </Text>
          <IconCaretRight
            onClick={() => maximumPage > page && goNextPage()}
            disable={page >= maximumPage}
          />
        </Pagination>
      </BrowserFooter>
    </>
  );
};
