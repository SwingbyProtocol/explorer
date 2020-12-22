import { useWindowWidth } from '@react-hook/window-size';
import Head from 'next/head';
import React, { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Slide, ToastContainer } from 'react-toastify';

import { getTransactionFees, getUsdPrice, IFetchUsd, TTheme } from '../modules/explorer';
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
      const results = await Promise.all([getUsdPrice(), getTransactionFees()]);
      dispatch(fetchUsdPrice(results[0]));
      dispatch(fetchTransactionFees(results[1]));
    })();
  }, [dispatch]);

  useInterval(() => {
    getUsdPrice().then((price: IFetchUsd) => {
      dispatch(fetchUsdPrice(price));
    });
  }, [60000]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" sizes="180x180" />
        <link rel="icon" type="image/png" href="/favicon.png" sizes="192x192" />
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
