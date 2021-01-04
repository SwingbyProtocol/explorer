import { Dropdown, getCryptoAssetFormatter, Text } from '@swingby-protocol/pulsar';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { Pagination } from '../../../../../components/Pagination';
import { PATH } from '../../../../env';
import {
  capitalize,
  convertTxTime,
  currencyNetwork,
  getBorderColor,
  statusColor,
  TSwapWidget,
  TTxRawObject,
  TxRowTransition,
  TxRowVariants,
} from '../../../../explorer';
import { selectSwapDetails } from '../../../../store';
import { transactionDetailByTxId } from '../../../../swap';

import {
  AddressP,
  AmountSpan,
  Bottom,
  BrowserFooter,
  Coin,
  Column,
  ColumnAmount,
  ColumnEllipsis,
  ColumnFee,
  Ellipsis,
  Left,
  Right,
  Status,
  StatusCircle,
  StatusText,
  SwapHorizontal,
  TextFee,
  TitleRow,
  Top,
  TxHistoriesContainer,
  TxHistoryRow,
} from './styled';

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
  linkToSwapWidget: (tx: TTxRawObject, action: TSwapWidget) => void;
}

export const TxHistories = (props: Props) => {
  const {
    filter,
    maximumPage,
    page,
    currentTxs,
    goNextPage,
    bridge,
    goBackPage,
    goToDetail,
    loader,
    linkToSwapWidget,
    isNoResult,
    isLoadingHistory,
    noResultFound,
    adjustIndex,
  } = props;

  const { locale } = useIntl();

  const dispatch = useDispatch();
  const [chosenTx, setChosenTx] = useState(null);
  const [toggleOpenLink, setToggleOpenLink] = useState(1);
  const router = useRouter();
  const explorer = useSelector((state) => state.explorer);
  const { themeMode } = explorer;

  useEffect(() => {
    if (chosenTx) {
      linkToSwapWidget(chosenTx, 'claim');
    }
  }, [chosenTx, toggleOpenLink, linkToSwapWidget]);

  const externalLinkMenu = (tx: TTxRawObject) => (
    <>
      <Dropdown.Item
        onClick={() => {
          setChosenTx(tx);
          setToggleOpenLink(toggleOpenLink + 1);
        }}
      >
        <p>
          <FormattedMessage id="home.recentSwaps.checkSwapProgress" />
        </p>
      </Dropdown.Item>
      {tx.txIdOut && (
        <Dropdown.Item
          onClick={() =>
            window.open(transactionDetailByTxId(tx.currencyOut, tx.txIdOut), '_blank', 'noopener')
          }
        >
          <p>
            <FormattedMessage id="home.recentSwaps.getTxDetails" />
          </p>
        </Dropdown.Item>
      )}
    </>
  );

  // Memo: px for row height
  const rowHeight = 90;
  const rowHeightWithTxs = currentTxs && currentTxs.length * rowHeight;

  return (
    <>
      <TxHistoriesContainer txsHeight={rowHeightWithTxs}>
        <TitleRow>
          <Left>
            <Text variant="section-title">
              <FormattedMessage id="home.recentSwaps.recentSwaps" />
            </Text>
          </Left>
          <Right isFloats={bridge === 'floats'}>
            <TextFee variant="section-title">
              {bridge === 'floats' ? (
                <FormattedMessage id="home.recentSwaps.feesMax" />
              ) : (
                <FormattedMessage id="home.recentSwaps.fees" />
              )}
            </TextFee>
            {filter}
          </Right>
        </TitleRow>
        {router.query.q && isNoResult && noResultFound}
        {/* Memo: show loader */}
        {page > 1 ? !currentTxs.length && loader : isLoadingHistory && loader}
        {currentTxs &&
          currentTxs.map((tx: TTxRawObject, i: number) => {
            const bgKey = i - adjustIndex;
            const borderColor = getBorderColor(tx.status, themeMode);
            return (
              <TxHistoryRow
                key={bgKey}
                bg={bgKey % 2 !== 0}
                borderColor={borderColor}
                onMouseEnter={() => {
                  // dispatch(selectSwapDetails(tx));
                  router.prefetch(`${PATH.SWAP}/${tx.hash}`);
                }}
                onClick={() => goToDetail(tx.hash)}
                variants={page === 1 && TxRowVariants}
                transition={page === 1 && TxRowTransition}
                initial={page === 1 ? 'initial' : null}
                animate={page === 1 ? 'in' : null}
              >
                <Column>
                  <Status>
                    <StatusCircle variant={statusColor(tx.status)} />
                    <StatusText variant="accent">{capitalize(tx.status)}</StatusText>
                  </Status>
                  <Bottom>
                    <Text variant="label">{convertTxTime(tx.timestamp)}</Text>
                  </Bottom>
                </Column>
                <Column>
                  <Top>
                    <Text variant="label">
                      <FormattedMessage id="common.from" />
                    </Text>
                  </Top>
                  <Bottom>
                    <Text variant="label">
                      <FormattedMessage id="common.to" />
                    </Text>
                  </Bottom>
                </Column>
                <Column>
                  <Top>
                    <AddressP>{tx.addressIn}</AddressP>
                  </Top>
                  <Bottom>
                    <AddressP>{tx.addressOut}</AddressP>
                  </Bottom>
                </Column>
                <ColumnAmount>
                  <Coin symbol={tx.currencyIn} />
                  <div>
                    <Top>
                      <Text variant="label">{currencyNetwork(tx.currencyIn)}</Text>
                    </Top>
                    <Bottom>
                      <AmountSpan variant="accent">{tx.amountIn}</AmountSpan>
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
                      <Text variant="label">{currencyNetwork(tx.currencyOut)}</Text>
                    </Top>
                    <Bottom>
                      <AmountSpan variant="accent">{tx.amountOut}</AmountSpan>
                    </Bottom>
                  </div>
                </ColumnAmount>
                <ColumnFee>
                  <Text variant="section-title">
                    {getCryptoAssetFormatter({
                      locale: locale,
                      displaySymbol: tx.feeCurrency,
                    }).format(Number(tx.fee))}
                  </Text>
                </ColumnFee>
                <ColumnEllipsis
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  <Dropdown target={<Ellipsis />} data-testid="dropdown">
                    {externalLinkMenu(tx)}
                  </Dropdown>
                </ColumnEllipsis>
              </TxHistoryRow>
            );
          })}
      </TxHistoriesContainer>
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
