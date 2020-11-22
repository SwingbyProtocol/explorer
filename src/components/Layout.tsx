import { useWindowWidth } from '@react-hook/window-size';
import Head from 'next/head';
import React, { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getUsdPrice, IFetchUsd, getTransactionFees } from '../modules/explorer';
import { useInterval } from '../modules/hooks';
import { setWidthSize, fetchUsdPrice, fetchTransactionFees } from '../modules/store';

import { SwapContainer } from './styled';
import { Header } from './Header';
import { Swap } from './Swap';

type Props = {
  children: ReactNode;
};

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
      console.log('results[1]', results[1]);
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
      </Head>

      <Header />
      <SwapContainer>
        <Swap />
      </SwapContainer>
      {props.children}
    </>
  );
};
