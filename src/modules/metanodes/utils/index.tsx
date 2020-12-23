import { INodeListResponse } from '..';
import { ENDPOINT_ETHEREUM_NODE } from '../../env';
import { camelize, fetch } from '../../fetch';

export const fetchNodeList = async () => {
  const url = ENDPOINT_ETHEREUM_NODE + '/api/v1/peers';
  try {
    const result = await fetch<INodeListResponse[]>(url);
    const metanodes = result.ok && camelize(result.response);
    return metanodes;
  } catch (e) {
    console.log(e);
  }
};
