import {
  PulsarGlobalStyles,
  PulsarThemeProvider,
  PulsarToastContainer,
  PULSAR_GLOBAL_FONT_HREF,
} from '@swingby-protocol/pulsar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { mode, PATH } from '../../modules/env';
import { getTransactionFees, getUsdPrice } from '../../modules/explorer';
import { useInterval } from '../../modules/hooks';
import { SdkContextProvider } from '../../modules/sdk-context';
import { fetchTransactionFees, fetchUsdPrice } from '../../modules/store';
import { useThemeSettings } from '../../modules/store/settings';
import { Header } from '../Header';
import { Swap } from '../Swap';

import { SwapContainer } from './styled';
import { CookieConsentHandler } from './CookieConsentHandler';

type Props = { children: React.ReactNode };

export const Layout = ({ children }: Props) => {
  const [theme] = useThemeSettings();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const transactionFees = await getTransactionFees();
      dispatch(fetchTransactionFees(transactionFees));
    })();
  }, [dispatch]);

  useInterval(() => {
    (async () => {
      const results = await Promise.all([
        getUsdPrice('bitcoin'),
        getUsdPrice('swingby'),
        getTransactionFees(),
      ]);

      const priceUSD = {
        BTC: results[0],
        SWINGBY: results[1],
      };

      dispatch(fetchUsdPrice(priceUSD));
      dispatch(fetchTransactionFees(results[2]));
    })();
  }, [60000]);

  const metanodesEarnersPage = (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" sizes="180x180" />
        <link rel="icon" type="image/png" href="/favicon.png" sizes="192x192" />
        <link rel="stylesheet" href={PULSAR_GLOBAL_FONT_HREF} />
      </Head>
      {children}
    </>
  );

  return (
    <PulsarThemeProvider theme={theme}>
      <PulsarGlobalStyles />

      {router.pathname === PATH.METANODE_EARNERS ? (
        metanodesEarnersPage
      ) : (
        <>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.png" />
            <link rel="apple-touch-icon" href="/favicon.png" sizes="180x180" />
            <link rel="icon" type="image/png" href="/favicon.png" sizes="192x192" />
            <link rel="stylesheet" href={PULSAR_GLOBAL_FONT_HREF} />
          </Head>

          <SdkContextProvider mode={mode}>
            <PulsarToastContainer />

            <Header />
            <SwapContainer>
              <Swap />
            </SwapContainer>

            {children}
          </SdkContextProvider>

          <CookieConsentHandler />
        </>
      )}
    </PulsarThemeProvider>
  );
};
