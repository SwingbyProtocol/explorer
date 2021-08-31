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
      return 'metanodes.metanode-status.may-churn-out-bond-expiring';
    case MayChurnIn:
      return 'metanodes.metanode-status.may-churn-in';
    case InactiveBondExpired:
      return 'metanodes.metanode-status.inactive-bond-expired';
    case InactiveBondTooLow:
      return 'metanodes.metanode-status.inactive-bond-too-low';
    case Unreachable:
      return 'metanodes.metanode-status.Unreachable';

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
      return 'SIGNING';
    case InactiveBondTooLow:
      return 'PENDING';
    case InactiveBondExpired:
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
