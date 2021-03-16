import { Text } from '@swingby-protocol/pulsar';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';

import { CursorPagination } from '../../../../../components/CursorPagination';
import { useTransactionsHistoryQuery } from '../../../../../generated/graphql';
import { TTxRawObject } from '../../../../explorer';

import { BrowserFooter, Left, Right, TextFee, TitleRow, TxHistoriesContainer } from './styled';
import { TxHistoriesItem } from './Item';

interface Props {
  filter: JSX.Element;
  loader: JSX.Element;
  adjustIndex: number;
  page: number;
  maximumPage: number;
  bridge: string;
  isNoResult: boolean;
  isLoadingHistory: boolean;
  noResultFound: JSX.Element;
  currentTxs: TTxRawObject[];
  goNextPage: () => void;
  goBackPage: () => void;
  goToDetail: (arg: string) => void;
}

export const TxHistories = ({
  filter,
  page,
  currentTxs,
  bridge,
  goToDetail,
  loader,
  noResultFound,
  adjustIndex,
}: Props) => {
  const {
    push,
    query: { after: afterParam, before: beforeParam },
  } = useRouter();
  const after = typeof afterParam === 'string' ? afterParam : undefined;
  const before = typeof beforeParam === 'string' ? beforeParam : undefined;

  console.log('render TxHistories');

  const { data, loading, fetchMore } = useTransactionsHistoryQuery({
    variables: {
      after,
      before,
      first: after ? 25 : !before ? 25 : undefined,
      last: before ? 25 : undefined,
    },
  });

  const goToNextPage = useCallback(() => {
    const after = data?.transactions.pageInfo.endCursor;
    // fetchMore({ variables: { after, before: null } });
    push({ query: { after } }, null, { scroll: false, shallow: true });
  }, [data?.transactions.pageInfo.endCursor, fetchMore, push]);

  const goToPreviousPage = useCallback(() => {
    const before = data?.transactions.pageInfo.startCursor;
    // fetchMore({ variables: { before, after: null } });
    push({ query: { before } }, null, { scroll: false, shallow: true });
  }, [data?.transactions.pageInfo.startCursor, fetchMore, push]);

  const rowHeight = 90;
  const rowHeightWithTxs = currentTxs && currentTxs.length * rowHeight;

  return (
    <>
      <TxHistoriesContainer txsHeight={rowHeightWithTxs}>
        <TitleRow>
          <Left>
            <Text variant="section-title">
              <FormattedMessage id="home.recent-swaps.recent-swaps" />
            </Text>
          </Left>
          <Right isFloats={bridge === 'floats'}>
            <TextFee variant="section-title">
              {bridge === 'floats' ? (
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
