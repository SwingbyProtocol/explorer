import { SkybridgeBridge } from '@swingby-protocol/sdk';
import { NextApiRequest, NextApiResponse } from 'next';

import { corsMiddleware, getParam } from '../../../modules/api';
import { TXS_COUNT } from '../../../modules/env';
import { fetch } from '../../../modules/fetch';
import {
  getSbBtcContract,
  getScanApiKey,
  getScanBaseEndpoint,
  IEtherscanTransaction,
} from '../../../modules/pool';

const generateUrl = (
  page: number,
  walletAddress: string,
  limit: number,
  bridge: SkybridgeBridge,
) => {
  const base = getScanBaseEndpoint(bridge);
  const apiKey = getScanApiKey(bridge);
  const sbBtcContractAddress = getSbBtcContract(bridge);

  return `${base}/api?module=account&action=tokentx&contractaddress=${sbBtcContractAddress}&address=${walletAddress}&page=${page}&offset=${limit}&sort=desc&apikey=${apiKey}`;
};

const fetchRecentTransaction = async (address: string, page: number, bridge: SkybridgeBridge) => {
  const url = generateUrl(page, address, TXS_COUNT, bridge);
  const result = await fetch<{ result: IEtherscanTransaction[] }>(url);

  const fetchedHistories = result.ok && result.response.result;
  return fetchedHistories;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IEtherscanTransaction[]>,
) {
  await corsMiddleware({ req, res });

  const address = getParam({ req, name: 'address' });
  const page = getParam({ req, name: 'page' });
  const bridge = getParam({ req, name: 'bridge' }) as SkybridgeBridge;

  try {
    const txsWithPage = await fetchRecentTransaction(address, Number(page), bridge);
    res.status(200).json(txsWithPage);
  } catch (e) {
    console.log(e);
  }
}
