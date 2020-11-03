import React from 'react';

import { BrowserContainer } from './Browser.styles';
import ExplorerInfos from './ExplorerInfos';
import NetworkBridges from './NetworkBridges';
import SwapVolume from './SwapVolume';
import TxHistories from './TxHistories';
const Browser = (): JSX.Element => {
  return (
    <BrowserContainer>
      <div className="wrapper-browser">
        <div className="top-browser">
          <NetworkBridges />
          <ExplorerInfos />
          <SwapVolume />
        </div>
        <div className="bottom-browser">
          <TxHistories />
        </div>
      </div>
    </BrowserContainer>
  );
};

export default Browser;
