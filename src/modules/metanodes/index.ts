import { SKYBRIDGE_BRIDGES, SkybridgeBridge } from '@swingby-protocol/sdk';

import { TStatus } from '../explorer';

export {
  fetchNodeEarningsList,
  fetchNodeList,
  listNodeStatus,
  calTvl,
  listFloatAmountHistories,
  getLockedHistory,
  listHistory,
} from './utils';

export interface INodeListResponse {
  addresses: string[];
  bondAddress: string;
  bondAmount: string;
  bondExpiresAt: string;
  id: string;
  ip: string;
  lastSeenAt: string;
  moniker: string;
  p2pHost: string;
  regionCode: string;
  regionName: string;
  restUri: string;
  status: TChurnStatus;
  version: string;
}

export interface INodeEarningsResponse {
  moniker: string;
  bond: number;
  earnings1W: number;
  earnings1M: number;
}

export enum NodeStatus {
  DISCOVERY = 'Discovery',
  SIGNING = 'Signing',
  IDLE = 'Idle',
}
export enum NodeActiveStatus {
  ACTIVE = 'Active',
  NON_ACTIVE = 'nonActive',
}

export interface IReward {
  currency: string;
  total: string;
  avgPerNode: string;
  networkRewards: string;
  stakingRewards: string;
}

export interface IBridge {
  bridge: SkybridgeBridge;
  tabMenu: string;
}

export interface ILiquidity {
  status: 'overbonded' | 'underbonded' | 'optimal';
  bond: string;
  liquidity: string;
  optimalBondFraction: string;
  overbondedBondFraction: string;
}

export interface IChurn {
  nextAt: string;
  lastTxHash: string;
  lastAt: string;
}

export type TBondHistory = {
  since: string;
  bond: string;
};
export interface IBondHistories {
  currency: string;
  data: TBondHistory[];
}

export interface ILiquidityRatios {
  currency: string;
  data: ILiquidityRatio[];
}

export interface ILiquidityRatio {
  currency: string;
  liquidity: string;
  fraction: string;
}

export interface INodeStatusTable {
  status: TChurnStatus;
  nodes: string[];
  nodeQty: number;
}

const btcErc = SKYBRIDGE_BRIDGES.find((bridge) => bridge === 'btc_erc');
const btcBep = SKYBRIDGE_BRIDGES.find((bridge) => bridge === 'btc_bep20');

export const BRIDGES = [
  {
    bridge: btcErc,
    tabMenu: 'Bitcoin to Ethereum',
  },
  {
    bridge: btcBep,
    tabMenu: 'Bitcoin to BSC',
  },
];

type TChurnStatus =
  | 'churned-in'
  | 'may-churn-out--bond-too-low'
  | 'may-churn-out--bond-expiring'
  | 'may-churn-in'
  | 'inactive--bond-expired'
  | 'inactive--bond-too-low'
  | 'unreachable';

export const churnedIn = 'churned-in';
export const bondLow = 'may-churn-out--bond-too-low';
export const bondExpiring = 'may-churn-out--bond-expiring';
export const mayChurnIn = 'may-churn-in';
export const inactiveBondExpired = 'inactive--bond-expired';
export const inactiveBondTooLow = 'inactive--bond-too-low';
export const unreachable = 'unreachable';

export const toggleStatusBg = (status: TChurnStatus, i: number): string | boolean => {
  switch (status) {
    case churnedIn:
      return i % 2 !== 0;
    case bondLow:
      return bondLow;
    case bondExpiring:
      return bondExpiring;
    case inactiveBondExpired:
      return inactiveBondExpired;
    case inactiveBondTooLow:
      return inactiveBondTooLow;
    case unreachable:
      return unreachable;

    default:
      return mayChurnIn;
  }
};

export const toggleStatusWord = (status: TChurnStatus): string | boolean => {
  switch (status) {
    case churnedIn:
      return 'metanodes.metanode-status.churned-in';
    case bondLow:
      return 'metanodes.metanode-status.may-churn-out-bond-low';
    case bondExpiring:
      return 'metanodes.metanode-status.may-churn-out-bond-expiring';
    case mayChurnIn:
      return 'metanodes.metanode-status.may-churn-in';
    case inactiveBondExpired:
      return 'metanodes.metanode-status.inactive-bond-expired';
    case inactiveBondTooLow:
      return 'metanodes.metanode-status.inactive-bond-too-low';
    case unreachable:
      return 'metanodes.metanode-status.unreachable';

    default:
      return status;
  }
};

export const toggleStatusIconColor = (status: TChurnStatus): TStatus => {
  switch (status) {
    case churnedIn:
      return 'COMPLETED';
    case bondLow:
      return 'SIGNING';
    case bondExpiring:
      return 'SIGNING';
    case inactiveBondTooLow:
      return 'PENDING';
    case inactiveBondExpired:
      return 'PENDING';

    default:
      return 'WAITING';
  }
};

export const getSbBtcRewardCurrency = (bridge: SkybridgeBridge) => {
  switch (bridge) {
    case btcErc:
      return 'ERC20';

    case btcBep:
      return 'BEP20';

    default:
      return 'ERC20';
  }
};
