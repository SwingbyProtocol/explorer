import { getFiatAssetFormatter, Text } from '@swingby-protocol/pulsar';
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { CoinSymbol } from '../../../../coins';
import { CONTRACT_BTCE, CONTRACT_SWAP } from '../../../../env';
import { toBTC } from '../../../../explorer';
import { ABI_TOKEN, orgFloor, ABI_SWAP } from '../../../../pool';
import { setBalance } from '../../../../store';

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
  const explorer = useSelector((state) => state.explorer);
  const { usd } = explorer;
  const pool = useSelector((state) => state.pool);
  const { balance, web3, userAddress } = pool;
  const dispatch = useDispatch();

  const { locale } = useIntl();
  const currency = CoinSymbol.BTC;
  const amount = 0.2833;
  const totalEarnings = 0.2002;
  const usdTotalEarnings = getFiatAssetFormatter({
    locale: locale,
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(totalEarnings * usd[currency]);

  useEffect(() => {
    if (web3 && userAddress) {
      (async () => {
        const contractWBTC = new web3.eth.Contract(ABI_TOKEN, CONTRACT_BTCE);
        const contractLP = new web3.eth.Contract(ABI_SWAP, CONTRACT_SWAP);

        const balanceWBTC = await contractWBTC.methods.balanceOf(userAddress).call();
        const balance = toBTC(balanceWBTC.toString()).toString();
        dispatch(setBalance(balance));

        const satoshiLP = await contractLP.methods.getCurrentPriceLP().call();
        const priceLP = toBTC(satoshiLP);
        console.log('priceLP', priceLP);

        const userFloatBal = await contractLP.methods
          .getFloatBalanceOf(CONTRACT_BTCE, userAddress)
          .call();

        console.log('floatBalance', userFloatBal);
      })();
    }
  }, [dispatch, web3, userAddress]);

  return (
    <AccountSummaryContainer>
      <RowTitle>
        <Text variant="section-title">Your Account</Text>
      </RowTitle>
      <Column>
        <Coin symbol={currency} />
        <div>
          <Top>
            <TextRoom variant="label">{currency} Claim</TextRoom>
          </Top>
          <Bottom>
            <TextAmount variant="accent">{amount}</TextAmount>
          </Bottom>
        </div>
      </Column>
      <RowEarning>
        <TextRoom variant="label">Balance (WBTC)</TextRoom>
        {/* Memo: Show number at 3 decimal */}
        <TextRoom variant="accent">{orgFloor(balance, 1000)}</TextRoom>
      </RowEarning>
      <RowEarning>
        <TextRoom variant="label">Total Earnings</TextRoom>
        <TextRoom variant="accent">
          {totalEarnings} {currency}
        </TextRoom>
      </RowEarning>
      <RowEarning>
        <TextRoom variant="label">($USD)</TextRoom>
        <TextRoom variant="accent">{usdTotalEarnings}</TextRoom>
      </RowEarning>
    </AccountSummaryContainer>
  );
};
