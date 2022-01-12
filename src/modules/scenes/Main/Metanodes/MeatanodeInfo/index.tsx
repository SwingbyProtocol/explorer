import React from 'react';

import { PATH } from '../../../../env';
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
    nodes,
    nodeTvl,
    bondHistories,
    liquidity,
    liquidityRatio,
    churnTime,
    rewards,
    isLoading,
  } = useToggleMetanode(PATH.METANODES);
  return (
    <MetanodeInfoContainer>
      <ActionButtonMetanodes />
      <Top>
        <Left>
          <GeneralInfo />
          <TotalNodes nodes={nodes} isLoading={isLoading} />
          <NodeStatus nodes={nodes} isLoading={isLoading} />
        </Left>
        <Right>
          <TotalSwingbyBond bondHistories={bondHistories} isLoading={isLoading} />
          <BondToLiquidity liquidity={liquidity} isLoading={isLoading} />
          <LiquidityRatio liquidityRatio={liquidityRatio} isLoading={isLoading} />
          <Row>
            <Churning churnTime={churnTime} isLoading={isLoading} />
            <Earnings rewards={rewards} isLoading={isLoading} />
          </Row>
        </Right>
      </Top>
      <Bottom>
        <MetanodeList nodeTvl={nodeTvl} nodes={nodes} bridge={bridge} isLoading={isLoading} />
      </Bottom>
    </MetanodeInfoContainer>
  );
};
