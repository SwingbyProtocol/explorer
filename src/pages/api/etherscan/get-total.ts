import { NextApiRequest, NextApiResponse } from 'next';

import { corsMiddleware, getParam } from '../../../modules/api';
import { CONTRACT_SB_BTC, ENDPOINT_ETHERSCAN, etherscanApiKey } from '../../../modules/env';
import { fetch } from '../../../modules/fetch';
import { IEtherscanTransaction } from '../../../modules/pool';

const base = ENDPOINT_ETHERSCAN;

const generateUrl = (page: number, walletAddress: string, limit: number) => {
  return `${base}/api?module=account&action=tokentx&contractaddress=${CONTRACT_SB_BTC}&address=${walletAddress}&page=${page}&offset=${limit}&sort=desc&apikey=${etherscanApiKey}`;
};

const getTotal = async (walletAddress: string) => {
  let total = 0;
  let page = 1;
  let isFinishFetching = false;
  const limit = 1000;
  do {
    const result = await fetch<{ result: IEtherscanTransaction[] }>(
      generateUrl(page, walletAddress, limit),
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

  try {
    const total = await getTotal(address);
    res.status(200).json(total);
  } catch (e) {
    console.log(e);
  }
}
