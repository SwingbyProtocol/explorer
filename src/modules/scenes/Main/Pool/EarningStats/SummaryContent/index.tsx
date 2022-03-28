import { getFiatAssetFormatter, logos, Text, useMatchMedia } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import React from 'react';
import { FormattedMessage, FormattedNumber, useIntl } from 'react-intl';

import { CoinSymbol } from '../../../../../coins';
import { useGetLatestPrice, useGetSbBtcBal } from '../../../../../hooks';
import { StylingConstants } from '../../../../../styles';
import { TextRoom } from '../../../../Common';

import {
  CoinMini,
  ColumMultiIcons,
  ColumnFarm,
  ColumnMultiFarm,
  ColumnTotal,
  IconCoinLogo,
  IconCoinLogoMini,
  Left,
  Right,
  Row,
  RowFarm,
  RowFarmName,
  RowFarmNameMulti,
  SummaryContentContainer,
  TitleFarm,
  UnitSwingby,
} from './styled';

export const SummaryContent = ({ farming, bridge }) => {
  const { locale } = useIntl();
  const { balance } = useGetSbBtcBal();
  const { price: btcUsd } = useGetLatestPrice('bitcoin');
  const { price: swingbyUsd } = useGetLatestPrice('swingby');

  const { media } = StylingConstants;
  const lg = useMatchMedia({ query: `(min-width: ${rem(media.lg)})` });
  const maxDecimals = lg ? 5 : 8;
  const minDecimals = 0;
  const claimableBtc = bridge ? balance[bridge].total * balance[bridge].priceSbBTC : 0;
  const earnedSwingbyTotal = farming.total.claimedSwingby + farming.total.pendingSwingby;

  const formattedBtcClaimableAmountUsd = getFiatAssetFormatter({
    locale,
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(claimableBtc && btcUsd ? claimableBtc * btcUsd : 0);

  const formattedEarnedSwingbyAmountUsd = getFiatAssetFormatter({
    locale,
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(earnedSwingbyTotal * swingbyUsd);

  const thirdPartyLogo =
    bridge === 'btc_skypool' ? (
      <IconCoinLogoMini src={logos.PancakeSwapCircled} />
    ) : (
      <ColumMultiIcons>
        <IconCoinLogoMini src={logos.UniswapCircled} />
        <IconCoinLogoMini src={logos.SushiSwapCircled} />
      </ColumMultiIcons>
    );

  return (
    <SummaryContentContainer>
      <Row>
        <RowFarm>
          <Left>
            <TitleFarm>
              <Text variant="label">
                <FormattedMessage id="pool.earning.farm" />
              </Text>
            </TitleFarm>
            <div>
              <TextRoom variant="label">
                <FormattedMessage id="pool.earning.claimed" />
              </TextRoom>
            </div>
            <div>
              <TextRoom variant="label">
                <FormattedMessage id="pool.earning.pending" />
              </TextRoom>
            </div>
            <UnitSwingby>
              <Text variant="label">
                <FormattedMessage id="pool.earning.swingby" />
              </Text>
            </UnitSwingby>
          </Left>
          <Right>
            <ColumnFarm>
              <RowFarmName>
                <CoinMini symbol={CoinSymbol.ERC20_SB_BTC} />
                <Text variant="menu">
                  <FormattedMessage id="common.sbbtc" />
                </Text>
              </RowFarmName>
              {/* Todo: remove condition once published sbBTC pool on BSC */}
              <div>
                <TextRoom variant="accent">
                  {bridge === 'btc_skypool' ? (
                    <FormattedMessage id="common.coming-soon" />
                  ) : (
                    <FormattedNumber
                      value={farming.sbBtcFarm.claimedSwingby}
                      maximumFractionDigits={0}
                      minimumFractionDigits={0}
                    />
                  )}
                </TextRoom>
              </div>
              {/* Todo: remove condition once published sbBTC pool on BSC */}
              <div>
                <TextRoom variant="accent">
                  {bridge === 'btc_skypool' ? (
                    <FormattedMessage id="common.coming-soon" />
                  ) : (
                    <FormattedNumber
                      value={farming.sbBtcFarm.pendingSwingby}
                      maximumFractionDigits={0}
                      minimumFractionDigits={0}
                    />
                  )}
                </TextRoom>
              </div>
            </ColumnFarm>
            <ColumnMultiFarm>
              <RowFarmNameMulti>
                {thirdPartyLogo}
                <Text variant="menu">
                  <FormattedMessage
                    id={
                      bridge === 'btc_skypool' ? 'pool.earning.pancake' : 'pool.earning.sushi-uni'
                    }
                  />
                </Text>
              </RowFarmNameMulti>
              <div>
                <TextRoom variant="accent">
                  <FormattedNumber
                    value={farming.thirdPartyFarm.claimedSwingby}
                    maximumFractionDigits={0}
                    minimumFractionDigits={0}
                  />
                </TextRoom>
              </div>
              <div>
                <TextRoom variant="accent">
                  <FormattedNumber
                    value={farming.thirdPartyFarm.pendingSwingby}
                    maximumFractionDigits={0}
                    minimumFractionDigits={0}
                  />
                </TextRoom>
              </div>
            </ColumnMultiFarm>
          </Right>
        </RowFarm>
      </Row>
      <Row>
        <RowFarm>
          <Left>
            <div>
              <TextRoom variant="label">
                <FormattedMessage id="pool.earning.claimable" />
              </TextRoom>
            </div>
            <div>
              <TextRoom variant="label">
                <FormattedMessage id="pool.usd" />
              </TextRoom>
            </div>
          </Left>
          <Right>
            <ColumnFarm>
              <RowFarmName>
                <CoinMini symbol={CoinSymbol.BTC} />
                <Text variant="menu">
                  <FormattedMessage id="common.btc" />
                </Text>
              </RowFarmName>
              <div>
                <TextRoom variant="accent">
                  {' '}
                  <FormattedNumber
                    value={claimableBtc}
                    maximumFractionDigits={maxDecimals}
                    minimumFractionDigits={minDecimals}
                  />
                </TextRoom>
              </div>
              <div>
                <TextRoom variant="accent">{formattedBtcClaimableAmountUsd}</TextRoom>
              </div>
            </ColumnFarm>
            <ColumnFarm>
              <RowFarmName>
                <IconCoinLogo src={logos.Swingby} />
                <Text variant="menu">
                  <FormattedMessage id="pool.earning.earned-swingby" />
                </Text>
              </RowFarmName>
              <ColumnTotal>
                <div>
                  <TextRoom variant="label">
                    <FormattedMessage id="common.total" />
                  </TextRoom>
                  <br />
                  <TextRoom variant="label">
                    <FormattedMessage id="pool.usd" />
                  </TextRoom>
                </div>
                <div>
                  <div>
                    <TextRoom variant="accent">
                      <FormattedNumber
                        value={earnedSwingbyTotal}
                        maximumFractionDigits={0}
                        minimumFractionDigits={0}
                      />
                    </TextRoom>
                  </div>
                  <div>
                    <TextRoom variant="accent">{formattedEarnedSwingbyAmountUsd}</TextRoom>
                  </div>
                </div>
              </ColumnTotal>
            </ColumnFarm>
          </Right>
        </RowFarm>
      </Row>
    </SummaryContentContainer>
  );
};
