import { Dropdown, Text } from '@swingby-protocol/pulsar';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScaleLoader } from 'react-spinners';

import { PAGE_COUNT } from '../../../../env';
import {
  BRIDGE,
  convertTxTime,
  currencyNetwork,
  fetchHistory,
  removeDuplicatedTxs,
  statusColor,
  SwapRawObject,
} from '../../../../explorer';
import { useInterval } from '../../../../hooks';
import { getHistory, toggleIsHideWaiting, updateSwapHistoryTemp } from '../../../../store';

import {
  AddressP,
  AmountSpan,
  Bottom,
  BrowserFooter,
  Coin,
  Column,
  ColumnAmount,
  Ellipsis,
  Filter,
  IconCaretLeft,
  IconCaretRight,
  Left,
  LoadContainer,
  PageRow,
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
  const [isLoadingUrl, setIsLoadingUrl] = useState(true);
  const explorer = useSelector((state) => state.explorer);
  const { swapHistory, isHideWaiting, swapHistoryTemp } = explorer;

  const router = useRouter();
  const dispatch = useDispatch();
  const params = router.query;
  const q = String(params.q || '');
  const page = Number(params.page || 1);
  const chainBridge = String(params.bridge || '');
  const maximumPage = swapHistory && Math.ceil(swapHistory.total / PAGE_COUNT);

  const currentTxs = (swapHistory && swapHistory.data[page - 1]) || [];

  const routerPush = (bridge: string, q: string, page: number): void => {
    router.push({
      pathname: '/',
      query: { bridge, q, page },
    });
  };

  const goNextPage = () => routerPush(chainBridge, q, page + 1);

  const goBackPage = () => {
    if (page === 0) return;
    routerPush(chainBridge, q, page - 1);
  };

  useEffect(() => {
    setTimeout(() => {
      // Memo: To run `dispatchGetHistory` after resolved `url params`
      setIsLoadingUrl(false);
    }, 200);
  }, []);

  const dispatchGetHistory = async () => {
    const data = await fetchHistory(
      page - 1,
      q,
      swapHistory,
      isHideWaiting,
      swapHistoryTemp,
      chainBridge,
    );
    dispatch(getHistory(data.txsWithPage));
    const uniqueTempMixedHistories = removeDuplicatedTxs(data.tempMixedHistories);
    dispatch(updateSwapHistoryTemp(uniqueTempMixedHistories));
  };

  useEffect(() => {
    !isLoadingUrl && dispatchGetHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, q, isHideWaiting, chainBridge, isLoadingUrl]);

  useInterval(() => {
    dispatchGetHistory();
  }, [10000]);

  const loader = (
    <LoadContainer>
      <ScaleLoader margin={3} color="#36D7B7" />
    </LoadContainer>
  );

  return (
    <>
      <TxHistoriesContainer>
        <TitleRow>
          <Left>
            <Text variant="section-title">Recent Swaps</Text>
          </Left>
          <Right>
            <Text variant="section-title">Fees</Text>
            <Dropdown target={<Filter />}>
              <Dropdown.Item
                selected={isHideWaiting}
                onClick={() => {
                  routerPush(chainBridge, q, 1);
                  dispatch(toggleIsHideWaiting());
                }}
              >
                Hide waiting
              </Dropdown.Item>
              {Object.values(BRIDGE).map((chain: string) => {
                const bridge = chain === BRIDGE.multipleBridges ? '' : chain.toLowerCase();
                return (
                  <Dropdown.Item
                    selected={chainBridge === bridge}
                    onClick={() => routerPush(bridge, q, 1)}
                  >
                    Bitcoin - {chain}
                  </Dropdown.Item>
                );
              })}
            </Dropdown>
          </Right>
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
                  <Bottom>
                    {/* Todo: use Moment.js to add function */}
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
          <PageRow page={page}>
            <Text variant="masked">
              {/* Memo: Disable `maximumPage` because `swapHistory.total` is never gonna fixed due to removing duplicated txs */}
              Page {page} {/* of {maximumPage} */}
            </Text>
          </PageRow>
          <IconCaretRight
            onClick={() => maximumPage > page && goNextPage()}
            disable={page >= maximumPage}
          />
        </Pagination>
      </BrowserFooter>
    </>
  );
};
