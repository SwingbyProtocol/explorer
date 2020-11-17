import { Dropdown } from '@swingby-protocol/pulsar';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScaleLoader } from 'react-spinners';

import { PAGE_COUNT } from '../../../../env';
import {
  BRIDGE,
  fetchFloatBalances,
  loadHistory,
  fetchStatsInfo,
  removeDuplicatedTxs,
} from '../../../../explorer';
import { useInterval } from '../../../../hooks';
import { getHistory, toggleIsHideWaiting, updateSwapHistoryTemp } from '../../../../store';
import { ExplorerInfos } from '../ExplorerInfos';
import { NetworkBridges } from '../NetworkBridges';
import { SwapVolume } from '../SwapVolume';
import { TxHistories } from '../TxHistories';
import { TxHistoriesMobile } from '../TxHistoriesMobile';

import { Bottom, BrowserContainer, BrowserDiv, Top, Filter, LoadContainer } from './styled';

export const Browser = () => {
  /**
   * Memo: For Network information
   **/
  const initialState = {
    floatBalances: { btc: '0', btcb: '0', bnb: '0' },
    stats: {
      volume24Hr: '0',
      rewards24Hr: 0,
      volumes: ['1', '1', '1', '1', '1', '1', '1'],
      metanodes: 0,
    },
  };

  const [floatBalances, setFloatBalances] = useState(initialState.floatBalances);
  const [capacity, setCapacity] = useState(null);
  const [stats, setStats] = useState(initialState.stats);

  useEffect(() => {
    (async () => {
      const results = await Promise.all([fetchFloatBalances(), fetchStatsInfo()]);

      const data = results[0];
      data && setFloatBalances(data.floats);
      data && setCapacity(data.capacity);

      const stats = results[1];
      stats &&
        setStats({
          volume24Hr: stats.volume24Hr,
          rewards24Hr: stats.rewards24Hr,
          volumes: stats.volumes,
          metanodes: stats.metanodes,
        });
    })();
  }, []);

  /**
   * Memo: For TxHistories
   **/
  const explorer = useSelector((state) => state.explorer);
  const { swapHistory, isHideWaiting, swapHistoryTemp } = explorer;
  const [isLoadingUrl, setIsLoadingUrl] = useState(true);

  const dispatch = useDispatch();
  const router = useRouter();
  const params = router.query;
  const q = String(params.q || '');
  const page = Number(params.page || 1);
  const chainBridge = String(params.bridge || '');

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
      // Memo: To run `dispatchGetHistory` after resolved `url params`
      setIsLoadingUrl(false);
    }, 200);
  }, []);

  const dispatchLoadHistory = useCallback(() => {
    loadHistory(page - 1, q, isHideWaiting, chainBridge, swapHistory, swapHistoryTemp).then(
      (data) => {
        const uniqueTempMixedHistories = removeDuplicatedTxs(data.tempMixedHistories);
        dispatch(getHistory(data.txsWithPage));
        dispatch(updateSwapHistoryTemp(uniqueTempMixedHistories));
      },
    );

    // Todo: Fix the error of "React Hook useCallback has missing dependencies: 'swapHistory', and 'swapHistoryTemp' "
  }, [dispatch, page, q, isHideWaiting, chainBridge]);

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

  const loader = (
    <LoadContainer data-testid="main.loading-container">
      <ScaleLoader margin={3} color="#36D7B7" />
    </LoadContainer>
  );

  return (
    <BrowserContainer>
      <BrowserDiv size="bare">
        <Top>
          <NetworkBridges floatBalances={floatBalances} />
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
      />
    </BrowserContainer>
  );
};
