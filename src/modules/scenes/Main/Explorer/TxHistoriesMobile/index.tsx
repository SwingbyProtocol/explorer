import { Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';

import { Pagination } from '../../../../../components/Pagination';
import {
  capitalize,
  TxRowTransition,
  TxRowVariants,
  convertTxTime,
  currencyNetwork,
  statusColor,
  SwapRawObject,
} from '../../../../explorer';
import { selectSwapDetails } from '../../../../store';

import {
  AmountText,
  Bottom,
  BrowserFooter,
  Coin,
  Column,
  ColumnAmount,
  Detail,
  LabelText,
  Left,
  Right,
  Status,
  StatusCircle,
  StatusText,
  SwapHorizontal,
  Time,
  TitleRow,
  Top,
  TxHistoriesMobileContainer,
  TxHistoryRow,
} from './styled';

interface Props {
  filter: JSX.Element;
  loader: JSX.Element;
  adjustIndex: number;
  page: number;
  maximumPage: number;
  isNoResult: boolean;
  isLoadingHistory: boolean;
  currentTxs: SwapRawObject[];
  noResultFound: JSX.Element;
  goNextPage: () => void;
  goBackPage: () => void;
  goToDetail: (arg: string) => void;
}

export const TxHistoriesMobile = (props: Props) => {
  const {
    filter,
    page,
    maximumPage,
    currentTxs,
    goNextPage,
    goBackPage,
    goToDetail,
    loader,
    adjustIndex,
    isLoadingHistory,
    isNoResult,
    noResultFound,
  } = props;
  const dispatch = useDispatch();

  return (
    <>
      <TxHistoriesMobileContainer>
        <TitleRow>
          <Left>
            <Text variant="section-title">
              <FormattedMessage id="home.recentSwaps.recentSwaps" />
            </Text>
          </Left>
          <Right>{filter}</Right>
        </TitleRow>
        {isNoResult && noResultFound}
        {/* Memo: show loader */}
        {page > 1 ? !currentTxs.length && loader : isLoadingHistory && loader}
        {currentTxs &&
          currentTxs.map((tx: SwapRawObject, i: number) => {
            const bgKey = i - adjustIndex;
            return (
              <TxHistoryRow
                key={bgKey}
                bg={bgKey % 2 !== 0}
                onMouseEnter={() => dispatch(selectSwapDetails(tx))}
                onClick={() => goToDetail(tx.hash)}
                variants={TxRowVariants}
                transition={TxRowTransition}
                initial="initial"
                animate="in"
              >
                <Column>
                  <Status>
                    <StatusCircle variant={statusColor(tx.status)} />
                    <StatusText variant="accent">{capitalize(tx.status)}</StatusText>
                  </Status>
                  <Time>
                    <LabelText variant="label">{convertTxTime(tx.timestamp)}</LabelText>
                  </Time>
                </Column>

                <ColumnAmount>
                  <Coin symbol={tx.currencyIn} />
                  <div>
                    <Top>
                      <LabelText variant="label">{currencyNetwork(tx.currencyIn)}</LabelText>
                    </Top>
                    <Bottom>
                      <AmountText variant="accent">{tx.amountIn}</AmountText>
                    </Bottom>
                  </div>
                </ColumnAmount>
                <Column>
                  <SwapHorizontal />
                </Column>
                <ColumnAmount>
                  <Coin symbol={tx.currencyOut} />
                  <div>
                    <Top>
                      <LabelText variant="label">{currencyNetwork(tx.currencyOut)}</LabelText>
                    </Top>
                    <Bottom>
                      <AmountText variant="accent">{tx.amountOut}</AmountText>
                    </Bottom>
                  </div>
                </ColumnAmount>
                <Column>
                  <Detail />
                </Column>
              </TxHistoryRow>
            );
          })}
      </TxHistoriesMobileContainer>
      <BrowserFooter>
        <Pagination
          goNextPage={goNextPage}
          goBackPage={goBackPage}
          page={page}
          maximumPage={maximumPage}
        />
      </BrowserFooter>
    </>
  );
};
