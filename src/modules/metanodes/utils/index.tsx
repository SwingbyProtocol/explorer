import { SkybridgeBridge } from '@swingby-protocol/sdk';

import { IBondHistories, INodeListResponse, INodeStatusTable, TBondHistory } from '..';
import { getShortDate } from '../../common';
import { ENDPOINT_SKYBRIDGE_EXCHANGE, mode } from '../../env';
import { IChartDate } from '../../explorer';
import { camelize, fetch, fetcher } from '../../fetch';
import { IFloatHistoryObject } from '../../hooks';

export const fetchNodeList = async (bridge: SkybridgeBridge) => {
  const url = `${ENDPOINT_SKYBRIDGE_EXCHANGE}/${mode}/${bridge}/nodes`;

  try {
    const result = await fetch<INodeListResponse[]>(url);
    const metanodes = result.ok && camelize(result.response);
    return metanodes;
  } catch (e) {
    console.log(e);
  }
};

export const fetchNodeEarningsList = async () => {
  const url = `${ENDPOINT_SKYBRIDGE_EXCHANGE}/${mode}/rewards/ranking`;
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
    tvl += Number(metanode.bondAmount);
  });
  return tvl;
};

export const listFloatAmountHistories = (histories: IFloatHistoryObject[]): IChartDate[] => {
  let dateLookUpTable: string[] = [];
  let historiesTable: IChartDate[] = [];

  histories.forEach((history: IFloatHistoryObject) => {
    const date = getShortDate(String(history.at));

    if (!dateLookUpTable.includes(date)) {
      const item: IChartDate = {
        at: date,
        amount: history.totalUsd,
      };
      dateLookUpTable.push(date);
      historiesTable.push(item);
    }
  });

  return historiesTable.reverse();
};

export const removeDuplicatedAt = (locks: IChartDate[]): IChartDate[] => {
  // Memo: Remove duplicated 'at'
  return locks.filter((v, i, a) => a.findIndex((t) => t.at === v.at) === i);
};

export const listHistory = (histories: TBondHistory[]) => {
  let historiesLookUpTable: string[] = [];
  let historiesTable: IChartDate[] = [];

  histories.forEach((it: TBondHistory) => {
    const date = getShortDate(it.since);
    if (!historiesLookUpTable.includes(date)) {
      const item: IChartDate = {
        at: date,
        amount: it.bond,
      };
      historiesLookUpTable.push(date);
      historiesTable.push(item);
    }
  });
  return historiesTable;
};

const formatHistoriesArray = (rawData: IBondHistories) => {
  const historiesTable = listHistory(rawData.data);
  return historiesTable.reverse();
};

export const mergeLockedArray = (
  lockedHistoryEth: IChartDate[],
  lockedHistoryBsc: IChartDate[],
) => {
  let mergedArray = [];

  const pushToMergedArray = (baseArray: IChartDate[], targetArray: IChartDate[]): void => {
    baseArray.forEach((base) => {
      const targetLookUpArray = targetArray.filter(
        (target) => new Date(base.at) >= new Date(target.at),
      );
      const lockUpLastElement =
        targetLookUpArray && targetLookUpArray[targetLookUpArray.length - 1];
      if (lockUpLastElement) {
        mergedArray.push({
          at: base.at,
          amount: String(Number(base.amount) + Number(lockUpLastElement.amount)),
        });
      } else {
        mergedArray.push({
          at: base.at,
          amount: base.amount,
        });
      }
    });
  };

  pushToMergedArray(lockedHistoryEth, lockedHistoryBsc);
  pushToMergedArray(lockedHistoryBsc, lockedHistoryEth);

  mergedArray.sort((a: IChartDate, b: IChartDate) => {
    if (b.at > a.at) {
      return -1;
    } else {
      return 1;
    }
  });
  return mergedArray;
};

export const getLockedHistory = async (bridge: SkybridgeBridge) => {
  const urlBtcEth = `${ENDPOINT_SKYBRIDGE_EXCHANGE}/production/btc_erc/bonded-historic`;
  const urlBtcBsc = `${ENDPOINT_SKYBRIDGE_EXCHANGE}/production/btc_bep20/bonded-historic`;

  const results = await Promise.all([
    fetcher<IBondHistories>(urlBtcEth),
    fetcher<IBondHistories>(urlBtcBsc),
  ]);

  if (bridge === 'btc_erc') {
    return formatHistoriesArray(results[0]);
  } else if (bridge === 'btc_bep20') {
    return formatHistoriesArray(results[1]);
  } else {
    const lockedHistoryEth = formatHistoriesArray(results[0]);
    const lockedHistoryBsc = formatHistoriesArray(results[1]);
    const mergedArray = mergeLockedArray(lockedHistoryEth, lockedHistoryBsc);

    // Memo: Remove duplicated 'at'
    const listedLockHistories = removeDuplicatedAt(mergedArray);
    return listedLockHistories;
  }
};
