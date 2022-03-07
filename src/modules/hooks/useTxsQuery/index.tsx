import { SkybridgeBridge, SkybridgeQuery } from '@swingby-protocol/sdk';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { isSupportBsc } from '../../env';
import { castTxForSkyPools, generateQueryEndpoint, SkyPoolsQuery } from '../../explorer';
import { fetcher } from '../../fetch';
import { logger } from '../../logger';

export const useTxsQuery = () => {
  const [txs, setTxs] = useState<SkyPoolsQuery[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Memo: initial state is the placeholder
  const [total, setTotal] = useState<number>(99);

  const endpoint = useSelector((state) => state.explorer.nodeEndpoint);
  const router = useRouter();
  const params = router.query;
  const bridge = (params.bridge as SkybridgeBridge) ?? '';
  const hash = (params.hash as string) ?? '';
  const page = params.page ?? '0';
  const q = (params.q as string) ?? '';

  const type = (params.type as 'search' | 'swaps' | 'floats') ?? '';
  const isRejected = params.rejected === 'true' ? true : false;

  const fetchQuery = useCallback(
    async ({
      baseUrl,
      bridge,
    }: {
      baseUrl: string;
      bridge: SkybridgeBridge;
    }): Promise<{ transactions: SkyPoolsQuery[]; total: number }> => {
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
        return castTxForSkyPools({ tx, bridge });
      });
      return { transactions, total };
    },
    [hash, isRejected, page, q],
  );

  const updateQuery = useCallback(async () => {
    if (!endpoint.btc_erc) return;
    try {
      if (hash || type === 'search') {
        const urlErcSwaps = `${endpoint['btc_erc']}/api/v1/swaps/query`;
        const urlErcFloats = `${endpoint['btc_erc']}/api/v1/floats/query`;

        const results = await Promise.all([
          fetchQuery({ baseUrl: urlErcSwaps, bridge: 'btc_erc' }),
          fetchQuery({ baseUrl: urlErcFloats, bridge: 'btc_erc' }),
        ]);
        const { transactions: ethSwaps } = results[0];
        const { transactions: ethFloats } = results[1];

        const ethTransactions = ethSwaps.concat(ethFloats);
        const transactions = ethTransactions.sort((a, b) => b.timestamp - a.timestamp);
        setTxs(transactions);
        setTotal(transactions.length);
        return;
      }

      // Memo: `floats` only returns deposit txs. Withdraw txs are in `swaps` query.
      const txType = type ? type : 'swaps';

      if (bridge) {
        const baseUrl = `${endpoint[bridge]}/api/v1/${txType}/query`;
        const { transactions, total } = await fetchQuery({ baseUrl, bridge });
        setTxs(transactions);
        setTotal(total);
        return;
      }

      // Memo: default search
      const isMultiBridge = page === '0' && bridge === '';

      if (isMultiBridge) {
        const urlErc = `${endpoint['btc_erc']}/api/v1/${txType}/query`;
        if (isSupportBsc) {
          const results = await Promise.all([fetchQuery({ baseUrl: urlErc, bridge: 'btc_erc' })]);
          const { transactions: ethTxs } = results[0];
          const transactions = ethTxs.sort((a, b) => b.timestamp - a.timestamp);
          setTxs(transactions);
          return;
        } else {
          const results = await Promise.all([fetchQuery({ baseUrl: urlErc, bridge: 'btc_erc' })]);
          const { transactions: ethTxs } = results[0];
          setTxs(ethTxs);
          return;
        }
      }
    } catch (error) {
      logger.error({ error });
    }
  }, [page, endpoint, fetchQuery, type, bridge, hash]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        await updateQuery();
      } catch (error) {
        logger.error({ error });
      } finally {
        if (!endpoint.btc_erc) return;
        setIsLoading(false);
      }
    })();
    const interval = setInterval(() => {
      updateQuery();
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, [updateQuery, endpoint]);

  return useMemo(
    () => ({
      txs,
      tx: txs && txs[0],
      isLoading,
      page: Number(page),
      q,
      bridge,
      type,
      rejected: params.rejected === 'true' ? true : false,
      total,
    }),
    [txs, isLoading, page, q, bridge, type, params.rejected, total],
  );
};
