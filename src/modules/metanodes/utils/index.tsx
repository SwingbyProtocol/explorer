import { SkybridgeBridge } from '@swingby-protocol/sdk';

import { INodeListResponse } from '..';
import { CACHED_ENDPOINT, mode } from '../../env';
import { camelize, fetch } from '../../fetch';

export const fetchNodeList = async (bridge: SkybridgeBridge) => {
  const url = `${CACHED_ENDPOINT}/v1/${mode}/${bridge}/nodes`;

  try {
    const result = await fetch<INodeListResponse[]>(url);
    const metanodes = result.ok && camelize(result.response);
    return metanodes;
  } catch (e) {
    console.log(e);
  }
};

export const fetchNodeEarningsList = async () => {
  const url = `${CACHED_ENDPOINT}/v1/${mode}/rewards/ranking`;
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
