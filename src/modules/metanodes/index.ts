import { SKYBRIDGE_BRIDGES, SkybridgeBridge } from '@swingby-protocol/sdk';

import { TStatus } from '../explorer';

export { fetchNodeEarningsList, fetchNodeList, listNodeStatus } from './utils';

export interface INodeListResponse {
  id: string;
  ip: {
    address: string;
    regionCode: string;
    regionName: string;
  };
  status: TChurnStatus;
  version: string;
  moniker: string;
  restUri: string;
  p2pUri: string;
  addresses: string[];
  stake: {
    address: string;
    amount: string;
    expiresAt: string;
  };
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
  since: Date;
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
  status: string;
  nodes: string[];
  nodeQty: number;
}

const btcErc = SKYBRIDGE_BRIDGES.find((bridge) => bridge === 'btc_erc');
const btcBep = SKYBRIDGE_BRIDGES.find((bridge) => bridge === 'btc_bep');

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
  | 'inactive--bond-too-low';

export const churnedIn = 'churned-in';
export const bondTooLow = 'may-churn-out--bond-too-low';
export const bondExpiring = 'may-churn-out--bond-expiring';
export const mayChurnIn = 'may-churn-in';
export const inactiveBondExpired = 'inactive--bond-expired';
export const inactiveBondTooLow = 'inactive--bond-too-low';

export const toggleStatusBg = (status: TChurnStatus, i: number): string | boolean => {
  switch (status) {
    case churnedIn:
      return i % 2 !== 0;
    case bondTooLow:
      return bondTooLow;
    case bondExpiring:
      return bondExpiring;
    case inactiveBondExpired:
      return inactiveBondExpired;
    case inactiveBondTooLow:
      return inactiveBondTooLow;

    default:
      return mayChurnIn;
  }
};

export const toggleStatusWord = (status: TChurnStatus): string | boolean => {
  switch (status) {
    case churnedIn:
      return 'metanodes.metanode-status.churned-in';
    case bondTooLow:
      return 'metanodes.metanode-status.may-churn-out-bond-too-low';
    case bondExpiring:
      return 'metanodes.metanode-status.may-churn-out-bond-expiring';
    case mayChurnIn:
      return 'metanodes.metanode-status.may-churn-in';
    case inactiveBondExpired:
      return 'metanodes.metanode-status.inactive-bond-expired';
    case inactiveBondTooLow:
      return 'metanodes.metanode-status.inactive-bond-too-low';

    default:
      return status;
  }
};

export const toggleStatusIconColor = (status: TChurnStatus): TStatus => {
  switch (status) {
    case churnedIn:
      return 'COMPLETED';
    case bondTooLow:
      return 'REFUNDED';
    case bondExpiring:
      return 'PENDING';
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
      return 'ETH';

    case btcBep:
      return 'BNB';

    default:
      return 'ETH';
  }
};
