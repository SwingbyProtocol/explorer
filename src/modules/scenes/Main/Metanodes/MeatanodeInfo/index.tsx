import React, { useCallback, useEffect, useState } from 'react';

import { CACHED_ENDPOINT, mode, PATH } from '../../../../env';
import { fetcher } from '../../../../fetch';
import { useInterval, useToggleBridge } from '../../../../hooks';
import {
  fetchNodeList,
  IBondHistories,
  IChurn,
  ILiquidity,
  ILiquidityRatio,
  ILiquidityRatios,
  INodeListResponse,
  IReward,
  TBondHistory,
} from '../../../../metanodes';
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
  const { bridge } = useToggleBridge(PATH.METANODES);

  const [metanodes, setMetanodes] = useState<INodeListResponse[] | null>(null);
  const [reward, setReward] = useState<IReward | null>(null);
  const [liquidity, setLiquidity] = useState<ILiquidity | null>(null);
  const [churnTime, setChurnTime] = useState<IChurn | null>(null);
  const [bondHistories, setBondHistories] = useState<TBondHistory[] | null>(null);

  const [liquidityRatio, setLiquidityRatio] = useState<ILiquidityRatio[] | null>(null);

  const getChurnTime = useCallback(async () => {
    const churnUrl = bridge && `${CACHED_ENDPOINT}/v1/${mode}/${bridge}/churn`;
    const result = await fetcher<IChurn>(churnUrl);
    setChurnTime(result);
  }, [bridge]);

  useEffect(() => {
    bridge &&
      (async () => {
        const rewardsUrl = `${CACHED_ENDPOINT}/v1/${mode}/${bridge}/rewards-last-week`;
        const liquidityUrl = `${CACHED_ENDPOINT}/v1/${mode}/${bridge}/bond-to-liquidity`;
        const bondHistoryUrl = `${CACHED_ENDPOINT}/v1/${mode}/${bridge}/liquidity-historic`;
        const liquidityRatioUrl = `${CACHED_ENDPOINT}/v1/${mode}/${bridge}/liquidity-ratio`;

        const results = await Promise.all([
          fetchNodeList(bridge),
          fetcher<IReward>(rewardsUrl),
          fetcher<ILiquidity>(liquidityUrl),
          fetcher<IBondHistories>(bondHistoryUrl),
          fetcher<ILiquidityRatios>(liquidityRatioUrl),
          getChurnTime(),
        ]);

        const nodes = results[0];
        const rewardData = results[1];
        const liquidityData = results[2];
        const bondHistoriesData = results[3].data;
        const liquidityRationData = results[4].data;

        setMetanodes(nodes);
        setReward(rewardData);
        setLiquidity(liquidityData);
        setBondHistories(bondHistoriesData);
        setLiquidityRatio(liquidityRationData);
      })();
  }, [bridge, getChurnTime]);

  useInterval(() => {
    getChurnTime();
  }, [1000 * 60]);

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
