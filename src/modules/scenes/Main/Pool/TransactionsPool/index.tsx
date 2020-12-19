import { Text } from '@swingby-protocol/pulsar';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { Loader } from '../../../../../components/Loader';
import { Pagination } from '../../../../../components/Pagination';
import { TXS_COUNT, URL_ETHERSCAN } from '../../../../env';
import { convertTxTime, toBTC } from '../../../../explorer';
import { fetchRecentTransaction, IRecentTx } from '../../../../pool';
import { getRecentTxs } from '../../../../store';

import { initialTxsData } from './initialData';
import {
  AddressA,
  PaginationRow,
  Row,
  TextAmount,
  TitleText,
  TransactionsContainer,
  TransactionsPoolContainer,
} from './styled';

export const TransactionsPool = () => {
  const dispatch = useDispatch();
  const pool = useSelector((state) => state.pool);
  const { recentTxs, userAddress } = pool;

  const txsData = userAddress ? recentTxs : initialTxsData;
  const [page, setPage] = useState(1);
  const goBackPage = async () => {
    setPage(page - 1);
    const histories = await fetchRecentTransaction(userAddress, page - 1, recentTxs);
    dispatch(getRecentTxs(histories));
  };
  const goNextPage = async () => {
    setPage(page + 1);
    const histories = await fetchRecentTransaction(userAddress, page + 1, recentTxs);
    dispatch(getRecentTxs(histories));
  };
  const maximumPage = recentTxs && Math.ceil(recentTxs.total / TXS_COUNT);

  useEffect(() => {
    (async () => {
      if (userAddress) {
        const histories = await fetchRecentTransaction(userAddress, 1, null);
        dispatch(getRecentTxs(histories));
      }
    })();
  }, [userAddress, dispatch]);

  return (
    <TransactionsPoolContainer>
      <TitleText variant="accent">
        <FormattedMessage id="pool.transactions" />
      </TitleText>
      {!txsData && <Loader minHeight={73 * TXS_COUNT} />}
      <TransactionsContainer>
        {txsData &&
          txsData.data[page] &&
          txsData.data[page].map((data: IRecentTx, i: number) => {
            const value = toBTC(data.value);
            const time = convertTxTime(data.timeStamp);
            return (
              <Row key={i}>
                <Text variant="label">{time}</Text>

                <AddressA
                  href={`${URL_ETHERSCAN}/tx/${data.hash}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {data.hash}
                </AddressA>
                <TextAmount variant="accent">{value}</TextAmount>
              </Row>
            );
          })}
        <PaginationRow>
          <Pagination
            goNextPage={goNextPage}
            goBackPage={goBackPage}
            page={page}
            maximumPage={maximumPage}
          />
        </PaginationRow>
      </TransactionsContainer>
    </TransactionsPoolContainer>
  );
};
