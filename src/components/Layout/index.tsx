import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { mode } from '../../modules/env';
import { getTransactionFees } from '../../modules/explorer';
import { OnboardProvider } from '../../modules/onboard';
import { SdkContextProvider } from '../../modules/sdk-context';
import { fetchTransactionFees } from '../../modules/store';
import { Header } from '../Header';
import { Swap } from '../Swap';

import { CookieConsentHandler } from './CookieConsentHandler';
import { SwapContainer, LayoutBody } from './styled';

type Props = { children: React.ReactNode };

export type NavHandlerProps = {
  navOpen: boolean;
  setNavOpen: (navOpen: boolean) => void;
};

export const Layout = ({ children }: Props) => {
  const dispatch = useDispatch();
  const [navOpen, setNavOpen] = useState(true);

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
          <Header navOpen={navOpen} setNavOpen={setNavOpen} />

          <LayoutBody open={navOpen}>
            <SwapContainer>
              <Swap />
            </SwapContainer>

            {children}
          </LayoutBody>
        </OnboardProvider>
      </SdkContextProvider>

      <CookieConsentHandler />
    </>
  );
};
