import { SkybridgeBridge } from '@swingby-protocol/sdk';

import { IBondHistories, INodeStatusTable, TBondHistory } from '..';
import { Node } from '../../../generated/graphql';
import { getShortDate } from '../../common';
import { ENDPOINT_SKYBRIDGE_EXCHANGE, mode } from '../../env';
import { IChartDate } from '../../explorer';
import { fetch, fetcher } from '../../fetch';
import { IFloatHistoryObject } from '../../hooks';
import { initialVolumes } from '../../store';

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

export const listNodeStatus = (nodes: Node[]): INodeStatusTable[] => {
  let statusLookUpTable: string[] = [];
  let statusTable: INodeStatusTable[] = [];
  nodes.forEach((node: Node) => {
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

const formatHistoriesArray = (rawData: TBondHistory[]) => {
  const historiesTable = listHistory(rawData);
  return historiesTable;
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
  try {
    const urlBtcSkypool = `${ENDPOINT_SKYBRIDGE_EXCHANGE}/production/btc_skypool/bonded-historic`;

    if (bridge === 'btc_skypool') {
      const result = await fetcher<IBondHistories>(urlBtcSkypool);
      return formatHistoriesArray(result.data);
    } else {
      const result = await fetcher<IBondHistories>(urlBtcSkypool);
      return formatHistoriesArray(result.data);
    }
  } catch (error) {
    console.log('error', error);
    return initialVolumes;
  }
};
