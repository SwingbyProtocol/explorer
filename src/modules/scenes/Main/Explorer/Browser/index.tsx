import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchFloatBalances, fetchStatsInfo } from '../../../../explorer';
import { updateNetworkInfos } from '../../../../store';
import { ExplorerInfos } from '../ExplorerInfos';
import { NetworkBridges } from '../NetworkBridges';
import { SwapVolume } from '../SwapVolume';
import { TxHistories } from '../TxHistories';

import { Bottom, BrowserContainer, BrowserDiv, Top } from './styled';

export const Browser = () => {
  const dispatch = useDispatch();
  const explorer = useSelector((state) => state.explorer);
  const { usd, networkInfos } = explorer;

  const { floatBalances, stats, capacity } = networkInfos;
  useEffect(() => {
    usd.BTC > 0 &&
      (async () => {
        const results = await Promise.all([fetchFloatBalances(usd.BTC), fetchStatsInfo()]);

        const data = results[0];
        const stats = results[1];

        data.floats &&
          data.capacity &&
          stats &&
          dispatch(
            updateNetworkInfos({ floatBalances: data.floats, capacity: data.capacity, stats }),
          );
      })();
  }, [usd, dispatch]);

  return (
    <BrowserContainer>
      <BrowserDiv size="bare">
        <Top>
          <NetworkBridges floatBalances={floatBalances} stats={stats} />
          <ExplorerInfos capacity={capacity} stats={stats} />
          <SwapVolume stats={stats} />
        </Top>
        <Bottom>
          <TxHistories />
        </Bottom>
      </BrowserDiv>
    </BrowserContainer>
  );
};
