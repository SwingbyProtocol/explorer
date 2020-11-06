import React from 'react';

import { ExplorerInfos } from '../ExplorerInfos';
import { SwapVolume } from '../SwapVolume';
import { TxHistories } from '../TxHistories';
import { NetworkBridges } from '../NetworkBridges';

import { BrowserContainer, BrowserDiv, Top, Bottom } from './styled';

export const Browser = () => {
  return (
    <BrowserContainer>
      <BrowserDiv>
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
