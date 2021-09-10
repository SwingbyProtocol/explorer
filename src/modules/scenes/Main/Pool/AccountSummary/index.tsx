import { getCryptoAssetFormatter, Text, useMatchMedia } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { CoinSymbol } from '../../../../coins';
import { ENDPOINT_YIELD_FARMING, PATH } from '../../../../env';
import { useGetSbBtcBal, useToggleBridge } from '../../../../hooks';
import { StylingConstants } from '../../../../styles';
import { IconExternalLink, TextRoom } from '../../../Common';

import {
  AccountSummaryContainer,
  Atag,
  Bottom,
  Coin,
  CoinMini,
  Column,
  RowEarning,
  RowTitle,
  Top,
  Box,
} from './styled';

export const AccountSummary = () => {
  const { bridge } = useToggleBridge(PATH.POOL);
  const { locale } = useIntl();
  const { balance } = useGetSbBtcBal();

  const { media } = StylingConstants;
  const lg = useMatchMedia({ query: `(min-width: ${rem(media.lg)})` });
  const maxDecimals = lg ? 5 : 8;
  const minDecimals = 0;

  const formattedClaimableAmount = getCryptoAssetFormatter({
    locale,
    displaySymbol: CoinSymbol.BTC,
    maximumFractionDigits: 8,
    minimumFractionDigits: minDecimals,
  }).format(bridge && balance[bridge].total * balance[bridge].priceSbBTC);

  const formattedSbBtcWalletBal = getCryptoAssetFormatter({
    locale,
    displaySymbol: CoinSymbol.ERC20_SB_BTC,
    maximumFractionDigits: maxDecimals,
    minimumFractionDigits: minDecimals,
  }).format(bridge && balance[bridge].wallet);

  const formattedSbBtcStakedBal = getCryptoAssetFormatter({
    locale,
    displaySymbol: CoinSymbol.ERC20_SB_BTC,
    maximumFractionDigits: maxDecimals,
    minimumFractionDigits: minDecimals,
  }).format(bridge && balance[bridge].farm);

  return (
    <AccountSummaryContainer>
      <RowTitle>
        <Text variant="section-title">
          <FormattedMessage id="pool.your-account" />
        </Text>
      </RowTitle>
      <Box>
        <Column>
          <Coin symbol={CoinSymbol.ERC20_SB_BTC} />
          <div>
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
          </div>
        </Column>

        <Column>
          <CoinMini symbol={CoinSymbol.BTC} />
          <div>
            <Top>
              <TextRoom variant="label">
                {CoinSymbol.BTC} <FormattedMessage id="pool.claim" />
              </TextRoom>
            </Top>
            <Bottom>
              <TextRoom variant="accent">{formattedClaimableAmount}</TextRoom>
            </Bottom>
          </div>
        </Column>
      </Box>
    </AccountSummaryContainer>
  );
};
