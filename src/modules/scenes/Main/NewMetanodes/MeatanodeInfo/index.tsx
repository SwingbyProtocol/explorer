import React from 'react';

import { ActionButtonMetanodes } from '../ActionButtonMetanodes';
import { BondToLiquidity } from '../BondToLiquidity';
import { GeneralInfo } from '../GeneralInfo';
import { TotalNodes } from '../TotalNodes';

import { MetanodeInfoContainer, Top, Bottom, Left, Right } from './styled';

interface Props {
  bridge: string;
}

export const MetanodeInfo = (props: Props) => {
  // Todo: Use the props to toggle the bridge
  const { bridge } = props;

  return (
    <MetanodeInfoContainer>
      <ActionButtonMetanodes />
      <Top>
        <Left>
          <GeneralInfo />
          <TotalNodes />
        </Left>
        <Right>
          <h1>Total Swingby Bond</h1>
          <h1>Bond to Liquidity</h1>
          <BondToLiquidity bridge="btc_erc" />
          <h1>Churning</h1>
          <h1>Earnings</h1>
        </Right>
      </Top>
      <Bottom>Metanodes</Bottom>
    </MetanodeInfoContainer>
  );
};
