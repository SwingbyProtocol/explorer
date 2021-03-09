import { SkybridgeBridge } from '@swingby-protocol/sdk';
import React, { useEffect, useState } from 'react';

import { CACHED_ENDPOINT, mode } from '../../../../env';
import { fetcher } from '../../../../fetch';
import { fetchNodeList, ILiquidity, INodeListResponse, IReward } from '../../../../metanodes';
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

  useEffect(() => {
    (async () => {
      const rewardsUrl = `${CACHED_ENDPOINT}/v1/${mode}/${bridge}/rewards-total`;
      const liquidityUrl = `${CACHED_ENDPOINT}/v1/${mode}/${bridge}/bond-to-liquidity`;

      const results = await Promise.all([
        fetchNodeList(bridge),
        fetcher<IReward>(rewardsUrl),
        fetcher<ILiquidity>(liquidityUrl),
      ]);

      const nodes = results[0];
      const rewardData = results[1];
      const liquidityData = results[2];

      setMetanodes(nodes);
      setReward(rewardData);
      setLiquidity(liquidityData);
    })();
  }, [bridge]);

  return (
    <MetanodeInfoContainer>
      <ActionButtonMetanodes />
      <Top>
        <Left>
          <GeneralInfo />
          <TotalNodes metanodes={metanodes} />
        </Left>
        <Right>
          <TotalSwingbyBond />
          <BondToLiquidity liquidity={liquidity} />
          <Row>
            <Churning />
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
