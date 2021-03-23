import { Dropdown, Text } from '@swingby-protocol/pulsar';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { CursorPagination } from '../../../../../components/CursorPagination';
import { TransactionType } from '../../../../../generated/graphql';
import { PAGE_COUNT, PATH } from '../../../../env';
import { BRIDGE } from '../../../../explorer';
import { useLoadHistories } from '../../../../hooks';
import { toggleIsExistPreviousPage, toggleIsRejectedTx } from '../../../../store';

import { TxHistoriesItem } from './Item';
import {
  BrowserFooter,
  Left,
  Right,
  TextFee,
  TitleRow,
  TxHistoriesContainer,
  Filter,
} from './styled';

const ROW_HEIGHT = 90;

interface Props {
  loader: JSX.Element;
  adjustIndex: number;
  noResultFound: JSX.Element;
}

export const TxHistories = ({ loader, noResultFound, adjustIndex }: Props) => {
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

  const { data, loading, goToNextPage, goToPreviousPage } = useLoadHistories(filterTransaction);

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
      {Object.values(BRIDGE).map((chain: string) => {
        const bridge = chain === BRIDGE.ethereum ? '' : chain.toLowerCase();
        return (
          <Dropdown.Item
            selected={chainBridge === bridge}
            onClick={() => chain === BRIDGE.ethereum && routerPush(bridge, q)}
            key={chain}
            disabled={chain !== BRIDGE.ethereum}
          >
            Bitcoin - {chain}
          </Dropdown.Item>
        );
      })}
    </Dropdown>
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
