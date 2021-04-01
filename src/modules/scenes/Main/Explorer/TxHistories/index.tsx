import { Dropdown, Text } from '@swingby-protocol/pulsar';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

import { LinkToWidgetModal } from '../../../../../components/LinkToWidgetModal';
import { Loader } from '../../../../../components/Loader';
import { Bridge, Transaction, TransactionType } from '../../../../../generated/graphql';
import { isEnableBscSupport, TXS_COUNT } from '../../../../env';
import {
  castGraphQlType,
  ISwapQueryPrams,
  selectableBridge,
  selectableTxType,
} from '../../../../explorer';
import { useLinkToWidget, useLoadHistories } from '../../../../hooks';

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
  const rejected = String(params.rejected || '');

  const routerPush = useCallback(
    (params: ISwapQueryPrams): void => {
      const { bridge, type, rejected, q } = params;

      // Memo: Shallow routing make URL faster update and page won't get replaced. Only the state of the route is changed.
      // Ref: https://nextjs.org/docs/routing/shallow-routing
      push(
        {
          pathname: '/',
          query: { bridge, type, rejected, q },
        },
        undefined,
        { shallow: true, scroll: false },
      );
    },
    [push],
  );

  const { data, loading, fetchMoreQuery } = useLoadHistories();

  const statusFilter = (
    <>
      {/* Memo: Just shows user the filter is hiding 'waiting' */}
      <Dropdown.Item selected={true} disabled={true}>
        <FormattedMessage id="home.recent-swaps.filter.hide-waiting" />
      </Dropdown.Item>
      <Dropdown.Item
        selected={rejected === 'true'}
        onClick={() => {
          rejected === 'true'
            ? routerPush({ bridge: chainBridge, q, type, rejected: 'false' })
            : routerPush({ bridge: chainBridge, q, type, rejected: 'true' });
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
              routerPush({ bridge: chainBridge, type: txType.type, q, rejected });
            }}
            key={txType.type}
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
            onClick={() => routerPush({ bridge: chain.bridge, type, q, rejected })}
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

  // Memo: 1: Close the modal, More than 1: Open the modal
  const [toggleOpenLink, setToggleOpenLink] = useState<number>(1);
  const [txDetail, setTxDetail] = useState(null);
  const oldTxType = useMemo(() => txDetail && castGraphQlType(txDetail as Transaction), [txDetail]);
  const { isClaimWidgetModalOpen, setIsClaimWidgetModalOpen } = useLinkToWidget({
    toggleOpenLink,
    tx: oldTxType,
    action: 'claim',
    setToggleOpenLink,
  });
  const isFloatTx = type === TransactionType.Deposit || type === TransactionType.Withdrawal;

  return (
    <>
      <LinkToWidgetModal
        isWidgetModalOpen={isClaimWidgetModalOpen}
        setIsWidgetModalOpen={setIsClaimWidgetModalOpen}
        setToggleOpenLink={setToggleOpenLink}
        tx={oldTxType}
      />
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
                    return (
                      <TxHistoriesItem
                        key={tx.id}
                        bgKey={index}
                        tx={tx}
                        style={style}
                        toggleOpenLink={toggleOpenLink}
                        setToggleOpenLink={setToggleOpenLink}
                        setTxDetail={setTxDetail}
                      />
                    );
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
