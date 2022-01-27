import {
  buildContext,
  CONTRACTS,
  getBlockHeight,
  getPowEpoch,
  SkybridgeBridge,
} from '@swingby-protocol/sdk';
import { Big } from 'big.js';
import { BigNumber } from 'bignumber.js';
import ip2country from 'ip2country';
import { DateTime } from 'luxon';
import { stringifyUrl } from 'query-string';
import { AbiItem } from 'web3-utils';

import {
  DAYS_CHURNED_IN,
  IActiveNode,
  IPeer,
  IPeerStatusTable,
  IRewards,
  NODE_APR,
  PeerStatus,
  RANK_CHURNED_IN,
  TBondHistory,
} from '..';
import { getShortDate } from '../../common';
import { ENDPOINT_SKYBRIDGE_EXCHANGE, LOCAL_STORAGE, mode } from '../../env';
import { calDiffDays, fetchVwap, IChartDate } from '../../explorer';
import { fetch, fetcher } from '../../fetch';
import { IFloatHistoryObject } from '../../hooks';
import { logger } from '../../logger';
import { createWeb3Instance } from '../../web3';

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

export const listNodeStatus = (nodes: IPeer[]): IPeerStatusTable[] => {
  let statusLookUpTable: string[] = [];
  let statusTable: IPeerStatusTable[] = [];
  nodes.forEach((node: IPeer) => {
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
      const item: IPeerStatusTable = {
        nodes: [node.moniker],
        nodeQty: 1,
        status: node.status,
      };
      statusLookUpTable.push(node.status);
      statusTable.push(item);
    }
  });

  statusTable.sort((a: IPeerStatusTable, b: IPeerStatusTable) => {
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

const getChurnedStatus = ({
  onchainNodes,
  expireTs,
  address,
  bridge,
}: {
  onchainNodes: IActiveNode[];
  expireTs: number;
  address: string;
  bridge: SkybridgeBridge;
}) => {
  const daysLeft = calDiffDays(expireTs);
  const account = onchainNodes.find((it) => it.address === address.toLowerCase());
  if (account) {
    if (DAYS_CHURNED_IN > daysLeft) {
      return bridge === 'btc_bep20' ? PeerStatus.MayChurnOutBondExpiring : PeerStatus.Migrating;
    }
    if (account.rank > RANK_CHURNED_IN) {
      return PeerStatus.MayChurnOutBondTooLow;
    }
    return PeerStatus.ChurnedIn;
  }
  return PeerStatus.MayChurnIn;
};

export const getActiveNodeList = async ({
  bridge,
  isRewardsCheck,
}: {
  bridge: SkybridgeBridge;
  isRewardsCheck: boolean;
}): Promise<{
  nodeList: IActiveNode[] | [];
  rewards: IRewards;
}> => {
  let rewards = { weeklyRewardsUsd: 0, average: 0 };
  let table: { address: string; lockedAmount: number }[] = [];
  let rewardableTvl = 0;

  try {
    const web3 = createWeb3Instance({ mode, bridge });
    const contract = new web3.eth.Contract(
      CONTRACTS.bridges[bridge][mode].abi as AbiItem[],
      CONTRACTS.bridges[bridge][mode].address,
    );

    const activeNodes = await contract.methods.getActiveNodes().call();

    activeNodes.forEach((it, i) => {
      const address = `0x${it.substr(it.length - 40, 40)}`;
      const lockedAmount = new BigNumber(it.substr(0, it.length - 40)).div('1e8').toFixed();
      const data = {
        address: address.toLowerCase(),
        lockedAmount: Number(lockedAmount),
      };
      table.push(data);
      if (RANK_CHURNED_IN > i) {
        rewardableTvl += data.lockedAmount;
      }
    });
    table.sort((a, b) => b.lockedAmount - a.lockedAmount);

    const nodeList = table.map((it, i: number) => {
      return {
        ...it,
        rank: i + 1,
      };
    });

    if (isRewardsCheck) {
      const swingbyUsd = await fetchVwap('swingbyUsd');
      const rewardableTvlUsd = swingbyUsd * rewardableTvl;
      const nodeQty = RANK_CHURNED_IN > activeNodes.length ? activeNodes.length : RANK_CHURNED_IN;
      const weeklyApr = NODE_APR / 52;
      const weeklyRewardsUsd = rewardableTvlUsd * weeklyApr * 0.01;
      rewards = {
        weeklyRewardsUsd,
        average: weeklyRewardsUsd / nodeQty,
      };
    }

    return { nodeList, rewards };
  } catch (error) {
    console.log(error);
    return { nodeList: [], rewards };
  }
};

export const formatPeers = async ({
  peers,
  bridge,
}: {
  peers: IPeer[];
  bridge: SkybridgeBridge;
}): Promise<{ nodes: IPeer[]; nodeTvl: number }> => {
  const { nodeList } = await getActiveNodeList({ bridge, isRewardsCheck: false });
  let nodeTvl = 0;
  const nodes = peers.map((peer) => {
    nodeTvl += Number(peer.stake.amount);
    const regionCode = ip2country(peer.p2pListener) ?? '';
    // Todo: rewardsAddress1 and rewardsAddress2 will be retried soon
    const address = peer.rewardsAddress2 ?? peer.stake.address;
    const stake = {
      ...peer.stake,
      address: address.toLowerCase(),
    };

    const status = getChurnedStatus({
      onchainNodes: nodeList,
      expireTs: peer.stake.stakeTime,
      address,
      bridge,
    });
    return {
      ...peer,
      regionCode,
      status,
      stake,
    };
  });

  return { nodes, nodeTvl };
};

export const getNextChurnedTx = async (bridge: SkybridgeBridge) => {
  const localData = localStorage.getItem(LOCAL_STORAGE.LastChurnedBlock);
  const latestTxBlocks = localData ? JSON.parse(localData) : {};

  const SECONDS_PER_EPOCH: { [k in SkybridgeBridge]: number } = {
    btc_bep20: 45,
    btc_erc: 45,
  };

  const context = await buildContext({ mode });
  const blockHeight = await getBlockHeight({ context, bridge });
  const epoch = getPowEpoch({ bridge, blockHeight });

  const nextChurnEpoch = epoch + (1000 - (epoch % 1000));
  const remainingEpochs = nextChurnEpoch - epoch;
  const nextAt = DateTime.local()
    .toUTC()
    .plus({ seconds: remainingEpochs * SECONDS_PER_EPOCH[bridge] })
    .toJSDate()
    .toISOString();

  const startblock = latestTxBlocks[bridge]
    ? latestTxBlocks[bridge][mode]
      ? latestTxBlocks[bridge][mode]
      : '0'
    : '0';

  const url = stringifyUrl({
    url: `/api/v1/etherscan/get-churned`,
    query: { bridge, startblock },
  });

  const { lastTxBlock, lastTxHash } = await fetcher<{ lastTxBlock: string; lastTxHash: string }>(
    url,
  );

  const newData = { ...latestTxBlocks[bridge], [mode]: lastTxBlock };
  const blocks = { ...latestTxBlocks, [bridge]: newData };
  localStorage.setItem(LOCAL_STORAGE.LastChurnedBlock, JSON.stringify(blocks));
  return { nextAt, lastTxHash };
};

export const getLiquidityRatio = async ({
  bridge,
  btcUsdtPrice,
}: {
  bridge: SkybridgeBridge;
  btcUsdtPrice: number;
}) => {
  const web3 = createWeb3Instance({ mode, bridge });
  const contract = new web3.eth.Contract(
    CONTRACTS.bridges[bridge][mode].abi,
    CONTRACTS.bridges[bridge][mode].address,
  );

  const coins = ['BTC', bridge === 'btc_erc' ? 'WBTC' : 'BTCB.BEP20'] as const;

  const floatReserves = await contract.methods
    .getFloatReserve(
      CONTRACTS.coins[coins[0]][mode].address,
      CONTRACTS.coins[coins[1]][mode].address,
    )
    .call();
  const btcReserve = new Big(floatReserves[0]).div('1e8').times(btcUsdtPrice);
  const wbtcReserve = new Big(floatReserves[1]).div('1e8').times(btcUsdtPrice);
  const liquidityTotal = btcReserve.add(wbtcReserve);
  const data = [
    {
      currency: coins[0],
      liquidity: btcReserve.toString(),
      fraction: new Big(liquidityTotal.eq(0) ? '0' : btcReserve.div(liquidityTotal)).toString(),
    },
    {
      currency: coins[1],
      liquidity: wbtcReserve.toString(),
      fraction: new Big(liquidityTotal.eq(0) ? '0' : wbtcReserve.div(liquidityTotal)).toString(),
    },
  ];
  return { currency: 'USD', data };
};

type Data = {
  currency: 'USD';
  status: 'overbonded' | 'underbonded' | 'optimal';
  bond: string;
  liquidity: string;
  optimalBondFraction: string;
  overbondedBondFraction: string;
  optimalBondRatio: string;
  overbondedBondRatio: string;
};

export const getBondToLiquidity = async ({
  bridge,
  tvl,
  swingbyUsdtPrice,
  btcUsdtPrice,
}: {
  bridge: SkybridgeBridge;
  tvl: number;
  swingbyUsdtPrice: number;
  btcUsdtPrice: number;
}) => {
  const OPTIMAL_BOND_TO_LIQUIDITY_RATIO = new Big('1.5');
  const OVERBONDED_BOND_TO_LIQUIDITY_RATIO = new Big('2');

  const bonded = new Big(tvl).times(swingbyUsdtPrice);

  const liquidity = await (async () => {
    const web3 = createWeb3Instance({ mode, bridge });
    const contract = new web3.eth.Contract(
      CONTRACTS.bridges[bridge][mode].abi,
      CONTRACTS.bridges[bridge][mode].address,
    );

    try {
      const floatReserves = await contract.methods
        .getFloatReserve(
          CONTRACTS.coins.BTC[mode].address,
          CONTRACTS.coins[bridge === 'btc_erc' ? 'WBTC' : 'BTCB.BEP20'][mode].address,
        )
        .call();
      const btcReserve = new Big(floatReserves[0] || 0).div('1e8').times(btcUsdtPrice);
      const wbtcReserve = new Big(floatReserves[1] || 0).div('1e8').times(btcUsdtPrice);
      return btcReserve.add(wbtcReserve);
    } catch (err) {
      logger.error({ err }, 'Could not calculate liquidity');
      return new Big(0);
    }
  })();
  const data = {
    currency: 'USD',
    status: ((): Data['status'] => {
      if (liquidity.eq(0)) {
        return 'overbonded';
      }

      if (bonded.div(liquidity).lt(OPTIMAL_BOND_TO_LIQUIDITY_RATIO)) {
        return 'underbonded';
      }

      if (bonded.div(liquidity).gte(OVERBONDED_BOND_TO_LIQUIDITY_RATIO)) {
        return 'overbonded';
      }

      return 'optimal';
    })(),
    bond: bonded.toFixed(2),
    liquidity: liquidity.toFixed(2),
    optimalBondFraction: new Big(1)
      .minus(new Big(1).div(OPTIMAL_BOND_TO_LIQUIDITY_RATIO.add(1)))
      .toString(),
    overbondedBondFraction: new Big(1)
      .minus(new Big(1).div(OVERBONDED_BOND_TO_LIQUIDITY_RATIO.add(1)))
      .toString(),
    optimalBondRatio: OPTIMAL_BOND_TO_LIQUIDITY_RATIO.toString(),
    overbondedBondRatio: OVERBONDED_BOND_TO_LIQUIDITY_RATIO.toString(),
  };
  return data;
};
