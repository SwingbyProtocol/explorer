import React from 'react';

import { ActionButtonMetanodes } from '../ActionButtonMetanodes';
import { BondToLiquidity } from '../BondToLiquidity';
import { BondToLiquidity2 } from '../BondToLiquidity2';
import { Churning } from '../Churning';
import { Earnings } from '../Earnings';
import { GeneralInfo } from '../GeneralInfo';
import { TotalNodes } from '../TotalNodes';
import { TotalSwingbyBond } from '../TotalSwingbyBond';

import { MetanodeInfoContainer, Top, Bottom, Left, Right, Row } from './styled';

interface Props {
  bridge: string;
}

export const MetanodeInfo = (props: Props) => {
  // Todo: Use the props to toggle the bridge
  const { bridge } = props;
  console.log('bridge', bridge);

  return (
    <MetanodeInfoContainer>
      <ActionButtonMetanodes />
      <Top>
        <Left>
          <GeneralInfo />
          <TotalNodes />
        </Left>
        <Right>
          <TotalSwingbyBond />
          <BondToLiquidity bridge="btc_erc" />
          {/* <BondToLiquidity2 bridge="btc_erc" /> */}
          <Row>
            <Churning />
            <Earnings />
          </Row>
        </Right>
      </Top>
      <Bottom>Metanodes</Bottom>
    </MetanodeInfoContainer>
  );
};
