import { Dropdown, Text } from '@swingby-protocol/pulsar';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

import { Loader } from '../../../../../components/Loader';
import { Bridge, TransactionType } from '../../../../../generated/graphql';
import { isEnableBscSupport, TXS_COUNT } from '../../../../env';
import { ISwapQueryPrams, selectableBridge, selectableTxType } from '../../../../explorer';
import { useLoadHistories } from '../../../../hooks';
import { toggleIsRejectedTx } from '../../../../store';

import { TxHistoriesItem } from './Item';
import {
  Filter,
  Left,
  NoResultsFound,
  Right,
  TextFee,
  TitleRow,
  TxHistoriesContainer,
} from './styled';

const ROW_HEIGHT = 90;
const TABLE_ROW_COUNT = 10;

export const TxHistories = () => {
  const { push, query } = useRouter();

  const params = query;

  const q = String(params.q || '');
  const chainBridge = String(params.bridge || '') as Bridge;
  const type = String(params.type || '') as TransactionType;

  const routerPush = useCallback(
    (params: ISwapQueryPrams): void => {
      const { bridge, type, q } = params;

      // Memo: Shallow routing make URL faster update and page won't get replaced. Only the state of the route is changed.
      // Ref: https://nextjs.org/docs/routing/shallow-routing
      push(
        {
          pathname: '/',
          query: { bridge, type, q },
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

  const { data, loading, fetchMoreQuery } = useLoadHistories();

  const statusFilter = (
    <>
      {/* Memo: Just shows user the filter is hiding 'waiting' */}
      <Dropdown.Item selected={true} disabled={true}>
        <FormattedMessage id="home.recent-swaps.filter.hide-waiting" />
      </Dropdown.Item>
      <Dropdown.Item
        selected={isRejectedTx}
        onClick={() => {
          routerPush({ bridge: chainBridge, q, type });
          dispatch(toggleIsRejectedTx(!isRejectedTx));
        }}
      >
        <FormattedMessage id="home.recent-swaps.filter.rejected-tx" />
      </Dropdown.Item>
    </>
  );

  const txTypeFilter = (
    <>
      {selectableTxType.map((txType) => {
        return (
          <Dropdown.Item
            selected={type === txType.type}
            onClick={() => {
              routerPush({ bridge: chainBridge, type: txType.type, q });
            }}
          >
            <FormattedMessage id={txType.menu} />
          </Dropdown.Item>
        );
      })}
    </>
  );

  const selectableBridgeFilter = (
    <>
      {selectableBridge.map((chain) => {
        return (
          <Dropdown.Item
            selected={chainBridge === chain.bridge}
            onClick={() => routerPush({ bridge: chain.bridge, type, q })}
            key={chain.menu}
            disabled={!isEnableBscSupport && chain.menu === 'BSC'}
          >
            <FormattedMessage
              id="home.recent-swaps.filter-bridge"
              values={{ bridge: chain.menu }}
            />
          </Dropdown.Item>
        );
      })}
    </>
  );

  const filter = (
    <Dropdown target={<Filter />}>
      {selectableBridgeFilter}
      <Dropdown.Divider />
      {txTypeFilter}
      <Dropdown.Divider />
      {statusFilter}
    </Dropdown>
  );

  const loader = (
    <Loader marginTop={100} minHeight={92 * TXS_COUNT} testId="main.loading-container" />
  );

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

  const isFloatTx = type === TransactionType.Deposit || type === TransactionType.Withdrawal;

  return (
    <>
      <TxHistoriesContainer txsHeight={TABLE_ROW_COUNT * ROW_HEIGHT}>
        <TitleRow>
          <Left>
            <Text variant="section-title">
              <FormattedMessage id="home.recent-swaps.recent-swaps" />
            </Text>
          </Left>
          <Right isFloats={isFloatTx}>
            <TextFee variant="section-title">
              {isFloatTx ? (
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

        <AutoSizer disableHeight>
          {({ width }) => (
            <InfiniteLoader
              itemCount={data?.transactions.totalCount ?? Infinity}
              isItemLoaded={(index: number) =>
                !!data?.transactions.edges[index] || !data?.transactions.pageInfo.hasNextPage
              }
              loadMoreItems={fetchMoreQuery}
            >
              {({ onItemsRendered, ref }) => (
                <List
                  initialScrollOffset={0}
                  onItemsRendered={onItemsRendered}
                  ref={ref}
                  height={ROW_HEIGHT * TABLE_ROW_COUNT}
                  width={width}
                  itemCount={data?.transactions.edges.length ?? 0}
                  itemSize={ROW_HEIGHT}
                  itemKey={(index: number) => data?.transactions.edges[index].node.id}
                >
                  {({ index, style }) => {
                    const tx = data.transactions.edges[index].node;
                    return <TxHistoriesItem key={tx.id} bgKey={index} tx={tx} style={style} />;
                  }}
                </List>
              )}
            </InfiniteLoader>
          )}
        </AutoSizer>
      </TxHistoriesContainer>
    </>
  );
};
