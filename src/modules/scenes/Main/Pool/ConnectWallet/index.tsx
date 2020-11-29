import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';

import { initOnboard } from '../../../../onboard';
import { setOnboard, setUserAddress } from '../../../../store';

import { BackDrop, ButtonConnect, ConnectWalletContainer } from './styled';

export const ConnectWallet = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const pool = useSelector((state) => state.pool);
  const { onboard } = pool;

  // const previouslySelectedWallet =
  //   typeof window !== 'undefined' && window.localStorage.getItem('selectedWallet');

  useEffect(() => {
    const updateUserAddress = (address: string): void => {
      dispatch(setUserAddress(address));
    };

    const onboardData = initOnboard({
      isDarkMode: theme.pulsar.id === 'PulsarDark',
      subscriptions: {
        address: updateUserAddress,
        wallet: (wallet) => {
          if (wallet.provider) {
            window.localStorage.setItem('selectedWallet', wallet.name);
          } else {
            window.localStorage.removeItem('selectedWallet');
          }
        },
      },
    });
    dispatch(setOnboard(onboardData));
  }, [dispatch, theme.pulsar.id]);

  useEffect(() => {
    const previouslySelectedWallet =
      typeof window !== 'undefined' && window.localStorage.getItem('selectedWallet');
    (async () => {
      // if (previouslySelectedWallet !== null && onboard) {
      if (previouslySelectedWallet && onboard) {
        await onboard.walletSelect(previouslySelectedWallet);
      }
    })();
  }, [onboard]);

  const login = async () => {
    await onboard.walletSelect();
    await onboard.walletCheck();
  };

  return (
    <ConnectWalletContainer>
      <BackDrop />
      <ButtonConnect variant="primary" size="state" onClick={async () => await login()}>
        Connect Wallet
      </ButtonConnect>
    </ConnectWalletContainer>
  );
};
