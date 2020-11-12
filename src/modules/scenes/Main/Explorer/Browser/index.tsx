import React, { useEffect, useState } from 'react';

import { fetchFloatBalances } from '../../../../explorer';
import { ExplorerInfos } from '../ExplorerInfos';
import { NetworkBridges } from '../NetworkBridges';
import { SwapVolume } from '../SwapVolume';
import { TxHistories } from '../TxHistories';

import { Bottom, BrowserContainer, BrowserDiv, Top } from './styled';

export const Browser = () => {
  const [floatBalances, setFloatBalances] = useState({ btc: '0', btcb: '0', bnb: '0' });
  const [capacity, setCapacity] = useState(null);
  useEffect(() => {
    (async () => {
      const data = await fetchFloatBalances();
      setFloatBalances(data.floats);
      setCapacity(data.capacity);
    })();
  }, []);

  return (
    <BrowserContainer>
      <BrowserDiv size="bare">
        <Top>
          <NetworkBridges floatBalances={floatBalances} />
          <ExplorerInfos capacity={capacity} />
          <SwapVolume />
        </Top>
        <Bottom>
          <TxHistories />
        </Bottom>
      </BrowserDiv>
    </BrowserContainer>
  );
};
