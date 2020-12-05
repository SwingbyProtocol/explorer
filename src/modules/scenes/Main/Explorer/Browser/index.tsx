import { Dropdown } from '@swingby-protocol/pulsar';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Loader } from '../../../../../components/Loader';
import { PAGE_COUNT } from '../../../../env';
import {
  BRIDGE,
  fetchFloatBalances,
  fetchStatsInfo,
  ILoadHistory,
  loadHistory,
  removeDuplicatedTxs,
  SwapRawObject,
} from '../../../../explorer';
import { useInterval } from '../../../../hooks';
import {
  getHistory,
  toggleIsHideWaiting,
  updateNetworkInfos,
  updateSwapHistoryTemp,
} from '../../../../store';
import { ExplorerInfos } from '../ExplorerInfos';
import { NetworkBridges } from '../NetworkBridges';
import { SwapVolume } from '../SwapVolume';
import { TxHistories } from '../TxHistories';
import { TxHistoriesMobile } from '../TxHistoriesMobile';

import { Bottom, BrowserContainer, BrowserDiv, Filter, Top } from './styled';

interface Props {
  walletAddress: string;
  setWalletAddress: (address: string) => void;
  linkToSwapWidget: (tx: SwapRawObject) => void;
}

export const Browser = (props: Props) => {
  const dispatch = useDispatch();
  const explorer = useSelector((state) => state.explorer);
  const { swapHistory, isHideWaiting, swapHistoryTemp, usd, networkInfos } = explorer;

  /**
   * Memo: For Network information
   **/
  const { floatBalances, stats, capacity } = networkInfos;
  useEffect(() => {
    usd &&
      (async () => {
        const results = await Promise.all([fetchFloatBalances(usd.BTC, usd.BNB), fetchStatsInfo()]);

        const data = results[0];
        const stats = results[1];

        data &&
          stats &&
          dispatch(
            updateNetworkInfos({ floatBalances: data.floats, capacity: data.capacity, stats }),
          );
      })();
  }, [usd, dispatch]);

  /**
   * Memo: For TxHistories
   **/
  const [isLoadingUrl, setIsLoadingUrl] = useState(true);

  const router = useRouter();
  const params = router.query;
  const q = String(params.q || '');
  const page = Number(params.page || 1);
  const chainBridge = String(params.bridge || '');

  const goToDetail = (hash: string) => {
    router.push(`/swap/${hash}`);
  };

  const routerPush = (bridge: string, q: string, page: number): void => {
    router.push({
      pathname: '/',
      query: { bridge, q, page },
    });
  };

  const maximumPage = swapHistory && Math.ceil(swapHistory.total / PAGE_COUNT);

  const currentTxs = (swapHistory && swapHistory.data[page - 1]) || [];

  const goNextPage = () => routerPush(chainBridge, q, page + 1);

  const goBackPage = () => {
    if (page === 0) return;
    routerPush(chainBridge, q, page - 1);
  };

  useEffect(() => {
    setTimeout(() => {
      // Memo: To run `dispatchLoadHistory` after resolved `url params`
      setIsLoadingUrl(false);
    }, 200);
  }, []);

  const dispatchLoadHistory = useCallback(async () => {
    const data: ILoadHistory = await loadHistory({
      page: page - 1,
      query: q,
      hash: '',
      isHideWaiting,
      bridge: chainBridge,
      prevTxsWithPage: swapHistory,
      swapHistoryTemp: swapHistoryTemp,
    });
    if (data) {
      const uniqueTempMixedHistories = removeDuplicatedTxs(data.tempMixedHistories);
      dispatch(getHistory(data.txsWithPage));
      dispatch(updateSwapHistoryTemp(uniqueTempMixedHistories));
    }

    /* Memo: Add `swapHistory` and `swapHistoryTemp` in dependencies will occur infinity loop
    due to this function is going to dispatch the action of update the`swapHistory` and`swapHistoryTemp` state(redux). */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, q, isHideWaiting, chainBridge]);

  useEffect(() => {
    !isLoadingUrl && dispatchLoadHistory();
  }, [dispatchLoadHistory, isLoadingUrl]);

  useInterval(() => {
    dispatchLoadHistory();
  }, [10000]);

  const filter = (
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
            key={chain}
          >
            Bitcoin - {chain}
          </Dropdown.Item>
        );
      })}
    </Dropdown>
  );

  const loader = <Loader minHeight={368} testId="main.loading-container" />;

  return (
    <BrowserContainer>
      <BrowserDiv size="bare">
        <Top>
          <NetworkBridges floatBalances={floatBalances} stats={stats} />
          <ExplorerInfos capacity={capacity} stats={stats} />
          <SwapVolume stats={stats} />
        </Top>
        <Bottom>
          <TxHistories
            filter={filter}
            page={page}
            maximumPage={maximumPage}
            currentTxs={currentTxs}
            goNextPage={goNextPage}
            goBackPage={goBackPage}
            loader={loader}
            goToDetail={goToDetail}
            linkToSwapWidget={props.linkToSwapWidget}
          />
        </Bottom>
      </BrowserDiv>
      <TxHistoriesMobile
        filter={filter}
        page={page}
        maximumPage={maximumPage}
        currentTxs={currentTxs}
        goNextPage={goNextPage}
        goBackPage={goBackPage}
        loader={loader}
        goToDetail={goToDetail}
      />
    </BrowserContainer>
  );
};
