import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { mode } from '../../modules/env';
import { getTransactionFees } from '../../modules/explorer';
import { OnboardProvider } from '../../modules/onboard';
import { SdkContextProvider } from '../../modules/sdk-context';
import { fetchTransactionFees } from '../../modules/store';
import { Header } from '../Header';
import { Swap } from '../Swap';

import { CookieConsentHandler } from './CookieConsentHandler';
import { SwapContainer } from './styled';

type Props = { children: React.ReactNode };

export const Layout = ({ children }: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const transactionFees = await getTransactionFees();
      dispatch(fetchTransactionFees(transactionFees));
    })();
  }, [dispatch]);

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
