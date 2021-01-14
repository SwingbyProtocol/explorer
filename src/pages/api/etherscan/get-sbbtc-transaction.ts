import { NextApiRequest, NextApiResponse } from 'next';

import { corsMiddleware, getParam } from '../../../modules/api';
import {
  CONTRACT_SB_BTC,
  ENDPOINT_ETHERSCAN,
  etherscanApiKey,
  TXS_COUNT,
} from '../../../modules/env';
import { fetch } from '../../../modules/fetch';
import { IEtherscanTransaction } from '../../../modules/pool';

// type Data = { country: string; code: string };

const base = ENDPOINT_ETHERSCAN;

const generateUrl = (page: number, walletAddress: string, limit: number) => {
  return `${base}/api?module=account&action=tokentx&contractaddress=${CONTRACT_SB_BTC}&address=${walletAddress}&page=${page}&offset=${limit}&sort=desc&apikey=${etherscanApiKey}`;
};

const fetchRecentTransaction = async (address: string, page: number) => {
  const result = await fetch<{ result: IEtherscanTransaction[] }>(
    generateUrl(page, address, TXS_COUNT),
  );

  const fetchedHistories = result.ok && result.response.result;
  return fetchedHistories;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await corsMiddleware({ req, res });

  const address = getParam({ req, name: 'address' });
  const page = getParam({ req, name: 'page' });

  try {
    const txsWithPage = await fetchRecentTransaction(address, Number(page));
    res.status(200).json(txsWithPage);
  } catch (e) {
    console.log(e);
  }
}
