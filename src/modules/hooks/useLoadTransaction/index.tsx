import { Transaction, useTransactionsHistoryQuery } from '../../../generated/graphql';
import { castGraphQlType } from '../../explorer';
export const useLoadTransaction = (hash: string) => {
  const where = { id: { equals: hash } };

  const { data, loading } = useTransactionsHistoryQuery({
    variables: {
      where,
    },
  });

  const txData = data && hash && data.transactions.edges[0].node;
  const tx = txData && castGraphQlType(txData as Transaction);

  return { tx, loading };
};
