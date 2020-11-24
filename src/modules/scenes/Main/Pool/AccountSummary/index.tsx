import { getFiatAssetFormatter, Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { CoinSymbol } from '../../../../coins';

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
