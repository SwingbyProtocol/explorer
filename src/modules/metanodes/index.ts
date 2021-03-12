import { SKYBRIDGE_BRIDGES, SkybridgeBridge } from '@swingby-protocol/sdk';

import { TStatus } from '../explorer';

export { fetchNodeEarningsList, fetchNodeList } from './utils';

export interface INodeListResponse {
  id: string;
  ip: {
    address: string;
    regionCode: string;
    regionName: string;
  };
  status: string;
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
}

export interface IBridge {
  path: string;
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

const btcErc = SKYBRIDGE_BRIDGES.find((bridge) => bridge === 'btc_erc');
const btcBep = SKYBRIDGE_BRIDGES.find((bridge) => bridge === 'btc_bep');

export const MetanodeBridges = [
  {
    path: btcErc,
    tabMenu: 'Bitcoin to Ethereum',
  },
  {
    path: btcBep,
    tabMenu: 'Bitcoin to BSC',
  },
];

export const churnedIn = 'churned-in';
export const bondTooLow = 'may-churn-out--bond-too-low';
export const bondExpiring = 'may-churn-out--bond-expiring';
export const mayChurnIn = 'may-churn-in';

export const toggleStatusBg = (status: string, i: number): string | boolean => {
  switch (status) {
    case churnedIn:
      return i % 2 !== 0;
    case bondTooLow:
      return bondTooLow;
    case bondExpiring:
      return bondExpiring;

    default:
      return mayChurnIn;
  }
};

export const toggleStatusIconColor = (status: string): TStatus => {
  switch (status) {
    case churnedIn:
      return 'COMPLETED';
    case bondTooLow:
      return 'REFUNDED';
    case bondExpiring:
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
