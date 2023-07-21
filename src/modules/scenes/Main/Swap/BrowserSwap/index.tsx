import { useMemo } from 'react';
import { Dropdown } from '@swingby-protocol/pulsar';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { createWidget, getHtml } from '@swingby-protocol/widget';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { useGetNetworkData } from '../../../../hooks';
import { networkInfoSelector } from '../../../../store';
import { useAffiliateCode } from '../../../../affiliate-code';
import { mode } from '../../../../env';
import { useThemeSettings } from '../../../../store/settings';
import { CoinSymbol } from '../../../../coins';

import {
  BrowserSwapContainer,
  BrowserSwapDiv,
  NetworkDropdownContainer,
  SwapBridgeDropdownTarget,
  SwapContainer,
  SwapLiquidityInfoContainer,
  SwapLiquidityInfo,
  SwapStatInfo,
  SwapStatValue,
  CoinContainer,
  CoinInfo,
  CoinName,
  Coin,
} from './styled';

interface IBridgeData {
  coin: CoinSymbol;
  name: string;
  float: number;
}

export const BrowserSwap = () => {
  const { locale } = useRouter();
  const affiliateCode = useAffiliateCode();
  const [theme] = useThemeSettings();

  const swapForm = useMemo(
    () =>
      createWidget({
        resource: 'swap',
        mode,
        size: 'big',
        theme,
        locale,
        affiliateCode,
      }),
    [theme, locale, affiliateCode],
  );

  useGetNetworkData();
  const networkInfos = useSelector(networkInfoSelector);
  const { floatBalances } = networkInfos;

  const dataSkypoolBridge = [
    {
      coin: CoinSymbol.BTC,
      name: 'BTC',
      float: floatBalances.btcSkypool,
    },
    {
      coin: CoinSymbol.SKYPOOL_WBTC,
      name: 'WBTC',
      float: floatBalances.wbtcSkypool,
    },
  ];

  return (
    <>
      <NetworkDropdownContainer>
        <FormattedMessage id="swap.mode.network-select-label" />
        <Dropdown
          target={
            <SwapBridgeDropdownTarget size="city">
              <FormattedMessage id="swap.mode.ethereum" />
            </SwapBridgeDropdownTarget>
          }
        >
          <Dropdown.Item selected>
            <FormattedMessage id="swap.mode.ethereum" />
          </Dropdown.Item>
        </Dropdown>
      </NetworkDropdownContainer>
      <BrowserSwapContainer>
        <BrowserSwapDiv size="bare">
          <SwapLiquidityInfoContainer>
            <SwapLiquidityInfo>
              <FormattedMessage id="swap.liquidity-label" />

              <CoinContainer>
                {dataSkypoolBridge.map((coin: IBridgeData) => {
                  return (
                    <CoinInfo key={coin.coin}>
                      <Coin symbol={coin.coin} />
                      <CoinName>{coin.name}</CoinName>
                      <b>
                        <FormattedNumber value={Number(coin.float)} />
                      </b>
                    </CoinInfo>
                  );
                })}
              </CoinContainer>
            </SwapLiquidityInfo>

            <SwapStatInfo>
              <FormattedMessage id="swap.limittx-stat-label" />
              <SwapStatValue>5.00</SwapStatValue>

              <FormattedMessage id="swap.fees-stat-label" />
              <SwapStatValue>0.25%</SwapStatValue>
            </SwapStatInfo>
          </SwapLiquidityInfoContainer>

          <SwapContainer dangerouslySetInnerHTML={{ __html: getHtml({ widget: swapForm }) }} />
        </BrowserSwapDiv>
      </BrowserSwapContainer>
    </>
  );
};
