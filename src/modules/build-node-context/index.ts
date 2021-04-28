import {
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
  const results = await Promise.all(
    SKYBRIDGE_BRIDGES.map((bridge) => getNetworkDetails({ mode, bridge })),
  );

  const getChaosNode = (bridge: SkybridgeBridge) => {
    switch (bridge) {
      case 'btc_erc':
        return ethChaosNodeEndpoints;
      case 'btc_bep20':
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
    const from = 'swapNodes';
    const index = SKYBRIDGE_BRIDGES.findIndex((it) => it === bridge);
    try {
      const nodes =
        mode === 'test'
          ? results[index]['swapNodes']
          : results[index]['swapNodes'].filter((it: string) => getChaosNode(bridge).includes(it));

      return nodes[randomInt(0, results[index][from].length - 1)] || null;
    } catch (e) {
      console.error('wat', e, JSON.stringify(results));
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
        btc_bep20: getRandomSwapNode({ bridge: 'btc_bep20' }),
        ...servers?.swapNode,
      },
      indexer: {
        btc_erc: getRandomIndexerNode({ bridge: 'btc_erc' }),
        btc_bep20: getRandomIndexerNode({ bridge: 'btc_bep20' }),
        ...servers?.indexer,
      },
    },
  };
};
