import { SkybridgeBridge } from '@swingby-protocol/sdk';

import { IBondHistories, INodeListResponse, INodeStatusTable, TBondHistory } from '..';
import { getShortDate } from '../../common';
import { CACHED_ENDPOINT, mode } from '../../env';
import { IChartDate } from '../../explorer';
import { camelize, fetch, fetcher } from '../../fetch';
import { IFloatHistory, IFloatHistoryObject } from '../../hooks';

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

const sumFloatAmount = (floatHistories: IFloatHistory[]) => {
  let amount = 0;
  floatHistories.forEach((it: IFloatHistory) => {
    amount += Number(it.amount);
  });
  return String(amount);
};

export const listFloatAmountHistories = (histories: IFloatHistoryObject[]): IChartDate[] => {
  let dateLookUpTable: string[] = [];
  let historiesTable: IChartDate[] = [];

  histories.forEach((history: IFloatHistoryObject) => {
    const date = getShortDate(String(history.at));

    if (!dateLookUpTable.includes(date)) {
      const item: IChartDate = {
        at: date,
        amount: sumFloatAmount(history.data),
      };
      dateLookUpTable.push(date);
      historiesTable.push(item);
    }
  });

  return historiesTable.reverse();
};

export const listLockHistories = (locks: IChartDate[]): IChartDate[] => {
  let dateLookUpTable: string[] = [];
  let locksTable: IChartDate[] = [];

  locks.forEach((lock: IChartDate) => {
    const date = lock.at;
    if (dateLookUpTable.includes(date)) {
      locksTable = locksTable.map((item: IChartDate) => {
        if (item.at === date) {
          return {
            at: date,
            amount: item.amount + lock.amount,
          };
        } else {
          return item;
        }
      });
    } else {
      const item: IChartDate = {
        at: lock.at,
        amount: lock.amount,
      };
      dateLookUpTable.push(date);
      locksTable.push(item);
    }
  });

  return locksTable;
};

const formatHistoriesArray = (rawData: IBondHistories) => {
  const data = rawData.data.map((it: TBondHistory) => {
    return {
      at: getShortDate(it.since),
      amount: it.bond,
    };
  });
  return data.reverse();
};

export const mergeLockedArray = (
  lockedHistoryEth: IChartDate[],
  lockedHistoryBsc: IChartDate[],
) => {
  let mergedArray = [];

  const pushToMergedArray = (baseArray: IChartDate[], targetArray: IChartDate[]): void => {
    baseArray.forEach((base) => {
      const targetLookUpArray = targetArray.filter(
        (target) => new Date(base.at) > new Date(target.at),
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

export const getLockedHistory = async (bridge: string) => {
  if (bridge) {
    const url = `${CACHED_ENDPOINT}/v1/production/${bridge}/liquidity-historic`;
    const rawData = await fetcher<IBondHistories>(url);
    return formatHistoriesArray(rawData);
  } else {
    const urlBtcEth = `${CACHED_ENDPOINT}/v1/production/btc_erc/liquidity-historic`;
    const urlBtcBsc = `${CACHED_ENDPOINT}/v1/production/btc_bep20/liquidity-historic`;

    const results = await Promise.all([
      fetcher<IBondHistories>(urlBtcEth),
      fetcher<IBondHistories>(urlBtcBsc),
    ]);
    const lockedHistoryEth = formatHistoriesArray(results[0]);
    const lockedHistoryBsc = formatHistoriesArray(results[1]);
    const mergedArray = mergeLockedArray(lockedHistoryEth, lockedHistoryBsc);
    return listLockHistories(mergedArray);
  }
};
