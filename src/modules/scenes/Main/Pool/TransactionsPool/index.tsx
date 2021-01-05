import { Text } from '@swingby-protocol/pulsar';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { Loader } from '../../../../../components/Loader';
import { Pagination } from '../../../../../components/Pagination';
import { TXS_COUNT, URL_ETHERSCAN } from '../../../../env';
import { convertTxTime, toBTC } from '../../../../explorer';
import { fetchRecentTransaction, IRecentTx, PoolMode } from '../../../../pool';
import { getRecentTxs, togglePoolMode } from '../../../../store';
import { TextBlock } from '../../../Common';

import { initialTxsData } from './initialData';
import {
  AddressA,
  NoTransaction,
  Row,
  TextAddLiquidity,
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
      {!txsData && (
        <TransactionsContainer>
          <Loader minHeight={80} />
        </TransactionsContainer>
      )}
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
        {txsData && txsData.data[page].length > 0 && (
          <Pagination
            goNextPage={goNextPage}
            goBackPage={goBackPage}
            page={page}
            maximumPage={maximumPage}
            isSimple={false}
          />
        )}
      </TransactionsContainer>
      {txsData && !txsData.data[page].length && (
        <NoTransaction>
          <TextBlock variant="title-xs">
            <FormattedMessage id="pool.noTransaction" />
          </TextBlock>
          <div>
            <Text variant="title-xs">
              <FormattedMessage id="pool.noTransaction.startWith" />
            </Text>
            <TextAddLiquidity
              variant="title-xs"
              onClick={() => dispatch(togglePoolMode(PoolMode.AddLiquidity))}
            >
              <FormattedMessage id="pool.noTransaction.addLiquidity" />
            </TextAddLiquidity>
            <Text variant="title-xs">
              <FormattedMessage id="pool.noTransaction.first" />
            </Text>
          </div>
        </NoTransaction>
      )}
    </TransactionsPoolContainer>
  );
};
