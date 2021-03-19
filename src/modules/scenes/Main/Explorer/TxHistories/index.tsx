import { Text } from '@swingby-protocol/pulsar';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';

import { CursorPagination } from '../../../../../components/CursorPagination';
import { useTransactionsHistoryQuery } from '../../../../../generated/graphql';
import { TTxRawObject } from '../../../../explorer';

import { BrowserFooter, Left, Right, TextFee, TitleRow, TxHistoriesContainer } from './styled';
import { TxHistoriesItem } from './Item';

const PAGE_SIZE = 25;
const ROW_HEIGHT = 90;

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

  const { data, loading } = useTransactionsHistoryQuery({
    variables: {
      after,
      before,
      first: after ? PAGE_SIZE : !before ? PAGE_SIZE : undefined,
      last: before ? PAGE_SIZE : undefined,
    },
  });

  const goToNextPage = useCallback(() => {
    const after = data?.transactions.pageInfo.endCursor;
    push({ query: { after } }, null, { scroll: false, shallow: true });
  }, [data?.transactions.pageInfo.endCursor, push]);

  const goToPreviousPage = useCallback(() => {
    const before = data?.transactions.pageInfo.startCursor;
    push({ query: { before } }, null, { scroll: false, shallow: true });
  }, [data?.transactions.pageInfo.startCursor, push]);

  return (
    <>
      <TxHistoriesContainer txsHeight={currentTxs && currentTxs.length * ROW_HEIGHT}>
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
