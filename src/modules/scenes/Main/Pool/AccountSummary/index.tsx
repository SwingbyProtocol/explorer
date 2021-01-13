import { getCryptoAssetFormatter, getFiatAssetFormatter, Text } from '@swingby-protocol/pulsar';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { CoinSymbol } from '../../../../coins';
import { convertFromPercent } from '../../../../common';
import { CONTRACT_WBTC, ENDPOINT_EARNINGS, ZERO_ADDRESS } from '../../../../env';
import { toSatoshi } from '../../../../explorer';
import { fetch } from '../../../../fetch';
import {
  fetchSbBTCBalance,
  fetchSbBTCRate,
  getHexValue,
  IFeeRate,
  orgFloor,
} from '../../../../pool';
import { getCurrentPriceSbBTC, getDepositFeeRate, setBalanceSbBTC } from '../../../../store';

import {
  AccountSummaryContainer,
  Bottom,
  Coin,
  Column,
  RowEarning,
  RowTitle,
  TextAmount,
  TextRoom,
  Top,
} from './styled';

export const AccountSummary = () => {
  const dispatch = useDispatch();
  const explorer = useSelector((state) => state.explorer);
  const { usd } = explorer;
  const pool = useSelector((state) => state.pool);
  const { balanceSbBTC, web3, userAddress } = pool;

  const [claimableAmount, setClaimableAmount] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);

  const { locale } = useIntl();
  const currency = CoinSymbol.BTC;

  // Todo: Remove `disable-next-line` after 'earnings API' works
  // eslint-disable-next-line
  const usdTotalEarnings = getFiatAssetFormatter({
    locale: locale,
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(totalEarnings * usd[currency]);

  const formattedClaimableAmount = getCryptoAssetFormatter({
    locale: locale,
    displaySymbol: CoinSymbol.BTC,
  }).format(Number(claimableAmount));

  useEffect(() => {
    if (web3 && userAddress) {
      (async () => {
        const urlEarning = ENDPOINT_EARNINGS;

        const handleGetDepositFeeRate = async (
          tokenAddress: string,
          totalClaimableAmount: number,
        ): Promise<number> => {
          const userFloatBal = toSatoshi(String(totalClaimableAmount));

          // Memo: When pass numAsHex to the contract method, it will be treated as uint256.
          const amountInAsHex = getHexValue(userFloatBal);
          const feeRate = await web3.methods.getDepositFeeRate(tokenAddress, amountInAsHex).call();
          return convertFromPercent(feeRate);
        };

        const results = await Promise.all([
          fetchSbBTCBalance(userAddress),
          fetchSbBTCRate(),
          fetch<{ total: string }>(urlEarning),
        ]);

        const balanceSbBTC = results[0];
        dispatch(setBalanceSbBTC(balanceSbBTC));

        const priceSbBTC = results[1];
        dispatch(getCurrentPriceSbBTC(priceSbBTC));

        // Memo: Decimal <= 8
        const totalClaimableAmount = orgFloor(priceSbBTC * balanceSbBTC, 8);
        setClaimableAmount(totalClaimableAmount);

        const rates = await Promise.all([
          // Memo:  ZERO_ADDRESS: BTC
          handleGetDepositFeeRate(ZERO_ADDRESS, totalClaimableAmount),
          handleGetDepositFeeRate(CONTRACT_WBTC, totalClaimableAmount),
        ]);

        const feeRates: IFeeRate = {
          BTC: rates[0],
          WBTC: rates[1],
        };
        dispatch(getDepositFeeRate(feeRates));

        // Memo: Earings API has not deployed yet. This is the mocked response.
        const totalEarnings = results[2].ok && results[2].response.total;
        setTotalEarnings(Number(totalEarnings));
      })();
    }
  }, [dispatch, web3, userAddress]);

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
