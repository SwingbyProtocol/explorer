import React, { useCallback, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import Web3 from 'web3';

import { LOCAL_STORAGE } from '../../../../env';
import { initOnboard } from '../../../../onboard';
import { setOnboard, setUserAddress, setWeb3 } from '../../../../store';

import { BackDrop, ButtonConnect, ConnectWalletContainer } from './styled';

export const ConnectWallet = () => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const pool = useSelector((state) => state.pool);
  const { onboard } = pool;

  const selectedWallet =
    typeof window !== 'undefined' && window.localStorage.getItem(LOCAL_STORAGE.SelectedWallet);
  const userWalletAddress =
    typeof window !== 'undefined' && window.localStorage.getItem(LOCAL_STORAGE.UserWalletAddress);

  const login = useCallback(
    async (wallet = selectedWallet) => {
      await onboard.walletSelect(wallet);
      await onboard.walletCheck();
    },
    [onboard, selectedWallet],
  );

  useEffect(() => {
    const updateUserAddress = (address: string): void => {
      dispatch(setUserAddress(address));
      window.localStorage.setItem(LOCAL_STORAGE.UserWalletAddress, address);
    };

    const onboardData = initOnboard({
      isDarkMode: theme.pulsar.id === 'PulsarDark',
      subscriptions: {
        address: updateUserAddress,
        wallet: (wallet) => {
          if (wallet.provider) {
            window.localStorage.setItem(LOCAL_STORAGE.SelectedWallet, wallet.name);
            const web3 = new Web3(wallet.provider);
            dispatch(setWeb3(web3));
          } else {
            window.localStorage.removeItem(LOCAL_STORAGE.SelectedWallet);
            window.localStorage.removeItem(LOCAL_STORAGE.UserWalletAddress);
          }
        },
      },
    });
    dispatch(setOnboard(onboardData));
  }, [dispatch, theme.pulsar.id]);

  useEffect(() => {
    (async () => {
      if (selectedWallet && userWalletAddress && onboard) {
        await login();
      }
    })();
  }, [onboard, login, selectedWallet, userWalletAddress]);

  return (
    <ConnectWalletContainer>
      <BackDrop />
      <ButtonConnect variant="primary" size="state" onClick={async () => await login(null)}>
        <FormattedMessage id="pool.connectWallet" />
      </ButtonConnect>
    </ConnectWalletContainer>
  );
};
