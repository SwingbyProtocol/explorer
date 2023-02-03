import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

import {
  Bridge,
  Mode,
  StringFilterMode,
  TransactionStatus,
  TransactionType,
  TransactionWhereInput,
  useTransactionsHistoryQuery,
} from '../../../generated/graphql';
import { mode } from '../../env';

export const useLoadHistories = () => {
  const { query } = useRouter();

  const { after: afterParam, before: beforeParam, q, type, rejected } = query;

  const PAGE_SIZE = 50;
  const after = typeof afterParam === 'string' ? afterParam : undefined;
  const before = typeof beforeParam === 'string' ? beforeParam : undefined;
  const isRejected = rejected;

  const txType = type === '' ? TransactionType.Swap : type;

  const getType = (type: TransactionType | 'search') => {
    switch (type) {
      case TransactionType.Deposit:
        return { equals: TransactionType.Deposit };

      case TransactionType.Withdrawal:
        return { equals: TransactionType.Withdrawal };

      case 'search':
        return { in: [TransactionType.Swap, TransactionType.Deposit, TransactionType.Withdrawal] };

      default:
        return { equals: TransactionType.Swap };
    }
  };

  const getBridge = (queryBridge: Bridge): { in: Bridge[] } => {
    switch (queryBridge) {
      case Bridge.BtcSkypool:
        return { in: [Bridge.BtcSkypool] };

      default:
        return { in: [Bridge.BtcSkypool] };
    }
  };

  const getStatus = (isRejectedTx: string) => {
    const {
      Pending,
      Signing,
      Sending,
      Completed,
      SigningRefund,
      SendingRefund,
      Refunded,
    } = TransactionStatus;
    return isRejectedTx === 'true'
      ? { in: [Refunded, SigningRefund, SendingRefund] }
      : { in: [Completed, Sending, Pending, Signing] };
  };

  const filter = useMemo((): TransactionWhereInput => {
    const baseFilter = {
      type: getType(txType as TransactionType),
      status: getStatus(isRejected as string),
      bridge: getBridge(query.bridge as Bridge),
      mode: { equals: mode as Mode },
    };

    if (typeof q !== 'string' || !q) {
      return baseFilter;
    }

    return {
      AND: [
        {
          OR: [
            {
              id: {
                equals: q,
              },
            },
            {
              sendingAddress: {
                mode: StringFilterMode.Insensitive,
                equals: q,
              },
            },
            {
              receivingAddress: {
                mode: StringFilterMode.Insensitive,
                equals: q,
              },
            },
            {
              depositTxHash: {
                mode: StringFilterMode.Insensitive,
                equals: q,
              },
            },
            {
              receivingTxHash: {
                mode: StringFilterMode.Insensitive,
                equals: q,
              },
            },
          ],
        },
        baseFilter,
      ],
    };
  }, [q, query.bridge, isRejected, txType]);

  const { data, loading, fetchMore } = useTransactionsHistoryQuery({
    pollInterval: 10000,
    variables: {
      after,
      before,
      first: after ? PAGE_SIZE : !before ? PAGE_SIZE : undefined,
      last: before ? PAGE_SIZE : undefined,
      where: filter,
    },
  });

  const fetchMoreQuery = useCallback(() => {
    const after = data?.transactions.pageInfo.endCursor;
    return fetchMore({
      variables: {
        after,
        before: null,
        first: PAGE_SIZE,
        last: null,
        where: filter,
      },
    });
  }, [data?.transactions.pageInfo.endCursor, fetchMore, filter]);

  return { data, loading, fetchMoreQuery };
};
