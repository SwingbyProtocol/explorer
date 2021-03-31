import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import {
  Bridge,
  TransactionStatus,
  TransactionType,
  TransactionWhereInput,
  useTransactionsHistoryQuery,
} from '../../../generated/graphql';

export const useLoadHistories = () => {
  const explorer = useSelector((state) => state.explorer);
  const { isRejectedTx } = explorer;

  const { query } = useRouter();

  const { after: afterParam, before: beforeParam, q, type } = query;

  const PAGE_SIZE = 50;
  const after = typeof afterParam === 'string' ? afterParam : undefined;
  const before = typeof beforeParam === 'string' ? beforeParam : undefined;

  const txType = type === '' ? TransactionType.Swap : type;

  const getType = (type: TransactionType) => {
    switch (type) {
      case TransactionType.Deposit:
        return { equals: TransactionType.Deposit };

      case TransactionType.Withdrawal:
        return { equals: TransactionType.Withdrawal };

      default:
        return { equals: TransactionType.Swap };
    }
  };

  const getBridge = (queryBridge: Bridge): { in: Bridge[] } => {
    switch (queryBridge) {
      case Bridge.BtcBep20:
        return { in: [Bridge.BtcBep20] };
      case Bridge.BtcErc:
        return { in: [Bridge.BtcErc] };

      default:
        return { in: [Bridge.BtcBep20, Bridge.BtcErc] };
    }
  };

  const getStatus = (isRejectedTx: boolean) => {
    const {
      Pending,
      Signing,
      Sending,
      Completed,
      SigningRefund,
      SendingRefund,
      Refunded,
    } = TransactionStatus;
    return isRejectedTx
      ? { in: [Refunded, SigningRefund, SendingRefund] }
      : { in: [Completed, Sending, Pending, Signing] };
  };

  const filter = useMemo(() => {
    const baseFilter = {
      type: getType(txType as TransactionType),
      status: getStatus(isRejectedTx),
      bridge: getBridge(query.bridge as Bridge),
    };

    return q !== ''
      ? {
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
                    mode: 'insensitive',
                    equals: q,
                  },
                },
                {
                  receivingAddress: {
                    mode: 'insensitive',
                    equals: q,
                  },
                },
                {
                  depositTxHash: {
                    mode: 'insensitive',
                    equals: q,
                  },
                },
                {
                  receivingTxHash: {
                    mode: 'insensitive',
                    equals: q,
                  },
                },
              ],
            },
            baseFilter,
          ],
        }
      : baseFilter;
  }, [q, query.bridge, isRejectedTx, txType]);

  const { data, loading, fetchMore } = useTransactionsHistoryQuery({
    pollInterval: 10000,
    variables: {
      after,
      before,
      first: after ? PAGE_SIZE : !before ? PAGE_SIZE : undefined,
      last: before ? PAGE_SIZE : undefined,
      where: filter as TransactionWhereInput,
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
        where: filter as TransactionWhereInput,
      },
    });
  }, [data?.transactions.pageInfo.endCursor, fetchMore, filter]);

  return { data, loading, fetchMoreQuery };
};
