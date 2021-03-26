import { SkybridgeBridge } from '@swingby-protocol/sdk';

import { INodeListResponse, INodeStatusTable } from '..';
import { CACHED_ENDPOINT, mode } from '../../env';
import { camelize, fetch } from '../../fetch';

export const fetchNodeList = async (bridge: SkybridgeBridge) => {
  const url = `${CACHED_ENDPOINT}/v1/${mode}/${bridge}/nodes`;

  try {
    const result = await fetch<INodeListResponse[]>(url);
    const metanodes = result.ok && camelize(result.response);
    return metanodes;
  } catch (e) {
    console.log(e);
  }
};

export const fetchNodeEarningsList = async () => {
  const url = `${CACHED_ENDPOINT}/v1/${mode}/rewards/ranking`;
  const result = await fetch<
    Array<{
      address: string;
      reward1mBtc: string;
      reward1wBtc: string;
      reward1mUsdt: string;
      reward1wUsdt: string;
      amountStaked: string;
      monikers: string[];
    }>
  >(url);

  if (!result.ok) {
    throw new Error(`${result.status}: ${result.response}`);
  }

  return result.response;
};

export const listNodeStatus = (nodes: INodeListResponse[]): INodeStatusTable[] => {
  let statusLookUpTable: string[] = [];
  let statusTable: INodeStatusTable[] = [];
  nodes.forEach((node: INodeListResponse) => {
    if (statusLookUpTable.includes(node.status)) {
      statusTable = statusTable.map((item) => {
        if (item.status === node.status) {
          return {
            status: node.status,
            nodes: [...item.nodes, node.moniker],
            nodeQty: item.nodeQty + 1,
          };
        } else {
          return item;
        }
      });
    } else {
      const item: INodeStatusTable = {
        nodes: [node.moniker],
        nodeQty: 1,
        status: node.status,
      };
      statusLookUpTable.push(node.status);
      statusTable.push(item);
    }
  });

  statusTable.sort((a: INodeStatusTable, b: INodeStatusTable) => {
    if (a.nodeQty > b.nodeQty) {
      return -1;
    } else {
      return 1;
    }
  });
  return statusTable;
};

export const calTvl = (metanodes: INodeListResponse[]) => {
  let tvl = 0;
  metanodes.forEach((metanode) => {
    tvl += Number(metanode.stake.amount);
  });
  return tvl;
};
