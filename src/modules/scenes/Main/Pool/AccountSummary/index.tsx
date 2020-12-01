import { getFiatAssetFormatter, Text } from '@swingby-protocol/pulsar';
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { CoinSymbol } from '../../../../coins';
import { BTCE_CONTRACT_ADDRESS } from '../../../../env';
import { ABI } from '../../../../pool';
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

  const orgFloor = (value: number, base: number): number => {
    return Math.floor(value * base) / base;
  };

  useEffect(() => {
    if (web3 && userAddress) {
      const contract = new web3.eth.Contract(ABI, BTCE_CONTRACT_ADDRESS);

      contract.methods
        .balanceOf(userAddress)
        .call()
        .then((bal: number) => {
          const balanceWei = web3.utils.fromWei(bal, 'gwei') * 10;
          dispatch(setBalance(String(balanceWei)));
        });
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
