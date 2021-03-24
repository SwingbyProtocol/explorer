import { SkybridgeBridge } from '@swingby-protocol/sdk';

import { ENDPOINT_SKYBRIDGE_EXCHANGE, mode } from '../../../env';
import { fetcher } from '../../../fetch';

export const fetchSbBTCBalance = async (userAddress: string, bridge: SkybridgeBridge) => {
  const url = `${ENDPOINT_SKYBRIDGE_EXCHANGE}/${mode}/${bridge}/sbBTC/balance?address=${userAddress}`;
  const res = await fetcher<{ balance: string }>(url);
  return Number(res.balance);
};
