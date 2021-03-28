import React from 'react';

import { useGetNetworkData } from '../../../../hooks';
import { ExplorerInfos } from '../ExplorerInfos';
import { NetworkBridges } from '../NetworkBridges';
import { SwapVolume } from '../SwapVolume';
import { TxHistories } from '../TxHistories';

import { Bottom, BrowserContainer, BrowserDiv, Top } from './styled';

export const Browser = () => {
  useGetNetworkData();

  return (
    <BrowserContainer>
      <BrowserDiv size="bare">
        <Top>
          <NetworkBridges />
          <ExplorerInfos />
          <SwapVolume />
        </Top>
        <Bottom>
          <TxHistories />
        </Bottom>
      </BrowserDiv>
    </BrowserContainer>
  );
};
