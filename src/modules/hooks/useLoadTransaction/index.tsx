import { DateTime } from 'luxon';

import { useTransactionsHistoryQuery } from '../../../generated/graphql';

export const useLoadTransaction = (hash: string) => {
  const where = { id: hash };

  const { data, loading } = useTransactionsHistoryQuery({
    variables: {
      where,
    },
  });
  const txData = data && data.transactions.edges[0].node;

  const tx = txData && {
    addressIn: txData.depositAddress,
    addressOut: txData.receivingAddress,
    amountIn: txData.depositAmount,
    amountOut: txData.receivingAmount,
    currencyIn: txData.depositCurrency,
    currencyOut: txData.receivingCurrency,
    fee: txData.feeTotal,
    hash: txData.id,
    feeCurrency: txData.feeCurrency,
    status: txData.status,
    timestamp: DateTime.fromISO(txData.at).toSeconds(),
    txIdIn: txData.depositTxHash,
    txIdOut: txData.receivingTxHash,
  };

  return { tx, loading };
};
