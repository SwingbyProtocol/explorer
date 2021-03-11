import { SkybridgeBridge } from '@swingby-protocol/sdk';
import React, { useCallback, useEffect, useState } from 'react';

import { CACHED_ENDPOINT, mode } from '../../../../env';
import { fetcher } from '../../../../fetch';
import { useInterval } from '../../../../hooks';
import {
  fetchNodeList,
  IChurn,
  ILiquidity,
  INodeListResponse,
  IReward,
  IBondHistories,
  TBondHistory,
} from '../../../../metanodes';
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

  const [metanodes, setMetanodes] = useState<INodeListResponse[] | null>(null);
  const [reward, setReward] = useState<IReward | null>(null);
  const [liquidity, setLiquidity] = useState<ILiquidity | null>(null);
  const [churnTime, setChurnTime] = useState<IChurn | null>(null);
  const [bondHistories, setBondHistories] = useState<TBondHistory[] | null>(null);

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

        const results = await Promise.all([
          fetchNodeList(bridge),
          fetcher<IReward>(rewardsUrl),
          fetcher<ILiquidity>(liquidityUrl),
          fetcher<IBondHistories>(bondHistoryUrl),
          getChurnTime(),
        ]);

        const nodes = results[0];
        const rewardData = results[1];
        const liquidityData = results[2];
        const bondHistoriesData = results[3].data;

        setMetanodes(nodes);
        setReward(rewardData);
        setLiquidity(liquidityData);
        setBondHistories(bondHistoriesData);
      })();
  }, [bridge, getChurnTime]);

  console.log('bondHistories', bondHistories);

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
        </Left>
        <Right>
          <TotalSwingbyBond bondHistories={bondHistories} />
          <BondToLiquidity liquidity={liquidity} />
          <Row>
            <Churning churnTime={churnTime} />
            <Earnings reward={reward} />
          </Row>
        </Right>
      </Top>
      <Bottom>
        <MetanodeList metanodes={metanodes} />
      </Bottom>
    </MetanodeInfoContainer>
  );
};
