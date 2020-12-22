import { getCryptoAssetFormatter, getFiatAssetFormatter, Text } from '@swingby-protocol/pulsar';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { CoinSymbol } from '../../../../coins';
import { CONTRACT_SB_BTC, CONTRACT_SWAP, ENDPOINT_EARNINGS } from '../../../../env';
import { toBTC } from '../../../../explorer';
import { fetch } from '../../../../fetch';
import { ABI_TOKEN, orgFloor, ABI_SWAP, getHexValue } from '../../../../pool';
import { getCurrentPriceLP, getDepositFeeRate, setBalanceLP } from '../../../../store';

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
  const { balanceLP, web3, userAddress } = pool;

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
        const contractLP = new web3.eth.Contract(ABI_TOKEN, CONTRACT_SB_BTC);
        const contractSwap = new web3.eth.Contract(ABI_SWAP, CONTRACT_SWAP);
        const urlEarning = ENDPOINT_EARNINGS;
        const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

        const results = await Promise.all([
          contractLP.methods.balanceOf(userAddress).call(),
          contractSwap.methods.getCurrentPriceLP().call(),
          contractSwap.methods.getFloatBalanceOf(ZERO_ADDRESS, userAddress).call(),
          fetch<{ total: string }>(urlEarning),
        ]);

        const resultBalanceOf = results[0];
        const balanceLP = Number(toBTC(resultBalanceOf.toString()).toString());
        dispatch(setBalanceLP(balanceLP));

        // Todo: Check the logic with backend team
        const priceLP = toBTC(results[1]);
        const userFloatBalSatoshi = Number(results[2]);
        const userFloatBal = toBTC(String(userFloatBalSatoshi));

        const totalClaimableAmount = priceLP * balanceLP;
        const totalEarnings = results[3].ok && results[3].response.total;
        setTotalEarnings(Number(totalEarnings));

        setClaimableAmount(totalClaimableAmount);
        dispatch(getCurrentPriceLP(priceLP));

        // Memo: When pass numAsHex to the contract method, it will be treated as uint256.
        const amountInAsHex = getHexValue(userFloatBal);

        const depositFeeRate = await contractSwap.methods
          .getDepositFeeRate(userAddress, amountInAsHex)
          .call();
        dispatch(getDepositFeeRate(depositFeeRate));
      })();
    }
  }, [dispatch, web3, userAddress]);

  return (
    <AccountSummaryContainer>
      <RowTitle>
        <Text variant="section-title">
          <FormattedMessage id="pool.yourAccount" />
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
        <TextRoom variant="accent">{orgFloor(balanceLP, 1000)}</TextRoom>
      </RowEarning>
      <RowEarning>
        <TextRoom variant="label">
          <FormattedMessage id="pool.totalEarnings" />
        </TextRoom>
        <TextRoom variant="accent">
          {/* {totalEarnings} {currency} */}
          <FormattedMessage id="common.comingSoon" />
        </TextRoom>
      </RowEarning>
      <RowEarning>
        <TextRoom variant="label">
          <FormattedMessage id="pool.usd" />
        </TextRoom>
        <TextRoom variant="accent">
          {/* {usdTotalEarnings} */}
          <FormattedMessage id="common.comingSoon" />
        </TextRoom>
      </RowEarning>
    </AccountSummaryContainer>
  );
};
