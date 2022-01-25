import { Dropdown, Text } from '@swingby-protocol/pulsar';
import { SkybridgeBridge } from '@swingby-protocol/sdk';
import { createWidget, openPopup } from '@swingby-protocol/widget';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { scroller } from 'react-scroll';

import { LinkToWidgetModal } from '../../../../../components/LinkToWidgetModal';
import { Loader } from '../../../../../components/Loader';
import { Pagination } from '../../../../../components/Pagination';
import { useAffiliateCode } from '../../../../affiliate-code';
import { mode, PAGE_COUNT, TXS_COUNT } from '../../../../env';
import {
  ISwapQueryPrams,
  selectableBridge,
  selectableTxType,
  SkyPoolsQuery,
} from '../../../../explorer';
import { useLinkToWidget, useTxsQuery } from '../../../../hooks';
import { useThemeSettings } from '../../../../store/settings';
import { ButtonScaleNarrow } from '../../../Common';

import { TxHistoriesItem } from './Item';
import {
  BrowserFooter,
  Buttons,
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
  const { push, locale } = useRouter();
  const [themeMode] = useThemeSettings();
  const affiliateCode = useAffiliateCode();
  const { txs, isLoading, page, bridge, type, rejected, q, total } = useTxsQuery();
  const chainBridge = bridge ? (bridge as SkybridgeBridge) : 'btc_erc';

  const scrollUp = () => {
    scroller.scrollTo('recent-swaps', {
      duration: page === 1 ? 1000 : 700,
      delay: 0,
      offset: -120,
      smooth: 'linear',
      to: 'recent-swaps',
    });
  };

  const routerPush = useCallback(
    (params: ISwapQueryPrams): void => {
      const { bridge, type, rejected, q, page } = params;
      // Memo: Shallow routing make URL faster update and page won't get replaced. Only the state of the route is changed.
      // Ref: https://nextjs.org/docs/routing/shallow-routing
      push(
        {
          pathname: '/',
          query: { bridge, type, rejected, q, page },
        },
        undefined,
        { shallow: true, scroll: false },
      );
    },
    [push],
  );

  const goNextPage = () =>
    routerPush({
      bridge: chainBridge ? chainBridge : 'btc_erc',
      q,
      page: page + 1,
      type,
      rejected: rejected ? 'true' : 'false',
    });

  const goBackPage = () => {
    if (page === 0) return;
    routerPush({
      bridge: chainBridge ? chainBridge : 'btc_erc',
      q,
      page: page - 1,
      type,
      rejected: rejected ? 'true' : 'false',
    });
  };

  const statusFilter = (
    <>
      {/* Memo: Just shows user the filter is hiding 'waiting' */}
      <Dropdown.Item selected={true} disabled={true}>
        <FormattedMessage id="home.recent-swaps.filter.hide-waiting" />
      </Dropdown.Item>
      <Dropdown.Item
        selected={rejected}
        onClick={() => {
          rejected
            ? routerPush({ bridge: chainBridge, q, type, rejected: 'false', page: 0 })
            : routerPush({ bridge: chainBridge, q, type, rejected: 'true', page: 0 });
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
              routerPush({
                bridge: chainBridge,
                type: txType.type,
                q,
                rejected: String(rejected),
                page: 0,
              });
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
            selected={bridge === chain.bridge}
            onClick={() =>
              routerPush({
                bridge: chain.bridge as SkybridgeBridge,
                type,
                q,
                rejected: String(rejected),
                page: 0,
              })
            }
            key={chain.menu}
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
  const [txDetail, setTxDetail] = useState<SkyPoolsQuery | null>(null);

  const { isClaimWidgetModalOpen, setIsClaimWidgetModalOpen } = useLinkToWidget({
    toggleOpenLink,
    tx: txDetail,
    action: 'claim',
    setToggleOpenLink,
  });

  const isFloatTx = type === 'floats';

  const widget = createWidget({
    resource: 'swap',
    mode,
    size: 'big',
    theme: themeMode,
    locale,
    affiliateCode,
  });

  return (
    <>
      <LinkToWidgetModal
        isWidgetModalOpen={isClaimWidgetModalOpen}
        setIsWidgetModalOpen={setIsClaimWidgetModalOpen}
        setToggleOpenLink={setToggleOpenLink}
        tx={txDetail}
      />
      <TxHistoriesContainer txsHeight={txs?.length * ROW_HEIGHT} id="recent-swaps">
        <TitleRow>
          <Left>
            <Text variant="section-title">
              <FormattedMessage id="home.recent-swaps.recent-swaps" />
            </Text>
            <Buttons>
              <ButtonScaleNarrow
                variant="tertiary"
                size="street"
                shape="fill"
                onClick={() => openPopup({ widget })}
              >
                <FormattedMessage id="home.recent-swaps.new-swap" />
              </ButtonScaleNarrow>
            </Buttons>
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
        {!isLoading && !txs && noResultFound}
        {isLoading && loader}

        {!isLoading &&
          txs &&
          txs.map((tx, index) => (
            <TxHistoriesItem
              key={tx.hash}
              bgKey={index}
              tx={tx}
              toggleOpenLink={toggleOpenLink}
              setToggleOpenLink={setToggleOpenLink}
              setTxDetail={setTxDetail}
            />
          ))}
      </TxHistoriesContainer>
      <BrowserFooter>
        <Pagination
          goNextPage={() => {
            scrollUp();
            goNextPage();
          }}
          goBackPage={() => {
            scrollUp();
            goBackPage();
          }}
          page={page + 1}
          maximumPage={Math.floor(total / PAGE_COUNT)}
          isSimple={true}
        />
      </BrowserFooter>
    </>
  );
};
