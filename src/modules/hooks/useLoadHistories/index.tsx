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
import { PAGE_COUNT } from '../../env/';

export const useLoadHistories = (filterTransactionType: TransactionType) => {
  const explorer = useSelector((state) => state.explorer);
  const { isRejectedTx } = explorer;

  const { query, push } = useRouter();

  const { after: afterParam, before: beforeParam, q } = query;

  const after = typeof afterParam === 'string' ? afterParam : undefined;
  const before = typeof beforeParam === 'string' ? beforeParam : undefined;

  const {
    Pending,
    Signing,
    Sending,
    Completed,
    SigningRefund,
    SendingRefund,
    Refunded,
  } = TransactionStatus;

  const status = useMemo(
    () =>
      isRejectedTx
        ? { in: [Refunded, SigningRefund, SendingRefund] }
        : { in: [Completed, Sending, Pending, Signing] },
    [Refunded, SigningRefund, SendingRefund, Completed, Sending, Pending, Signing, isRejectedTx],
  );

  const getType = (filterTransactionType: TransactionType) => {
    switch (filterTransactionType) {
      case TransactionType.Deposit:
        return { in: [TransactionType.Deposit, TransactionType.Withdrawal] };

      default:
        return { in: [TransactionType.Swap] };
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

  const basicFilter = useMemo(
    () => ({
      type: getType(filterTransactionType),
      status,
      bridge: getBridge(query.bridge as Bridge),
    }),
    [filterTransactionType, query.bridge, status],
  );

  const filter = useMemo(
    () =>
      q !== ''
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
                    depositAddress: {
                      equals: q,
                    },
                  },
                  {
                    receivingAddress: {
                      equals: q,
                    },
                  },
                  {
                    depositTxHash: {
                      equals: q,
                    },
                  },
                  {
                    receivingTxHash: {
                      equals: q,
                    },
                  },
                ],
              },
              basicFilter,
            ],
          }
        : basicFilter,
    [basicFilter, q],
  );

  const { data, loading, fetchMore } = useTransactionsHistoryQuery({
    pollInterval: 10000,
    variables: {
      after,
      before,
      first: PAGE_COUNT,
      last: before ? PAGE_COUNT : undefined,
      where: filter as TransactionWhereInput,
    },
  });

  const goToNextPage = useCallback(
    (after: string) => {
      // const after = data?.transactions.pageInfo.endCursor;
      fetchMore &&
        fetchMore({
          variables: {
            after,
            before,
            first: after ? PAGE_COUNT : !before ? PAGE_COUNT : undefined,
            last: before ? PAGE_COUNT : undefined,
            where: filter as TransactionWhereInput,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            fetchMoreResult.transactions.edges = [
              ...prev.transactions.edges,
              ...fetchMoreResult.transactions.edges,
            ];
            return fetchMoreResult;
          },
        });
    },
    [before, fetchMore, filter],
  );

  const goToPreviousPage = useCallback(() => {
    const before = data?.transactions.pageInfo.startCursor;
    push({ query: { before } }, null, { scroll: false, shallow: true });
  }, [data?.transactions.pageInfo.startCursor, push]);

  const totalCount = data && data.transactions.totalCount;

  return { data, loading, goToNextPage, goToPreviousPage, totalCount };
};
