import React, { useCallback, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';

import { LOCAL_STORAGE, mode, PATH } from '../../../../env';
import { useToggleBridge } from '../../../../hooks';
import { initOnboard } from '../../../../onboard';
import { setOnboard, setUserAddress } from '../../../../store';

import { BackDrop, ButtonConnect, ConnectWalletContainer } from './styled';

export const ConnectWallet = () => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const pool = useSelector((state) => state.pool);
  const { onboard } = pool;
  const { bridge } = useToggleBridge(PATH.POOL);

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
      const formattedAddress = address ? address.toLowerCase() : address;
      dispatch(setUserAddress(formattedAddress));
      window.localStorage.setItem(LOCAL_STORAGE.UserWalletAddress, formattedAddress);
    };

    const onboardData =
      bridge &&
      initOnboard({
        subscriptions: {
          address: updateUserAddress,
          wallet: (wallet) => {
            if (wallet.provider) {
              window.localStorage.setItem(LOCAL_STORAGE.SelectedWallet, wallet.name);
            } else {
              window.localStorage.removeItem(LOCAL_STORAGE.SelectedWallet);
              window.localStorage.removeItem(LOCAL_STORAGE.UserWalletAddress);
            }
          },
        },
        mode,
        bridge,
      });
    dispatch(setOnboard(onboardData));
  }, [dispatch, theme.pulsar.id, bridge]);

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
