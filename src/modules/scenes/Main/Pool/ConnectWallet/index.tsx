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
  const { userAddress, onboard } = pool;

  console.log('onboard', onboard);
  const previouslySelectedWallet =
    typeof window !== 'undefined' && window.localStorage.getItem('selectedWallet');

  useEffect(() => {
    const updateUserAddress = (address: string): void => {
      console.log('address', address);
      dispatch(setUserAddress(address));
    };

    const onboardData = initOnboard({
      // isDarkMode: theme.pulsar.id === 'PulsarDark',
      isDarkMode: true,
      subscriptions: {
        address: updateUserAddress,
        wallet: (wallet) => {
          console.log('wallet', wallet);
          if (wallet.provider) {
            window.localStorage.setItem('selectedWallet', wallet.name);
          } else {
            window.localStorage.removeItem('selectedWallet');
          }
        },
      },
    });
    console.log('onboardData', onboardData);
    dispatch(setOnboard(onboardData));
  }, [dispatch]);

  useEffect(() => {
    if (previouslySelectedWallet !== null && onboard) {
      console.log('hello');
      onboard.walletSelect(previouslySelectedWallet);
    }
  }, [onboard, previouslySelectedWallet]);

  return (
    <ConnectWalletContainer>
      <BackDrop />
      <ButtonConnect
        variant="primary"
        size="state"
        onClick={async () => {
          !userAddress && (await onboard.walletSelect());
        }}
      >
        Connect Wallet
      </ButtonConnect>
    </ConnectWalletContainer>
  );
};
