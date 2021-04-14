import React from 'react';

import { useGetNetworkData } from '../../../../hooks';
import { NetworkBridges } from '../NetworkBridges';
import { StatsInfo } from '../StatsInfo';
import { TxHistories } from '../TxHistories';

import { Bottom, BrowserContainer, BrowserDiv, Top } from './styled';

export const Browser = () => {
  useGetNetworkData();

  return (
    <BrowserContainer>
      <BrowserDiv size="bare">
        <Top>
          <NetworkBridges />
          <StatsInfo />
        </Top>
        <Bottom>
          <TxHistories />
        </Bottom>
      </BrowserDiv>
    </BrowserContainer>
  );
};
