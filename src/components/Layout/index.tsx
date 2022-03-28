import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { mode } from '../../modules/env';
import { getEndpoint, getTransactionFees } from '../../modules/explorer';
import { logger } from '../../modules/logger';
import { OnboardProvider } from '../../modules/onboard';
import { SdkContextProvider } from '../../modules/sdk-context';
import { fetchTransactionFees } from '../../modules/store';
import { buildNodeEndpoint } from '../../modules/store/explorer';
import { Header } from '../Header';
import { Swap } from '../Swap';

import { CookieConsentHandler } from './CookieConsentHandler';
import { SwapContainer } from './styled';

type Props = { children: React.ReactNode };

export const Layout = ({ children }: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const transactionFees = await getTransactionFees();
        dispatch(fetchTransactionFees(transactionFees));
      } catch (error) {
        logger.error(error);
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      try {
        const { urlEth, urlBsc } = await getEndpoint();
        dispatch(buildNodeEndpoint({ btc_erc: urlEth, btc_bep20: urlBsc }));
      } catch (error) {
        logger.error(error);
      }
    })();
  }, [dispatch]);

  return (
    <>
      <SdkContextProvider mode={mode}>
        <OnboardProvider>
          <Header />

          <SwapContainer>
            {/* <Swap /> */}
          </SwapContainer>

          {children}
        </OnboardProvider>
      </SdkContextProvider>

      <CookieConsentHandler />
    </>
  );
};
