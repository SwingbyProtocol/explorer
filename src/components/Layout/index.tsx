import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { mode } from '../../modules/env';
import { getTransactionFees, getUsdPrice } from '../../modules/explorer';
import { useInterval } from '../../modules/hooks';
import { SdkContextProvider } from '../../modules/sdk-context';
import { fetchTransactionFees, fetchUsdPrice } from '../../modules/store';
import { Header } from '../Header';
import { Swap } from '../Swap';
import { OnboardProvider } from '../../modules/onboard';

import { SwapContainer } from './styled';
import { CookieConsentHandler } from './CookieConsentHandler';

type Props = { children: React.ReactNode };

export const Layout = ({ children }: Props) => {
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
  }, [1000 * 60 * 10]); // Interval: 10min

  return (
    <>
      <SdkContextProvider mode={mode}>
        <OnboardProvider>
          <Header />

          <SwapContainer>
            <Swap />
          </SwapContainer>

          {children}
        </OnboardProvider>
      </SdkContextProvider>

      <CookieConsentHandler />
    </>
  );
};
