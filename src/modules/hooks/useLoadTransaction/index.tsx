import { Transaction, useTransactionDetailsQuery } from '../../../generated/graphql';
import { castGraphQlType } from '../../explorer';

export const useLoadTransaction = (hash: string) => {
  const { data, loading } = useTransactionDetailsQuery({
    variables: {
      id: hash,
    },
  });

  const tx = data && castGraphQlType(data.transaction as Transaction);

  return { tx, loading };
};
