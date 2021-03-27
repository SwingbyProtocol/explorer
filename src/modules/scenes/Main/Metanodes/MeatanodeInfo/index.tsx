import React from 'react';

import { useToggleMetanode } from '../../../../hooks';
import { ActionButtonMetanodes } from '../ActionButtonMetanodes';
import { BondToLiquidity } from '../BondToLiquidity';
import { Churning } from '../Churning';
import { Earnings } from '../Earnings';
import { GeneralInfo } from '../GeneralInfo';
import { LiquidityRatio } from '../LiquidityRatio';
import { MetanodeList } from '../MetanodeList';
import { NodeStatus } from '../NodeStatus';
import { TotalNodes } from '../TotalNodes';
import { TotalSwingbyBond } from '../TotalSwingbyBond';

import { Bottom, Left, MetanodeInfoContainer, Right, Row, Top } from './styled';

export const MetanodeInfo = () => {
  const {
    bridge,
    metanodes,
    bondHistories,
    liquidity,
    liquidityRatio,
    churnTime,
    reward,
  } = useToggleMetanode();

  return (
    <MetanodeInfoContainer>
      <ActionButtonMetanodes />
      <Top>
        <Left>
          <GeneralInfo />
          <TotalNodes metanodes={metanodes} />
          <NodeStatus metanodes={metanodes} />
        </Left>
        <Right>
          <TotalSwingbyBond bondHistories={bondHistories} />
          <BondToLiquidity liquidity={liquidity} />
          <LiquidityRatio liquidityRatio={liquidityRatio} />
          <Row>
            <Churning churnTime={churnTime} />
            <Earnings reward={reward} />
          </Row>
        </Right>
      </Top>
      <Bottom>
        <MetanodeList metanodes={metanodes} bridge={bridge} />
      </Bottom>
    </MetanodeInfoContainer>
  );
};
