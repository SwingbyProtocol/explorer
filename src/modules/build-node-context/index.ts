import {
  FIXED_NODE_ENDPOINT,
  getNetworkDetails,
  SkybridgeBridge,
  SkybridgeContext,
  SkybridgeMode,
  SKYBRIDGE_BRIDGES,
} from '@swingby-protocol/sdk';
import { PartialDeep } from 'type-fest';

import { bscChaosNodeEndpoints, ethChaosNodeEndpoints } from './chaosNodeList';

const randomInt = (min: number, max: number) => Math.round(Math.random() * (max - min)) + min;

export const buildChaosNodeContext = async <M extends SkybridgeMode>({
  mode,
  servers,
  affiliateApi,
}: {
  mode: M;
} & PartialDeep<Omit<SkybridgeContext<M>, 'mode'>>): Promise<SkybridgeContext<M>> => {
  const results: any = await Promise.all(
    SKYBRIDGE_BRIDGES.map((bridge) => getNetworkDetails({ mode, bridge })),
  );

  const getChaosNode = (bridge: SkybridgeBridge) => {
    switch (bridge) {
      case 'btc_erc':
        return ethChaosNodeEndpoints;
      case 'btc_skypool':
        return bscChaosNodeEndpoints;

      default:
        return ethChaosNodeEndpoints;
    }
  };

  const getRandomIndexerNode = ({ bridge }: { bridge: SkybridgeBridge }) => {
    const from = 'indexerNodes';
    const index = SKYBRIDGE_BRIDGES.findIndex((it) => it === bridge);
    try {
      return results[index][from][randomInt(0, results[index][from].length - 1)] || null;
    } catch (e) {
      console.error('wat', e, JSON.stringify(results));
      return null;
    }
  };

  const getRandomSwapNode = ({ bridge }: { bridge: SkybridgeBridge }) => {
    const index = SKYBRIDGE_BRIDGES.findIndex((it) => it === bridge);
    try {
      const nodes =
        mode === 'test'
          ? // Memo: Almost all of the testnet nodes doesn't accept HTTP request atm
            //  results[index]['swapNodes'].map((it) => it.restUri)
            FIXED_NODE_ENDPOINT[bridge][mode]
          : results[index]['swapNodes']
              .filter((it) => getChaosNode(bridge).includes(it.restUri))
              .map((it) => it.restUri);

      const url = nodes && nodes[randomInt(0, nodes.length - 1)];
      return url;
    } catch (e) {
      return null;
    }
  };

  return {
    mode,
    affiliateApi: affiliateApi ?? 'https://affiliate.swingby.network',
    servers: {
      ...servers,
      swapNode: {
        btc_erc: getRandomSwapNode({ bridge: 'btc_erc' }),
        btc_skypool: getRandomSwapNode({ bridge: 'btc_skypool' }),
        ...servers?.swapNode,
      },
      indexer: {
        btc_erc: getRandomIndexerNode({ bridge: 'btc_erc' }),
        btc_skypool: getRandomIndexerNode({ bridge: 'btc_skypool' }),
        ...servers?.indexer,
      },
    },
  };
};
