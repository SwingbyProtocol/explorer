import { SKYBRIDGE_BRIDGES } from '@swingby-protocol/sdk';

export { fetchNodeList, fetchNodeEarningsList } from './utils';

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

export interface INodesResponse {
  stake: {
    address: string;
    amount: string;
    expiresAt: string;
  };
  location: string;
  code: string;
  version: string;
  moniker: string;
  rewardsAddress1: string;
  rewardsAddress2: string;
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

export interface IBridge {
  path: string;
  tabMenu: string;
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
