import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';

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
                <TextBlock>
                  {' '}
                  <FormattedMessage id="metanodes.no" />
                </TextBlock>
                <div />
                <TextBlock>
                  <FormattedMessage id="metanodes.node" />
                </TextBlock>
                <div />
                <TextBlock>
                  <FormattedMessage id="metanodes.status" />
                </TextBlock>
                <div />
                <SizeS>
                  <TextBlock>
                    <FormattedMessage id="metanodes.activeNonActive" />
                  </TextBlock>
                </SizeS>
                <StakeInfos>
                  <TextBlock>
                    <FormattedMessage id="metanodes.amount" />
                  </TextBlock>
                  <TextBlock>
                    <FormattedMessage id="metanodes.address" />
                  </TextBlock>
                  <TextBlock>
                    <FormattedMessage id="metanodes.stakeTime" />
                  </TextBlock>
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
                      <TextStake>
                        <FormattedNumber value={Number(node.stake.amount)} />
                      </TextStake>
                      <TextStake>{node.stake.address}</TextStake>
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
