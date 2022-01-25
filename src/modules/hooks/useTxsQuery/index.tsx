import { SkybridgeBridge, SkybridgeQuery } from '@swingby-protocol/sdk';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  castTxForSkyPools,
  generateQueryEndpoint,
  getEndpoint,
  SkyPoolsQuery,
} from '../../explorer';
import { fetcher } from '../../fetch';
import { logger } from '../../logger';

export const useTxsQuery = () => {
  const [txs, setTxs] = useState<SkyPoolsQuery[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [urlEth, setUrlEth] = useState<string | null>(null);
  const [urlBsc, setUrlBsc] = useState<string | null>(null);

  // Memo: initial state is the placeholder
  const [total, setTotal] = useState<number>(99);

  const router = useRouter();
  const params = router.query;
  const bridge = (params.bridge as SkybridgeBridge) ?? '';
  const hash = (params.hash as string) ?? '';
  const page = params.page ?? '0';
  const q = (params.q as string) ?? '';
  const type = (params.type as 'search' | 'swaps' | 'floats') ?? '';
  const isRejected = params.rejected === 'true' ? true : false;

  useEffect(() => {
    (async () => {
      try {
        const { urlEth, urlBsc } = await getEndpoint();
        setUrlEth(urlEth);
        setUrlBsc(urlBsc);
      } catch (error) {
        logger.error({ error });
      }
    })();
  }, []);

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
    try {
      if (hash || type === 'search') {
        const urlErcSwaps = `${urlEth}/api/v1/swaps/query`;
        const urlBep20Swaps = `${urlBsc}/api/v1/swaps/query`;
        const urlErcFloats = `${urlEth}/api/v1/floats/query`;
        const urlBep20Floats = `${urlBsc}/api/v1/floats/query`;

        const results = await Promise.all([
          fetchQuery({ baseUrl: urlErcSwaps, bridge: 'btc_erc' }),
          fetchQuery({ baseUrl: urlBep20Swaps, bridge: 'btc_bep20' }),
          fetchQuery({ baseUrl: urlErcFloats, bridge: 'btc_erc' }),
          fetchQuery({ baseUrl: urlBep20Floats, bridge: 'btc_bep20' }),
        ]);
        const { transactions: ethSwaps } = results[0];
        const { transactions: bscSwaps } = results[1];
        const { transactions: ethFloats } = results[2];
        const { transactions: bscFloats } = results[3];

        const ethTransactions = ethSwaps.concat(ethFloats);
        const bscTransactions = bscSwaps.concat(bscFloats);
        const transactions = ethTransactions
          .concat(bscTransactions)
          .sort((a, b) => b.timestamp - a.timestamp);
        setTxs(transactions);
        setTotal(transactions.length);
        return;
      }

      // Memo: `floats` only returns deposit txs. Withdraw txs are in `swaps` query.
      const txType = type ? type : 'swaps';

      if (bridge) {
        const baseUrl = `${bridge === 'btc_bep20' ? urlBsc : urlEth}/api/v1/${txType}/query`;
        const { transactions, total } = await fetchQuery({ baseUrl, bridge });
        setTxs(transactions);
        setTotal(total);
        return;
      }

      // Memo: default search
      const isMultiBridge = page === '0' && bridge === '';

      if (isMultiBridge) {
        const urlErc = `${urlEth}/api/v1/${txType}/query`;
        const urlBep20 = `${urlBsc}/api/v1/${txType}/query`;
        const results = await Promise.all([
          fetchQuery({ baseUrl: urlErc, bridge: 'btc_erc' }),
          fetchQuery({ baseUrl: urlBep20, bridge: 'btc_bep20' }),
        ]);
        const { transactions: ethTxs } = results[0];
        const { transactions: bscTxs } = results[1];
        const transactions = ethTxs.concat(bscTxs).sort((a, b) => b.timestamp - a.timestamp);
        setTxs(transactions);
        return;
      }
    } catch (error) {
      logger.error({ error });
    }
  }, [page, fetchQuery, type, bridge, hash, urlEth, urlBsc]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        await updateQuery();
      } catch (error) {
        logger.error({ error });
      } finally {
        if (!urlEth || !urlBsc) return;
        setIsLoading(false);
      }
    })();
    const interval = setInterval(() => {
      updateQuery();
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, [updateQuery, urlEth, urlBsc]);

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
