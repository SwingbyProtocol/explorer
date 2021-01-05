import { useWindowWidth } from '@react-hook/window-size';
import { PULSAR_GLOBAL_FONT_HREF } from '@swingby-protocol/pulsar';
import Head from 'next/head';
import React, { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Slide, ToastContainer } from 'react-toastify';

import { GA_TAG } from '../modules/env';
import { getTransactionFees, getUsdPrice, TTheme } from '../modules/explorer';
import { useInterval } from '../modules/hooks';
import { fetchTransactionFees, fetchUsdPrice, setWidthSize } from '../modules/store';

import { Header } from './Header';
import { SwapContainer } from './styled';
import { Swap } from './Swap';

interface Props {
  children: ReactNode;
  setThemeMode: (theme: string) => void;
  themeMode: TTheme;
}

export const Layout = (props: Props) => {
  const dispatch = useDispatch();
  const width = useWindowWidth({
    wait: 500,
  });

  useEffect(() => {
    dispatch(setWidthSize(width));
  }, [width, dispatch]);

  useEffect(() => {
    (async () => {
      const transactionFees = await getTransactionFees();
      dispatch(fetchTransactionFees(transactionFees));
    })();
  }, [dispatch]);

  useInterval(() => {
    (async () => {
      const results = await Promise.all([getUsdPrice(), getTransactionFees()]);
      dispatch(fetchUsdPrice(results[0]));
      dispatch(fetchTransactionFees(results[1]));
    })();
  }, [60000]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" sizes="180x180" />
        <link rel="icon" type="image/png" href="/favicon.png" sizes="192x192" />
        <link rel="stylesheet" href={PULSAR_GLOBAL_FONT_HREF} />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TAG}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', ${GA_TAG}, {
                  page_path: window.location.pathname,
                });
              `,
          }}
        />
      </Head>

      <ToastContainer transition={Slide} />

      <Header setThemeMode={props.setThemeMode} themeMode={props.themeMode} />
      <SwapContainer>
        <Swap />
      </SwapContainer>
      {props.children}
    </>
  );
};
