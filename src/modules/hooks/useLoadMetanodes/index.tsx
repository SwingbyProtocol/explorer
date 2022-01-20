import { SkybridgeBridge } from '@swingby-protocol/sdk';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { fetcher } from '../../fetch';
import { logger } from '../../logger';
import { formatPeers, IPeer } from '../../metanodes';

export const useLoadMetanodes = ({ bridge }: { bridge: SkybridgeBridge }) => {
  const [nodes, setNodes] = useState<IPeer[] | []>([]);
  const [nodeTvl, setNodeTvl] = useState<number>(0);
  const endpoint = useSelector((state) => state.explorer.nodeEndpoint);

  const getData = useCallback(async () => {
    try {
      if (!endpoint[bridge]) return;

      const url = `${endpoint[bridge]}/api/v1/peers`;
      const result = await fetcher<IPeer[]>(url);
      const { nodes, nodeTvl } = await formatPeers({ peers: result, bridge });
      setNodes(nodes);
      setNodeTvl(nodeTvl);
    } catch (error) {
      logger.error(error);
      setNodes([]);
      setNodeTvl(0);
    }
  }, [bridge, endpoint]);

  useEffect(() => {
    try {
      getData();
    } catch (error) {
      logger.error(error);
    }
  }, [getData]);

  return useMemo(() => ({ nodes, nodeTvl }), [nodes, nodeTvl]);
};
