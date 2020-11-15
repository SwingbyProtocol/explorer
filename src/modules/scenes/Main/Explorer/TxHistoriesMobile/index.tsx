import { Dropdown, Text } from '@swingby-protocol/pulsar';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
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
  AmountText,
  Bottom,
  Coin,
  Column,
  ColumnAmount,
  Detail,
  Filter,
  LabelText,
  Left,
  LoadContainer,
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

export const TxHistoriesMobile = () => {
  const [isLoadingUrl, setIsLoadingUrl] = useState(true);
  const explorer = useSelector((state) => state.explorer);
  const { swapHistory, isHideWaiting, swapHistoryTemp } = explorer;
  const { locale } = useIntl();

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
    console.log('page', page);
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
    <LoadContainer data-testid="main.loading-container">
      <ScaleLoader margin={3} color="#36D7B7" />
    </LoadContainer>
  );

  return (
    <>
      <TxHistoriesMobileContainer>
        <TitleRow>
          <Left>
            <Text variant="section-title">Recent Swaps</Text>
          </Left>
          <Right>
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
      {/* <BrowserFooter>
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
            <Text variant="masked">Page {page}</Text>
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
      </BrowserFooter> */}
    </>
  );
};
