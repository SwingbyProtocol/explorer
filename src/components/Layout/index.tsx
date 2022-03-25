import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { mode } from '../../modules/env';
import { OnboardProvider } from '../../modules/onboard';
import { SdkContextProvider } from '../../modules/sdk-context';
import { Header } from '../Header';
import { Swap } from '../Swap';
import { getEndpoint, getTransactionFees } from '../../modules/explorer';
import { updateTransactionFees } from '../../modules/store';
import { logger } from '../../modules/logger';
import { updateNodeEndpoint } from '../../modules/store/explorer';

import { SwapContainer } from './styled';
import { CookieConsentHandler } from './CookieConsentHandler';

type Props = { children: React.ReactNode };

const useFetchTransactionFees = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchTxFees = async () => {
      try {
        const transactionFees = await getTransactionFees();
        dispatch(updateTransactionFees(transactionFees));
      } catch (error) {
        logger.error(error);
      }
    };
    fetchTxFees();
  }, [dispatch]);
};

const useFetchNodeEndpoint = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchNodeEndpoint = async () => {
      try {
        const { urlEth, urlBsc } = await getEndpoint();
        dispatch(updateNodeEndpoint({ btc_erc: urlEth, btc_bep20: urlBsc }));
      } catch (error) {
        logger.error(error);
      }
    };
    fetchNodeEndpoint();
  }, [dispatch]);
};

export const Layout = ({ children }: Props) => {
  useFetchTransactionFees();
  useFetchNodeEndpoint();

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
