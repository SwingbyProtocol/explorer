import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import {
  TransactionStatus,
  TransactionType,
  useTransactionsHistoryQuery,
} from '../../../generated/graphql';
import { PAGE_COUNT } from '../../env/';

export const useLoadHistories = (filterTransactionType: TransactionType) => {
  const explorer = useSelector((state) => state.explorer);
  const { isRejectedTx } = explorer;

  const { query, push } = useRouter();

  const { after: afterParam, before: beforeParam } = query;

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
    ? [Refunded, SigningRefund, SendingRefund]
    : [Completed, Sending, Pending, Signing, Waiting];

  const getType = (filterTransactionType: TransactionType) => {
    const type = Object.values(TransactionType).filter(
      (it: TransactionType) => it === filterTransactionType,
    );

    switch (filterTransactionType) {
      case TransactionType.Deposit:
        return [TransactionType.Deposit, TransactionType.Withdrawal];

      default:
        return type;
    }
  };

  const filter = {
    type: getType(filterTransactionType),
    status,
  };

  const { data, loading } = useTransactionsHistoryQuery({
    pollInterval: 10000,
    variables: {
      after,
      before,
      first: after ? PAGE_COUNT : !before ? PAGE_COUNT : undefined,
      last: before ? PAGE_COUNT : undefined,
      where: filter,
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
