import React, { useEffect, useState } from 'react';
import { ScaleLoader } from 'react-spinners';

import { fetchFloatBalances, fetchStatsInfo } from '../../../../explorer';
import { ExplorerInfos } from '../ExplorerInfos';
import { NetworkBridges } from '../NetworkBridges';
import { SwapVolume } from '../SwapVolume';
import { TxHistories } from '../TxHistories';

import { Bottom, BrowserContainer, BrowserDiv, LoadContainer, Top } from './styled';

export const Browser = () => {
  const initialState = {
    floatBalances: { btc: '0', btcb: '0', bnb: '0' },
    stats: {
      volume24Hr: '0',
      rewards24Hr: 0,
      volumes: ['1', '1', '1', '1', '1', '1', '1'],
      validators: 0,
    },
  };

  const [floatBalances, setFloatBalances] = useState(initialState.floatBalances);
  const [capacity, setCapacity] = useState(null);
  const [stats, setStats] = useState(initialState.stats);
  const [isFetchedTxs, setIsFetchedTxs] = useState(false);
  const [isFetchedInfo, setIsFetchedInfos] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await fetchFloatBalances();
      setFloatBalances(data.floats);
      setCapacity(data.capacity);
      const stats = await fetchStatsInfo();
      setStats({
        volume24Hr: stats.volume24Hr,
        rewards24Hr: stats.rewards24Hr,
        volumes: stats.volumes,
        validators: stats.validators,
      });
      setIsFetchedInfos(true);
    })();
  }, []);

  const loader = (
    <LoadContainer data-testid="main.loading-container">
      <ScaleLoader margin={3} color="#36D7B7" />
    </LoadContainer>
  );
  const isReady = isFetchedTxs && isFetchedInfo;

  return (
    <BrowserContainer>
      <BrowserDiv size="bare">
        {!isReady && loader}
        <Top isReady={isReady}>
          <NetworkBridges floatBalances={floatBalances} />
          <ExplorerInfos capacity={capacity} stats={stats} />
          <SwapVolume stats={stats} />
        </Top>
        <Bottom isReady={isReady}>
          <TxHistories setIsFetchedTxs={setIsFetchedTxs} />
        </Bottom>
      </BrowserDiv>
    </BrowserContainer>
  );
};
