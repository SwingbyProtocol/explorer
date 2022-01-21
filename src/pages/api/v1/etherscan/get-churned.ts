import { CONTRACTS, SkybridgeBridge } from '@swingby-protocol/sdk';
import { NextApiRequest, NextApiResponse } from 'next';
import { stringifyUrl } from 'query-string';

import { corsMiddleware, getParam } from '../../../../modules/api';
import {
  EtherscanResult,
  getScanApiBaseEndpoint,
  getScanApiKey,
} from '../../../../modules/etherscan';
import { fetcher } from '../../../../modules/fetch';

import { mode } from './../../../../modules/env';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await corsMiddleware({ req, res });

  const bridge = getParam({ req, name: 'bridge' }) as SkybridgeBridge;
  const startblock = getParam({ req, name: 'startblock' }) as string;

  try {
    const url = getScanApiBaseEndpoint(bridge) + '/api';
    const apikey = getScanApiKey(bridge);
    const endpoint = stringifyUrl({
      url,
      query: {
        module: 'account',
        action: 'txlist',
        endblock: 'latest',
        address: CONTRACTS.bridges[bridge][mode].address,
        sort: 'desc',
        apikey,
        startblock: startblock !== '0' ? startblock : undefined,
      },
    });
    const { result } = await fetcher<EtherscanResult>(endpoint);
    const filteredTxs =
      result &&
      result.filter((it) => {
        // Memo: MethodID in input data (refer to etherscan)
        return /^0x4e54cee0/i.test(it.input) || /^0x7c747cf9/i.test(it.input);
      });

    const lastTxHash = filteredTxs[0].hash;
    const lastTxBlock = filteredTxs[0].blockNumber;

    res.status(200).json({ lastTxHash, lastTxBlock });
  } catch (e) {
    console.log(e);
    res.status(200).json({ lastTxHash: 'Something went wrong', lastTxBlock: '0' });
  }
}
