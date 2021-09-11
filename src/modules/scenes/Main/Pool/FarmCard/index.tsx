import {
  getCryptoAssetFormatter,
  getFiatAssetFormatter,
  Text,
  useMatchMedia,
} from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import React from 'react';
import { FormattedMessage, FormattedNumber, useIntl } from 'react-intl';

import { CoinSymbol } from '../../../../coins';
import { ENDPOINT_YIELD_FARMING, PATH } from '../../../../env';
import {
  useGetLatestPrice,
  useGetPoolApr,
  useGetSbBtcBal,
  useToggleBridge,
} from '../../../../hooks';
import { StylingConstants } from '../../../../styles';
import { ButtonScale, IconExternalLink, TextRoom } from '../../../Common';

import {
  FarmCardContainer,
  // Atag,
  Coin,
  // CoinMini,
  // Column,
  // RowEarning,
  RowTitle,
  // Box,
  AprBox,
  TextTitle,
  TextTvl,
  FeaturesBox,
  RowFeatures,
  IconTick,
  Buttons,
  ButtonLink,
} from './styled';

export const FarmCard = () => {
  const { bridge } = useToggleBridge(PATH.POOL);
  const { locale } = useIntl();
  const { balance } = useGetSbBtcBal();
  const { price } = useGetLatestPrice('bitcoin');
  const { apr, isLoading } = useGetPoolApr();

  const { media } = StylingConstants;
  const lg = useMatchMedia({ query: `(min-width: ${rem(media.lg)})` });
  const maxDecimals = lg ? 5 : 8;
  const minDecimals = 0;
  const claimableBtc = bridge ? balance[bridge].total * balance[bridge].priceSbBTC : 0;

  const formattedClaimableAmount = getCryptoAssetFormatter({
    locale,
    displaySymbol: CoinSymbol.BTC,
    maximumFractionDigits: maxDecimals,
    minimumFractionDigits: minDecimals,
  }).format(claimableBtc);

  const formattedClaimableAmountUsd = getFiatAssetFormatter({
    locale,
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(claimableBtc && price ? claimableBtc * price : 0);

  const formattedTvlAmountUsd = getFiatAssetFormatter({
    locale,
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(1465327);

  const formattedSbBtcWalletBal = getCryptoAssetFormatter({
    locale,
    displaySymbol: CoinSymbol.ERC20_SB_BTC,
    maximumFractionDigits: maxDecimals,
    minimumFractionDigits: minDecimals,
  }).format(bridge ? balance[bridge].wallet : 0);

  const formattedSbBtcStakedBal = getCryptoAssetFormatter({
    locale,
    displaySymbol: CoinSymbol.ERC20_SB_BTC,
    maximumFractionDigits: maxDecimals,
    minimumFractionDigits: minDecimals,
  }).format(bridge ? balance[bridge].farm : 0);

  const swingbyPerBlock = bridge ? (60 / 13) * 60 * 24 * apr[bridge].swingbyPerBlock : 0;

  return (
    <FarmCardContainer>
      <AprBox>
        <div>
          <RowTitle>
            <TextTitle variant="accent">
              <FormattedMessage id="common.sbbtc" />
            </TextTitle>
          </RowTitle>
          <div>
            <Text variant="title-xs">
              <FormattedMessage
                id="pool.stake-card.stake-on-farm-apr"
                values={{
                  value: (
                    <FormattedNumber
                      value={bridge && apr[bridge].total}
                      maximumFractionDigits={2}
                      minimumFractionDigits={2}
                    />
                  ),
                }}
              />
            </Text>
          </div>
          <div>
            <TextTvl variant="label">
              <FormattedMessage
                id="pool.stake-card.stake-on-farm-tvl"
                values={{
                  value: formattedTvlAmountUsd,
                }}
              />
            </TextTvl>
          </div>
        </div>
        <Coin symbol={CoinSymbol.ERC20_SB_BTC} />
      </AprBox>
      <FeaturesBox>
        <RowTitle>
          <TextTitle variant="accent">
            <FormattedMessage id="pool.stake-card.features" />
          </TextTitle>
        </RowTitle>
        <RowFeatures>
          <IconTick />
          <TextTitle variant="normal">
            <FormattedMessage
              id="pool.stake-card.trading-fee"
              values={{
                value: (
                  <FormattedNumber
                    value={bridge && apr[bridge].sbBtc}
                    maximumFractionDigits={2}
                    minimumFractionDigits={2}
                  />
                ),
              }}
            />
          </TextTitle>
        </RowFeatures>
        <RowFeatures>
          <IconTick />
          <TextTitle variant="normal">
            <FormattedMessage
              id="pool.stake-card.stake-apr"
              values={{
                apr: (
                  <FormattedNumber
                    value={bridge && apr[bridge].farm}
                    maximumFractionDigits={2}
                    minimumFractionDigits={2}
                  />
                ),
                swingbyPerDay: (
                  <FormattedNumber
                    value={swingbyPerBlock}
                    maximumFractionDigits={0}
                    minimumFractionDigits={0}
                  />
                ),
              }}
            />
          </TextTitle>
        </RowFeatures>
        <Buttons>
          <ButtonLink variant="primary" size="town" shape="fill">
            <FormattedMessage id="pool.stake-card.stake" />
          </ButtonLink>
          <ButtonLink variant="secondary" size="town" shape="fill">
            <FormattedMessage id="pool.stake-card.get-sbbtc" />
          </ButtonLink>
        </Buttons>
      </FeaturesBox>

      {/* <Box>
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
            <RowEarning>
              <TextRoom variant="label">
                <FormattedMessage id="pool.claim" />
              </TextRoom>
              <TextRoom variant="accent">{formattedClaimableAmount}</TextRoom>
            </RowEarning>
            <RowEarning>
              <TextRoom variant="label">
                <FormattedMessage id="pool.usd" />
              </TextRoom>
              <TextRoom variant="accent">{formattedClaimableAmountUsd}</TextRoom>
            </RowEarning>
          </div>
        </Column>
      </Box> */}
    </FarmCardContainer>
  );
};
