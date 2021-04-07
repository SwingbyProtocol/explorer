import { SkybridgeBridge } from '@swingby-protocol/sdk';
import { NextApiRequest, NextApiResponse } from 'next';

import { corsMiddleware, getParam } from '../../../../modules/api';
import { fetch } from '../../../../modules/fetch';
import {
  getSbBtcContract,
  getScanApiKey,
  getScanApiBaseEndpoint,
  IEtherscanTransaction,
} from '../../../../modules/pool';

const generateUrl = (
  page: number,
  walletAddress: string,
  limit: number,
  bridge: SkybridgeBridge,
) => {
  const base = getScanApiBaseEndpoint(bridge);
  const apiKey = getScanApiKey(bridge);
  const sbBtcContractAddress = getSbBtcContract(bridge);

  return `${base}/api?module=account&action=tokentx&contractaddress=${sbBtcContractAddress}&address=${walletAddress}&page=${page}&offset=${limit}&sort=desc&apikey=${apiKey}`;
};

const getTotal = async (walletAddress: string, bridge: SkybridgeBridge) => {
  let total = 0;
  let page = 1;
  let isFinishFetching = false;
  const limit = 1000;
  do {
    const result = await fetch<{ result: IEtherscanTransaction[] }>(
      generateUrl(page, walletAddress, limit, bridge),
    );
    const fetchedHistories = result.ok && result.response.result;
    const historiesLength = fetchedHistories.length;
    if (historiesLength === limit) {
      total = total + historiesLength;
      page++;
    } else {
      total = total + historiesLength;
      isFinishFetching = true;
    }
  } while (!isFinishFetching);
  return total;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<number>) {
  await corsMiddleware({ req, res });

  const address = getParam({ req, name: 'address' });
  const bridge = getParam({ req, name: 'bridge' }) as SkybridgeBridge;

  try {
    const total = await getTotal(address, bridge);
    res.status(200).json(total);
  } catch (e) {
    console.log(e);
  }
}
