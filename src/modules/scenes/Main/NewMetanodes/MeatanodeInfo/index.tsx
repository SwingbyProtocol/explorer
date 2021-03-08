import { SkybridgeBridge } from '@swingby-protocol/sdk';
import React from 'react';

import { ActionButtonMetanodes } from '../ActionButtonMetanodes';
import { BondToLiquidity } from '../BondToLiquidity';
import { Churning } from '../Churning';
import { Earnings } from '../Earnings';
import { GeneralInfo } from '../GeneralInfo';
import { MetanodeList } from '../MetanodeList';
import { TotalNodes } from '../TotalNodes';
import { TotalSwingbyBond } from '../TotalSwingbyBond';

import { Bottom, Left, MetanodeInfoContainer, Right, Row, Top } from './styled';

interface Props {
  bridge: SkybridgeBridge;
}

export const MetanodeInfo = (props: Props) => {
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
          <TotalSwingbyBond />
          <BondToLiquidity bridge={bridge} />
          <Row>
            <Churning />
            <Earnings />
          </Row>
        </Right>
      </Top>
      <Bottom>
        <MetanodeList />
      </Bottom>
    </MetanodeInfoContainer>
  );
};
