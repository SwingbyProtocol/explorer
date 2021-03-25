import { getCryptoAssetFormatter, getFiatAssetFormatter, Text } from '@swingby-protocol/pulsar';
import { getSbbtcPrice } from '@swingby-protocol/sdk';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { CoinSymbol } from '../../../../coins';
import { ENDPOINT_EARNINGS, PATH } from '../../../../env';
import { fetcher } from '../../../../fetch';
import { useToggleBridge } from '../../../../hooks';
import { fetchSbBTCBalance, orgFloor } from '../../../../pool';
import { useSdkContext } from '../../../../sdk-context';
import { setBalanceSbBTC } from '../../../../store';
import { TextRoom } from '../../../Common';

import {
  AccountSummaryContainer,
  Bottom,
  Coin,
  Column,
  RowEarning,
  RowTitle,
  TextAmount,
  Top,
} from './styled';

export const AccountSummary = () => {
  const { bridge } = useToggleBridge(PATH.POOL);
  const dispatch = useDispatch();
  const explorer = useSelector((state) => state.explorer);
  const { usd } = explorer;
  const pool = useSelector((state) => state.pool);
  const { balanceSbBTC, userAddress } = pool;

  const [claimableAmount, setClaimableAmount] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);

  const { locale } = useIntl();
  const currency = CoinSymbol.BTC;
  const context = useSdkContext();

  // Todo: Remove `disable-next-line` after 'earnings API' works
  // eslint-disable-next-line
  const usdTotalEarnings = getFiatAssetFormatter({
    locale,
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(totalEarnings * usd[currency]);

  const formattedClaimableAmount = getCryptoAssetFormatter({
    locale,
    displaySymbol: CoinSymbol.BTC,
  }).format(Number(claimableAmount));

  // Todo: Add toggle bridge logic from SDK
  useEffect(() => {
    if (userAddress) {
      (async () => {
        const urlEarning = ENDPOINT_EARNINGS;

        const results = await Promise.all([
          fetchSbBTCBalance(userAddress, bridge),
          getSbbtcPrice({ context, bridge }),
          fetcher<{ total: string }>(urlEarning),
        ]);

        const balanceSbBTC = results[0];
        dispatch(setBalanceSbBTC(balanceSbBTC));

        const priceSbBTC = Number(results[1]);

        // Memo: Decimal <= 8
        const totalClaimableAmount = orgFloor(priceSbBTC * balanceSbBTC, 8);
        setClaimableAmount(totalClaimableAmount);

        // Memo: Earings API has not deployed yet. This is the mocked response.
        const totalEarnings = results[2].total;
        setTotalEarnings(Number(totalEarnings));
      })();
    }
  }, [dispatch, userAddress, context, bridge]);

  return (
    <AccountSummaryContainer>
      <RowTitle>
        <Text variant="section-title">
          <FormattedMessage id="pool.your-account" />
        </Text>
      </RowTitle>
      <Column>
        <Coin symbol={currency} />
        <div>
          <Top>
            <TextRoom variant="label">
              {currency} <FormattedMessage id="pool.claim" />
            </TextRoom>
          </Top>
          <Bottom>
            <TextAmount variant="accent">{formattedClaimableAmount}</TextAmount>
          </Bottom>
        </div>
      </Column>
      <RowEarning>
        <TextRoom variant="label">
          <FormattedMessage id="pool.balance" />
        </TextRoom>
        {/* Memo: Show number at 3 decimal */}
        <TextRoom variant="accent">{orgFloor(balanceSbBTC, 3)}</TextRoom>
      </RowEarning>
      <RowEarning>
        <TextRoom variant="label">
          <FormattedMessage id="pool.total-earnings" />
        </TextRoom>
        <TextRoom variant="accent">
          {/* {totalEarnings} {currency} */}
          <FormattedMessage id="common.coming-soon" />
        </TextRoom>
      </RowEarning>
      <RowEarning>
        <TextRoom variant="label">
          <FormattedMessage id="pool.usd" />
        </TextRoom>
        <TextRoom variant="accent">
          {/* {usdTotalEarnings} */}
          <FormattedMessage id="common.coming-soon" />
        </TextRoom>
      </RowEarning>
    </AccountSummaryContainer>
  );
};
