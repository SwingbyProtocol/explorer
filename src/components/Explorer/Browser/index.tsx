import React from 'react';

import ExplorerInfos from '../ExplorerInfos';
import NetworkBridges from '../NetworkBridges';
import SwapVolume from '../SwapVolume';
import TxHistories from '../TxHistories';

import { BrowserContainerDiv, TopBrowserDiv, BrowserDiv } from './styled';
export const Browser = (): JSX.Element => {
  return (
    <BrowserContainerDiv>
      <BrowserDiv>
        <TopBrowserDiv>
          <NetworkBridges />
          <ExplorerInfos />
          <SwapVolume />
        </TopBrowserDiv>
        <div className="bottom-browser">
          <TxHistories />
        </div>
      </BrowserDiv>
    </BrowserContainerDiv>
  );
};
