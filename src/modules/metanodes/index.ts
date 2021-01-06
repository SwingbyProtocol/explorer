export { fetchNodeList } from './utils';

export interface INodeListResponse {
  active: boolean;
  id: string;
  moniker: string;
  rank: number;
  rewardsAddress1: string;
  rewardsAddress2: string;
  shareValid: boolean;
  stake: {
    address: string;
    amount: string;
    stakeTXHash: string;
    stakeTime: number;
    stakeValid: boolean;
  };
  state: number;
  stateName: string;
  thisNode?: boolean;
  version: string;
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

// Memo: Using old js fetch method to avoid CORS issue
export const fetchNodeCountry = async (ip: string) => {
  const url = `https://get.geojs.io/v1/ip/country/${ip}.json`;
  try {
    const res = await fetch(url);
    const response = await res.json();
    const city = response.name;
    return city;
  } catch (e) {
    return ip;
  }
};
