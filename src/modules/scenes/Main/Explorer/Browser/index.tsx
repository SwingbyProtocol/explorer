import React, { useEffect, useState } from 'react';

import { fetchFloatBalances, fetchStatsInfo } from '../../../../explorer';
import { ExplorerInfos } from '../ExplorerInfos';
import { NetworkBridges } from '../NetworkBridges';
import { SwapVolume } from '../SwapVolume';
import { TxHistories } from '../TxHistories';

import { Bottom, BrowserContainer, BrowserDiv, Top } from './styled';

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

  useEffect(() => {
    (async () => {
      const results = await Promise.all([fetchFloatBalances(), fetchStatsInfo()]);

      const data = results[0];
      setFloatBalances(data.floats);
      setCapacity(data.capacity);

      const stats = results[1];
      setStats({
        volume24Hr: stats.volume24Hr,
        rewards24Hr: stats.rewards24Hr,
        volumes: stats.volumes,
        validators: stats.validators,
      });
    })();
  }, []);

  return (
    <BrowserContainer>
      <BrowserDiv size="bare">
        <Top>
          <NetworkBridges floatBalances={floatBalances} />
          <ExplorerInfos capacity={capacity} stats={stats} />
          <SwapVolume stats={stats} />
        </Top>
        <Bottom>{/* <TxHistories /> */}</Bottom>
      </BrowserDiv>
    </BrowserContainer>
  );
};
