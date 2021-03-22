import { Text } from '@swingby-protocol/pulsar';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { Loader } from '../../../../../components/Loader';
import { TXS_COUNT } from '../../../../env';
import { fetchFloatBalances, fetchStatsInfo } from '../../../../explorer';
import { updateNetworkInfos } from '../../../../store';
import { ExplorerInfos } from '../ExplorerInfos';
import { NetworkBridges } from '../NetworkBridges';
import { SwapVolume } from '../SwapVolume';
import { TxHistories } from '../TxHistories';

import { Bottom, BrowserContainer, BrowserDiv, NoResultsFound, Top } from './styled';

export const Browser = () => {
  const dispatch = useDispatch();
  const explorer = useSelector((state) => state.explorer);
  const { usd, networkInfos } = explorer;
  const [adjustIndex, setAdjustIndex] = useState(0);
  const [previousTxTotal, setPreviousTxTotal] = useState(0);

  /**
   * Memo: For Network information
   **/
  const { floatBalances, stats, capacity } = networkInfos;
  useEffect(() => {
    usd.BTC > 0 &&
      (async () => {
        const results = await Promise.all([fetchFloatBalances(usd.BTC), fetchStatsInfo()]);

        const data = results[0];
        const stats = results[1];

        data.floats &&
          data.capacity &&
          stats &&
          dispatch(
            updateNetworkInfos({ floatBalances: data.floats, capacity: data.capacity, stats }),
          );
      })();
  }, [usd, dispatch]);

  // Memo: To make `drop animation`. Migrate it later.
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (previousTxTotal === 0 && total > 0) {
      setPreviousTxTotal(total);
      setAdjustIndex(2);
    }
    if (previousTxTotal > 0) {
      setAdjustIndex(total - previousTxTotal);
    }
  }, [adjustIndex, previousTxTotal, total]);

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

  return (
    <BrowserContainer>
      <BrowserDiv size="bare">
        <Top>
          <NetworkBridges floatBalances={floatBalances} stats={stats} />
          <ExplorerInfos capacity={capacity} stats={stats} />
          <SwapVolume stats={stats} />
        </Top>
        <Bottom>
          <TxHistories loader={loader} noResultFound={noResultFound} adjustIndex={adjustIndex} />
        </Bottom>
      </BrowserDiv>
    </BrowserContainer>
  );
};
