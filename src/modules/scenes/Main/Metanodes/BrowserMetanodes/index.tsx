import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';

import { Loader } from '../../../../../components/Loader';
import { Pagination } from '../../../../../components/Pagination';
import { NODES_PER_PAGE } from '../../../../env';
import { convertDateTime } from '../../../../explorer';
import { fetchNodeList, INodeListResponse, NodeStatus } from '../../../../metanodes';
import { SizeS, TextBlock, TextPrimary, TextSecondary } from '../../../Common';

import {
  BrowserMetanodesContainer,
  BrowserMetanodesDiv,
  Column,
  NodeContainer,
  RowDescription,
  StakeInfos,
  TextStake,
} from './styled';

export const BrowserMetanodes = () => {
  const [metanodes, setMetanodes] = useState(null);

  useEffect(() => {
    (async () => {
      const nodes = await fetchNodeList();
      console.log('nodes', nodes);
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

  // Memo: pagination
  const itemsPerPage = NODES_PER_PAGE;
  const [page, setPage] = useState(1);
  const indexOfLastNode = page * itemsPerPage;
  const indexOfFirstNode = indexOfLastNode - itemsPerPage;
  const currentNodes = metanodes && metanodes.slice(indexOfFirstNode, indexOfLastNode);

  const goBackPage = () => {
    setPage(page - 1);
  };
  const goNextPage = async () => {
    setPage(page + 1);
  };
  const maximumPage = metanodes && Math.ceil(metanodes.length / itemsPerPage);

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
                    <FormattedMessage id="metanodes.location" />
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
                    <FormattedMessage id="metanodes.stakeTimeLockedUntil" />
                  </TextBlock>
                </StakeInfos>
              </Column>
              {metanodes &&
                currentNodes.map((node: INodeListResponse, index: number) => {
                  const nodeNo = (page - 1) * itemsPerPage + index + 1;
                  return (
                    <RowDescription key={index} bg={index % 2 !== 0}>
                      <TextBlock>{nodeNo}</TextBlock>
                      <div />
                      <TextBlock>{node.moniker}</TextBlock>
                      <div />
                      {status(node.stateName)}
                      <div />
                      <SizeS>{node.country}</SizeS>
                      <StakeInfos>
                        <TextStake>
                          <FormattedNumber value={Number(node.stake.amount)} /> SWINGBY
                        </TextStake>
                        <TextStake>{node.stake.address}</TextStake>
                        <TextBlock>{convertDateTime(node.stake.stakeTime)}</TextBlock>
                      </StakeInfos>
                    </RowDescription>
                  );
                })}
              {metanodes && metanodes.length > 0 && (
                <Pagination
                  goNextPage={goNextPage}
                  goBackPage={goBackPage}
                  page={page}
                  maximumPage={maximumPage}
                  isSimple={false}
                />
              )}
            </NodeContainer>
          ) : (
            <Loader minHeight={500} />
          )}
        </BrowserMetanodesDiv>
      </BrowserMetanodesContainer>
    </>
  );
};
