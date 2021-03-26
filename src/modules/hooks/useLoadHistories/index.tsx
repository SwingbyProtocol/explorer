import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import {
  TransactionStatus,
  TransactionType,
  useTransactionsHistoryQuery,
  Bridge,
  TransactionWhereInput,
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
    Waiting,
    Refunded,
  } = TransactionStatus;

  const status = isRejectedTx
    ? { in: [Refunded, SigningRefund, SendingRefund] }
    : { in: [Completed, Sending, Pending, Signing, Waiting] };

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

  const basicFilter = {
    type: getType(filterTransactionType),
    status,
    bridge: getBridge(query.bridge as Bridge),
  };

  const filter =
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
      : basicFilter;

  const { data, loading } = useTransactionsHistoryQuery({
    pollInterval: 10000,
    variables: {
      after,
      before,
      first: after ? PAGE_COUNT : !before ? PAGE_COUNT : undefined,
      last: before ? PAGE_COUNT : undefined,
      where: filter as TransactionWhereInput,
    },
  });

  const totalCount = data && data.transactions.totalCount;

  const goToNextPage = useCallback(() => {
    const after = data?.transactions.pageInfo.endCursor;
    push({ query: { after } }, null, { scroll: false, shallow: true });
  }, [data?.transactions.pageInfo.endCursor, push]);

  const goToPreviousPage = useCallback(() => {
    const before = data?.transactions.pageInfo.startCursor;
    push({ query: { before } }, null, { scroll: false, shallow: true });
  }, [data?.transactions.pageInfo.startCursor, push]);

  return { data, loading, goToNextPage, goToPreviousPage, totalCount };
};
