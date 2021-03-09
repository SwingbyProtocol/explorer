import { SkybridgeBridge } from '@swingby-protocol/sdk';
import React, { useEffect, useState } from 'react';

import { fetchNodeList, INodeListResponse } from '../../../../metanodes';
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

  useEffect(() => {
    (async () => {
      const nodes = await fetchNodeList(bridge);
      setMetanodes(nodes);
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
          <BondToLiquidity bridge={bridge} />
          <Row>
            <Churning />
            <Earnings />
          </Row>
        </Right>
      </Top>
      <Bottom>
        <MetanodeList metanodes={metanodes} />
      </Bottom>
    </MetanodeInfoContainer>
  );
};
