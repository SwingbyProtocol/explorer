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
export interface INodesResponse {
  moniker: string;
  stake: {
    address: string;
    amount: string;
    stakeTXHash: string;
    stakeTime: number;
    stakeValid: boolean;
  };
  stateName: string;
  location: string;
  code?: string;
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
  const url = `https://api.ipgeolocationapi.com/geolocate/${ip}`;
  try {
    const res = await fetch(url);
    const response = await res.json();
    const country = response.name;
    const code = response.alpha2;
    return { country, code };
  } catch (e) {
    return { country: ip, code: null };
  }
};
