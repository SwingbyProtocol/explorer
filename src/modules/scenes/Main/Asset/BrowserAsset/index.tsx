import { Text } from '@swingby-protocol/pulsar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  BrowserAssetContainer,
  BrowserAssetDiv,
  CoinWidgets,
  CoinIntro,
  TextTitleMobile,
  TextTitleLaptop,
  CoinInfo,
  Container,
  ChartBox,
} from './styled';

export const BrowserAsset = () => {
  const router = useRouter();

  const getCoinName = (path: string) => {
    const pathStrings = path.split('/');
    const coin = pathStrings[pathStrings.length - 1];
    switch (coin) {
      case 'btc':
        return { code: 'bitcoin', text: 'Bitcoin', coinMarketCapId: '1' };
      case 'wbtc':
        return {
          code: 'wrapped-bitcoin',
          text: 'WBTC',
          coinMarketCapId: '3717',
        };

      default:
        break;
    }
  };

  const coin = getCoinName(router.pathname);

  return (
    <>
      <Head>
        <title>Swingby Skybridge | Asset</title>
        <script
          type="text/javascript"
          src="https://files.coinmarketcap.com/static/widget/currency.js"
        />
        <script src="https://widgets.coingecko.com/coingecko-coin-compare-chart-widget.js" />
      </Head>
      <BrowserAssetContainer>
        <BrowserAssetDiv size="bare">
          <TextTitleLaptop variant="masked">
            {' '}
            <FormattedMessage id="asset.what-is" values={{ value: coin.text }} />
          </TextTitleLaptop>
          <Container>
            <CoinIntro>
              <TextTitleMobile variant="masked">
                {' '}
                <FormattedMessage id="asset.what-is" values={{ value: coin.text }} />
              </TextTitleMobile>
              <Text>
                <FormattedMessage id={`asset.${coin.code}.1`} />
              </Text>
              <br />
              <br />
              <Text>
                <FormattedMessage id={`asset.${coin.code}.2`} />
              </Text>
            </CoinIntro>
            <CoinWidgets>
              <CoinInfo
                className="coinmarketcap-currency-widget"
                data-currencyid={coin.coinMarketCapId}
                data-base="USD"
                data-secondary=""
                data-ticker="true"
                data-rank="true"
                data-marketcap="true"
                data-volume="true"
                data-statsticker="true"
                data-stats="USD"
              />

              {/* Memo: Loading widget from Coingecko which the element is not belongs to JSX.Element */}
              <ChartBox>
                {/* @ts-ignore */}
                <coingecko-coin-compare-chart-widget
                  coin-ids={coin.code}
                  currency="usd"
                  locale="en"
                  style={{ borderRadius: '50px' }}
                />
              </ChartBox>
            </CoinWidgets>
          </Container>
        </BrowserAssetDiv>
      </BrowserAssetContainer>
    </>
  );
};
