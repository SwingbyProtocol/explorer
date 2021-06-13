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
    metanodes,
    bondHistories,
    liquidity,
    liquidityRatio,
    churnTime,
    reward,
    isLoading,
  } = useToggleMetanode(PATH.METANODES);
  return (
    <MetanodeInfoContainer>
      <ActionButtonMetanodes />
      <Top>
        <Left>
          <GeneralInfo />
          <TotalNodes metanodes={metanodes} isLoading={isLoading} />
          <NodeStatus metanodes={metanodes} isLoading={isLoading} />
        </Left>
        <Right>
          <TotalSwingbyBond bondHistories={bondHistories} />
          <BondToLiquidity liquidity={liquidity} isLoading={isLoading} />
          <LiquidityRatio liquidityRatio={liquidityRatio} isLoading={isLoading} />
          <Row>
            <Churning churnTime={churnTime} isLoading={isLoading} />
            <Earnings reward={reward} isLoading={isLoading} />
          </Row>
        </Right>
      </Top>
      <Bottom>
        <MetanodeList metanodes={metanodes} bridge={bridge} isLoading={isLoading} />
      </Bottom>
    </MetanodeInfoContainer>
  );
};
