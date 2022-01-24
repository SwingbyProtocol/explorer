import { SkybridgeBridge, SkybridgeQuery } from '@swingby-protocol/sdk';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { castTxForSkyPools, generateQueryEndpoint } from '../../explorer';
import { fetcher } from '../../fetch';
import { logger } from '../../logger';

export const useTxsQuery = () => {
  const [txs, setTxs] = useState<SkybridgeQuery[] | null>(null);
  // Memo: initial state is the placeholder
  const [total, setTotal] = useState<number>(99);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const endpoint = useSelector((state) => state.explorer.nodeEndpoint);
  const router = useRouter();
  const params = router.query;
  const bridge = (params.bridge as SkybridgeBridge) ?? '';
  const hash = (params.hash as string) ?? '';
  const page = params.page ?? '0';
  const q = (params.q as string) ?? '';
  const type = (params.tx as string) ?? 'swaps';
  const isRejected = params.rejected === 'true' ? true : false;

  const fetchQuery = useCallback(
    async ({ baseUrl, bridge }: { baseUrl: string; bridge: SkybridgeBridge }) => {
      const numPage = Number(page) ?? 0;
      const validPage = numPage > 0 ? numPage : 0;
      const url = generateQueryEndpoint({
        baseUrl,
        page: validPage,
        query: q,
        isRejectedTx: isRejected,
        hash,
      });
      const result = await fetcher<{ items: SkybridgeQuery[]; total: number }>(url);
      const items = result.items;
      const total = result.total;
      const transactions = items.map((tx) => {
        return castTxForSkyPools({ tx, bridge: 'btc_bep20' });
      });
      return { transactions, total };
    },
    [hash, isRejected, page, q],
  );

  const updateQuery = useCallback(async () => {
    try {
      if (page === '0' && bridge === '') {
        const urlErc = `${endpoint['btc_erc']}/api/v1/${type}/query`;
        const urlBep20 = `${endpoint['btc_bep20']}/api/v1/${type}/query`;
        const results = await Promise.all([
          fetchQuery({ baseUrl: urlErc, bridge: 'btc_erc' }),
          fetchQuery({ baseUrl: urlBep20, bridge: 'btc_bep20' }),
        ]);
        const { transactions: ethTxs } = results[0];
        const { transactions: bscTxs } = results[1];
        const transactions = ethTxs.concat(bscTxs).sort((a, b) => b.timestamp - a.timestamp);
        setTxs(transactions);
        if (bridge) {
          setTotal(bridge === 'btc_erc' ? results[0].total : results[1].total);
        }
      } else {
        if (!bridge) return;
        const baseUrl = `${endpoint[bridge]}/api/v1/${type}/query`;
        const { transactions, total } = await fetchQuery({ baseUrl, bridge });
        setTxs(transactions);
        setTotal(total);
      }
    } catch (error) {
      logger.error({ error });
    }
  }, [page, endpoint, fetchQuery, type, bridge]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        await updateQuery();
      } catch (error) {
        logger.error({ error });
      } finally {
        setIsLoading(false);
      }
    })();
    const interval = setInterval(() => {
      updateQuery();
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, [updateQuery]);

  return useMemo(
    () => ({
      txs,
      isLoading,
      page: Number(page),
      q,
      bridge,
      type,
      rejected: params.rejected === 'true' ? true : false,
      total,
      isNoMatch: !isLoading && txs?.length === 0,
    }),
    [txs, isLoading, page, q, bridge, type, params.rejected, total],
  );
};
