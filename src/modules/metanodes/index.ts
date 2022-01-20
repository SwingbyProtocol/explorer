import { SKYBRIDGE_BRIDGES, SkybridgeBridge } from '@swingby-protocol/sdk';

import { NodeStatus } from '../../generated/graphql';
import { TStatus } from '../explorer';

export { formatPeers } from './utils';

export {
  fetchNodeEarningsList,
  listNodeStatus,
  listFloatAmountHistories,
  getLockedHistory,
  listHistory,
  getActiveNodeList,
} from './utils';

export const NODE_APR = 30;

export const DAYS_CHURNED_IN = 30;
// Todo: Confirm with backend
export const RANK_CHURNED_IN = 50;

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

export interface IPeerStatusTable {
  status: PeerStatus;
  nodes: string[];
  nodeQty: number;
}

export interface IPeer {
  active: boolean;
  id: string;
  moniker: string;
  p2pListener: string;
  rank: number;
  restUri: string;
  rewardsAddress1?: string;
  rewardsAddress2?: string;
  stake: IStake;
  state: number;
  state_name: string;
  version: string;
  thisNode?: boolean;
  regionCode?: string;
  status?: PeerStatus;
}

export interface IStake {
  address: string;
  amount: string;
  stakeTime: number;
  stakeValid: boolean;
}

export enum StateName {
  SignGen = 'SignGen',
}

export enum Version {
  The012 = '0.1.2',
  The012Migration = '0.1.2-migration',
}

export interface IActiveNode {
  address: string;
  lockedAmount: number;
  rank: number;
}

export interface IRewards {
  weeklyRewardsUsd: number;
  average: number;
}

export enum PeerStatus {
  ChurnedIn = 'CHURNED_IN',
  MayChurnIn = 'MAY_CHURN_IN',
  Migrating = 'MIGRATING',
  MayChurnOutBondTooLow = 'MAY_CHURN_OUT__BOND_TOO_LOW',
  MayChurnOutBondExpiring = 'MAY_CHURN_OUT__BOND_EXPIRING',
  InactiveBondTooLow = 'INACTIVE__BOND_TOO_LOW',
  InactiveBondExpired = 'INACTIVE__BOND_EXPIRED',
  Unreachable = 'UNREACHABLE',
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

export const toggleStatusBg = (status: PeerStatus, i: number): string | boolean => {
  switch (status) {
    case PeerStatus.ChurnedIn:
      return i % 2 !== 0;

    default:
      return status;
  }
};

export const toggleStatusWord = (status: PeerStatus): string | boolean => {
  switch (status) {
    case PeerStatus.ChurnedIn:
      return 'metanodes.metanode-status.churned-in';
    case PeerStatus.MayChurnOutBondTooLow:
      return 'metanodes.metanode-status.may-churn-out-bond-low';
    case PeerStatus.MayChurnOutBondExpiring:
      return 'metanodes.metanode-status.may-churn-out-bond-expiring';
    case PeerStatus.MayChurnIn:
      return 'metanodes.metanode-status.may-churn-in';
    case PeerStatus.Migrating:
      return 'metanodes.migrating';

    default:
      return status;
  }
};

export const toggleStatusIconColor = (status: PeerStatus): TStatus => {
  switch (status) {
    case PeerStatus.ChurnedIn:
      return 'COMPLETED';
    case PeerStatus.MayChurnOutBondTooLow:
      return 'SIGNING';

    case PeerStatus.Migrating:
      return 'EXPIRED';

    // Todo (after migration): 1 day before expire
    // case MayChurnOutBondExpiring:
    //   return 'EXPIRED';

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
