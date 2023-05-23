import React from 'react';

import { mode } from '../../modules/env';
import { OnboardProvider } from '../../modules/onboard';
import { SdkContextProvider } from '../../modules/sdk-context';
import { Header } from '../Header';
import { Swap } from '../Swap';

import { CookieConsentHandler } from './CookieConsentHandler';
import { SwapContainer } from './styled';

type Props = { children: React.ReactNode };

export const Layout = ({ children }: Props) => {
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
