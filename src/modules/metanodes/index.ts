import { SKYBRIDGE_BRIDGES, SkybridgeBridge } from '@swingby-protocol/sdk';

import { NodeStatus } from '../../generated/graphql';
import { TStatus } from '../explorer';

export {
  fetchNodeEarningsList,
  listNodeStatus,
  listFloatAmountHistories,
  getLockedHistory,
  listHistory,
} from './utils';

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
  hint?: string;
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
  status: NodeStatus;
  nodes: string[];
  nodeQty: number;
}

const btcSkypool = SKYBRIDGE_BRIDGES.find((bridge) => bridge === 'btc_skypool');

export const BRIDGES = [
  {
    bridge: btcSkypool,
    tabMenu: 'Bitcoin to Ethereum',
  },
];

export const {
  ChurnedIn,
  MayChurnOutBondTooLow,
  MayChurnOutBondExpiring,
  MayChurnIn,
  InactiveBondExpired,
  InactiveBondTooLow,
  Unreachable,
} = NodeStatus;

export const toggleStatusBg = (status: NodeStatus, i: number): string | boolean => {
  switch (status) {
    case ChurnedIn:
      return i % 2 !== 0;

    default:
      return status;
  }
};

export const toggleStatusWord = (status: NodeStatus): string | boolean => {
  switch (status) {
    case ChurnedIn:
      return 'metanodes.metanode-status.churned-in';
    case MayChurnOutBondTooLow:
      return 'metanodes.metanode-status.may-churn-out-bond-low';
    case MayChurnOutBondExpiring:
      return 'metanodes.metanode-status.bond-expiring-preparing-for-migration';
    case MayChurnIn:
      return 'metanodes.metanode-status.may-churn-in';
    case InactiveBondExpired:
      return 'metanodes.metanode-status.bond-expiring-preparing-for-migration';
    case InactiveBondTooLow:
      return 'metanodes.metanode-status.inactive-bond-too-low';
    case Unreachable:
      return 'metanodes.metanode-status.unreachable';

    default:
      return status;
  }
};

export const toggleStatusIconColor = (status: NodeStatus): TStatus => {
  switch (status) {
    case ChurnedIn:
      return 'COMPLETED';
    case MayChurnOutBondTooLow:
      return 'SIGNING';
    case MayChurnOutBondExpiring:
      return 'EXPIRED';
    case InactiveBondTooLow:
      return 'PENDING';
    case InactiveBondExpired:
      return 'EXPIRED';

    default:
      return 'WAITING';
  }
};

export const getSbBtcRewardCurrency = (bridge: SkybridgeBridge) => {
  switch (bridge) {
    case btcSkypool:
      return 'BEP20';

    default:
      return 'ERC20';
  }
};
