import { INodeListResponse } from '..';
import { camelize, fetch } from '../../fetch';

export const fetchNodeList = async () => {
  const url = `https://metanode-earnings.vercel.app/api/v1/production/btc_erc/nodes`;

  try {
    const result = await fetch<INodeListResponse[]>(url);
    const metanodes = result.ok && camelize(result.response);
    return Promise.all(
      metanodes.map(async (node: INodeListResponse) => {
        try {
          return {
            location: node.ip.regionName,
            code: node.ip.regionCode,
            version: node.version,
            moniker: node.moniker,
            stake: node.stake,
            rewardsAddress1: node.addresses[0],
            rewardsAddress2: node.addresses[1],
          };
        } catch (e) {
          console.log(e);
        }
      }),
    );
  } catch (e) {
    console.log(e);
  }
};

export const fetchNodeEarningsList = async () => {
  const url = 'https://metanode-earnings.vercel.app/api/v1/production/rewards/ranking';
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
