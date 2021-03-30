import { Transaction, useTransactionHistoryQuery } from '../../../generated/graphql';
import { castGraphQlType } from '../../explorer';

export const useLoadTransaction = (hash: string) => {
  const { data, loading } = useTransactionHistoryQuery({
    variables: {
      id: hash,
    },
  });

  const tx = data && castGraphQlType(data.transaction as Transaction);

  return { tx, loading };
};
