import { getCryptoAssetFormatter, Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { CoinSymbol } from '../../../../coins';
import { ENDPOINT_YIELD_FARMING, PATH } from '../../../../env';
import { useGetSbBtcBal, useToggleBridge } from '../../../../hooks';
import { TextRoom, IconExternalLink } from '../../../Common';

import {
  AccountSummaryContainer,
  Bottom,
  Coin,
  CoinMini,
  Column,
  RowBalance,
  RowEarning,
  RowTitle,
  TextAmount,
  Top,
  Atag,
} from './styled';

export const AccountSummary = () => {
  const { bridge } = useToggleBridge(PATH.POOL);
  const { locale } = useIntl();
  const { balance } = useGetSbBtcBal();

  const formattedClaimableAmount = getCryptoAssetFormatter({
    locale,
    displaySymbol: CoinSymbol.BTC,
    maximumFractionDigits: 8,
  }).format(bridge && balance[bridge].total * balance[bridge].priceSbBTC);

  const formattedSbBtcWalletBal = getCryptoAssetFormatter({
    locale,
    displaySymbol: CoinSymbol.ERC20_SB_BTC,
    maximumFractionDigits: 8,
    minimumFractionDigits: 0,
  }).format(bridge && balance[bridge].wallet);

  const formattedSbBtcStakedBal = getCryptoAssetFormatter({
    locale,
    displaySymbol: CoinSymbol.ERC20_SB_BTC,
    maximumFractionDigits: 8,
    minimumFractionDigits: 0,
  }).format(bridge && balance[bridge].farm);

  return (
    <AccountSummaryContainer>
      <RowTitle>
        <Text variant="section-title">
          <FormattedMessage id="pool.your-account" />
        </Text>
      </RowTitle>
      <Column>
        <Coin symbol={CoinSymbol.BTC} />
        <div>
          <Top>
            <TextRoom variant="label">
              {CoinSymbol.BTC} <FormattedMessage id="pool.claim" />
            </TextRoom>
          </Top>
          <Bottom>
            <TextAmount variant="accent">{formattedClaimableAmount}</TextAmount>
          </Bottom>
        </div>
      </Column>
      <RowBalance>
        <CoinMini symbol={CoinSymbol.ERC20_SB_BTC} />
        <TextRoom variant="label">
          <FormattedMessage id="pool.balance" />
        </TextRoom>
      </RowBalance>
      <RowEarning>
        <TextRoom variant="label">
          <FormattedMessage id="pool.balance.wallet" />
        </TextRoom>
        <TextRoom variant="accent">{formattedSbBtcWalletBal}</TextRoom>
      </RowEarning>
      <RowEarning>
        <Atag href={ENDPOINT_YIELD_FARMING} rel="noopener noreferrer" target="_blank">
          <TextRoom variant="label">
            <FormattedMessage id="pool.balance.staking" />
          </TextRoom>
          <IconExternalLink />
        </Atag>
        {/* Todo: Remove 'coming soon' once sbBTC pool (BSC) has been deployed */}
        <TextRoom variant="accent">
          {bridge === 'btc_erc' ? (
            formattedSbBtcStakedBal
          ) : (
            <FormattedMessage id="common.coming-soon" />
          )}
        </TextRoom>
      </RowEarning>
    </AccountSummaryContainer>
  );
};
