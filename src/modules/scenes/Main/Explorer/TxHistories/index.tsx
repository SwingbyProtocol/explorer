import { Dropdown, Text } from '@swingby-protocol/pulsar';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { CursorPagination } from '../../../../../components/CursorPagination';
import { Loader } from '../../../../../components/Loader';
import { TransactionType } from '../../../../../generated/graphql';
import { PAGE_COUNT, PATH, TXS_COUNT } from '../../../../env';
import { selectableBridge } from '../../../../explorer';
import { useLoadHistories } from '../../../../hooks';
import { toggleIsExistPreviousPage, toggleIsRejectedTx } from '../../../../store';

import { TxHistoriesItem } from './Item';
import {
  BrowserFooter,
  Filter,
  Left,
  NoResultsFound,
  Right,
  TextFee,
  TitleRow,
  TxHistoriesContainer,
} from './styled';

const ROW_HEIGHT = 90;

export const TxHistories = () => {
  const { push, query } = useRouter();

  const params = query;

  const q = String(params.q || '');
  const chainBridge = String(params.bridge || '');

  const goToDetail = (hash: string) => {
    push(`${chainBridge === 'floats' ? PATH.FLOAT : PATH.SWAP}/${hash}`);
    dispatch(toggleIsExistPreviousPage(true));
  };

  const routerPush = useCallback(
    (bridge: string, q: string): void => {
      // Memo: Shallow routing make URL faster update and page won't get replaced. Only the state of the route is changed.
      // Ref: https://nextjs.org/docs/routing/shallow-routing
      push(
        {
          pathname: '/',
          query: { bridge, q },
        },
        undefined,
        { shallow: true },
      );
    },
    [push],
  );

  const dispatch = useDispatch();
  const explorer = useSelector((state) => state.explorer);
  const { isRejectedTx } = explorer;

  const [filterTransaction, setFilterTransaction] = useState<TransactionType>(TransactionType.Swap);

  const { data, loading, goToNextPage, goToPreviousPage, totalCount } = useLoadHistories(
    filterTransaction,
  );

  const filter = (
    <Dropdown target={<Filter />}>
      {/* Memo: Just shows user the filter is hiding 'waiting' */}
      <Dropdown.Item selected={true} disabled={true}>
        <FormattedMessage id="home.recent-swaps.hide-waiting" />
      </Dropdown.Item>
      <Dropdown.Item
        selected={isRejectedTx}
        onClick={() => {
          routerPush(chainBridge, q);
          dispatch(toggleIsRejectedTx(!isRejectedTx));
        }}
      >
        <FormattedMessage id="home.recent-swaps.rejected-tx" />
      </Dropdown.Item>
      <Dropdown.Item
        selected={filterTransaction === TransactionType.Deposit}
        onClick={() => {
          if (filterTransaction === TransactionType.Deposit) {
            setFilterTransaction(TransactionType.Swap);
          } else {
            setFilterTransaction(TransactionType.Deposit);
          }
        }}
      >
        Float transactions
      </Dropdown.Item>
      {selectableBridge.map((chain) => {
        // const bridge = chain === selectableBridge.multipleBridges ? '' : chain.toLowerCase();
        return (
          <Dropdown.Item
            selected={chainBridge === chain.bridge}
            onClick={() => routerPush(chain.bridge, q)}
            key={chain.menu}
          >
            Bitcoin - {chain.menu}
          </Dropdown.Item>
        );
      })}
    </Dropdown>
  );

  const loader = (
    <Loader marginTop={100} minHeight={92 * TXS_COUNT} testId="main.loading-container" />
  );

  // Memo: To make `drop animation`. Migrate it later.
  const [adjustIndex, setAdjustIndex] = useState(0);
  const [previousTxTotal, setPreviousTxTotal] = useState(0);
  useEffect(() => {
    if (previousTxTotal === 0 && totalCount > 0) {
      setPreviousTxTotal(totalCount);
      setAdjustIndex(2);
    }
    if (previousTxTotal > 0) {
      setAdjustIndex(totalCount - previousTxTotal);
    }
  }, [adjustIndex, previousTxTotal, totalCount]);

  const noResultFound = (
    <NoResultsFound>
      <Text variant="title-s">
        <FormattedMessage id="home.no-results-found" />
      </Text>
      <Text variant="title-xs">
        <FormattedMessage id="home.try-different-tx" />
      </Text>
    </NoResultsFound>
  );

  return (
    <>
      <TxHistoriesContainer txsHeight={PAGE_COUNT * ROW_HEIGHT}>
        <TitleRow>
          <Left>
            <Text variant="section-title">
              <FormattedMessage id="home.recent-swaps.recent-swaps" />
            </Text>
          </Left>
          <Right isFloats={chainBridge === 'floats'}>
            <TextFee variant="section-title">
              {chainBridge === 'floats' ? (
                <FormattedMessage id="home.recent-swaps.fees-max" />
              ) : (
                <FormattedMessage id="home.recent-swaps.fees" />
              )}
            </TextFee>
            {filter}
          </Right>
        </TitleRow>
        {!!data && data.transactions.totalCount < 1 && noResultFound}
        {loading && loader}
        {data?.transactions.edges.map(({ node: tx }, i) => (
          <TxHistoriesItem key={tx.id} bgKey={i - adjustIndex} goToDetail={goToDetail} tx={tx} />
        ))}
      </TxHistoriesContainer>
      <BrowserFooter>
        <CursorPagination
          goToNextPage={goToNextPage}
          goToPreviousPage={goToPreviousPage}
          hasNextPage={data?.transactions.pageInfo.hasNextPage}
          hasPreviousPage={data?.transactions.pageInfo.hasPreviousPage}
        />
      </BrowserFooter>
    </>
  );
};
