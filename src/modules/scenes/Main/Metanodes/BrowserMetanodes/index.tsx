import Head from 'next/head';
import React, { useEffect, useState } from 'react';

import { Loader } from '../../../../../components/Loader';
import { convertDateTime } from '../../../../explorer';
import { fetchNodeList, INodeListResponse, NodeStatus } from '../../../../metanodes';
import { SizeS, TextBlock, TextDanger, TextPrimary, TextSecondary } from '../../../Common';

import {
  BrowserMetanodesContainer,
  BrowserMetanodesDiv,
  Column,
  Description,
  NodeContainer,
  StakeInfos,
  TextStake,
} from './styled';

export const BrowserMetanodes = () => {
  const [metanodes, setMetanodes] = useState(null);

  useEffect(() => {
    (async () => {
      const nodes = await fetchNodeList();
      setMetanodes(nodes);
    })();
  }, []);
  const status = (status: string): JSX.Element => {
    switch (status) {
      case NodeStatus.DISCOVERY:
        return <TextPrimary>{status}</TextPrimary>;
      case NodeStatus.SIGNING:
        return <TextSecondary>{status}</TextSecondary>;
      case NodeStatus.IDLE:
        return <TextSecondary>{status}</TextSecondary>;
      default:
        return <TextSecondary>{status}</TextSecondary>;
    }
  };
  const activeStatus = (status: boolean): JSX.Element => {
    switch (status) {
      case true:
        return <TextPrimary>Active</TextPrimary>;
      case false:
        return <TextDanger>Non Active</TextDanger>;
      default:
        return <TextSecondary>{status}</TextSecondary>;
    }
  };
  return (
    <>
      <Head>
        <title>Swingby Explorer | Metanodes</title>
      </Head>
      <BrowserMetanodesContainer>
        <BrowserMetanodesDiv size="bare">
          {metanodes !== null ? (
            <NodeContainer>
              <Column>
                <TextBlock>No</TextBlock>
                <div />
                <TextBlock>Node</TextBlock>
                <div />
                <TextBlock>Status</TextBlock>
                <div />
                <SizeS>
                  <TextBlock>Active/Non Active</TextBlock>
                </SizeS>
                <StakeInfos>
                  <TextBlock>Address</TextBlock>
                  <TextBlock>Stake TX Hash</TextBlock>
                  <TextBlock>Stake Time</TextBlock>
                </StakeInfos>
              </Column>
              {metanodes &&
                metanodes.map((node: INodeListResponse, index: number) => (
                  <Description key={index}>
                    <TextBlock>{index + 1}</TextBlock>
                    <div />
                    <TextBlock>{node.moniker}</TextBlock>
                    <div />
                    {status(node.stateName)}
                    <div />
                    <SizeS>{activeStatus(node.active)}</SizeS>
                    <StakeInfos>
                      <TextStake>{node.stake.address}</TextStake>
                      <TextStake>{node.stake.stakeTXHash}</TextStake>
                      <TextBlock>{convertDateTime(node.stake.stakeTime)}</TextBlock>
                    </StakeInfos>
                  </Description>
                ))}
            </NodeContainer>
          ) : (
            <Loader minHeight={500} />
          )}
        </BrowserMetanodesDiv>
      </BrowserMetanodesContainer>
    </>
  );
};
