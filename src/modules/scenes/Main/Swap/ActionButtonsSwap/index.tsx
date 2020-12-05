import { Button } from '@swingby-protocol/pulsar';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';

import { ETHCoins } from '../../../../coins';
import { NETWORK_MODE, WIDGET_URL } from '../../../../env';
import { SwapRawObject, TStatus } from '../../../../explorer';
import { initOnboard } from '../../../../onboard';
import { setOnboard } from '../../../../store';

import {
  ActionButtonsSwapContainer,
  ButtonClaimSwapRow,
  ButtonClaimSwapTablet,
  Buttons,
  SwapStatus,
} from './styled';

interface Props {
  tx: SwapRawObject;
}

export const ActionButtons = (props: Props) => {
  const { tx } = props;
  const theme = useTheme();
  const [walletAddress, setWalletAddress] = useState(null);
  const [toggleOpenLink, setToggleOpenLink] = useState(1);

  const pool = useSelector((state) => state.pool);
  const { onboard } = pool;
  const dispatch = useDispatch();

  const login = useCallback(async () => {
    await onboard.walletSelect();
    await onboard.walletCheck();
  }, [onboard]);

  const wrongAddress = () => {
    toast.error('Invalid wallet address, please check the tx again', {
      autoClose: 3000,
      draggable: true,
      hideProgressBar: true,
    });
  };

  const linkToSwapWidget = useCallback(
    async (tx: SwapRawObject, userAddress: string) => {
      const swap = NETWORK_MODE.TESTNET ? '/test/swap/' : '/swap/';
      const urlSwap = WIDGET_URL + swap + tx.hash;
      if (ETHCoins.includes(tx.currencyOut)) {
        if (tx.addressOut.toLowerCase() === userAddress) {
          window.open(urlSwap, '_blank', 'noopener');
          return;
        }
        if (userAddress === null) {
          await login();
          return;
        }
        if (tx.addressOut.toLowerCase() !== userAddress) {
          wrongAddress();
          return;
        }
      } else {
        window.open(urlSwap, '_blank', 'noopener');
        return;
      }
    },
    [login],
  );

  const runOnboard = useCallback(
    (theme: string) => {
      const onboardData = initOnboard({
        isDarkMode: theme === 'PulsarDark',
        subscriptions: {
          address: setWalletAddress,
        },
      });
      dispatch(setOnboard(onboardData));
    },
    [dispatch],
  );

  useEffect(() => {
    runOnboard(theme.pulsar.id);
  }, [theme.pulsar.id, runOnboard]);

  useEffect(() => {
    if (toggleOpenLink > 1) {
      linkToSwapWidget(tx, walletAddress);
    }
  }, [walletAddress, toggleOpenLink, linkToSwapWidget, tx]);

  return (
    <ActionButtonsSwapContainer>
      <SwapStatus
        status={tx.status as TStatus}
        currencyIn={tx.currencyIn}
        currencyOut={tx.currencyOut}
      />
      <Buttons>
        <Button variant="secondary" size="city">
          Duplicate
        </Button>
        <Button variant="primary" size="city">
          Share
        </Button>
        <ButtonClaimSwapTablet
          variant="tertiary"
          size="city"
          onClick={() => {
            setToggleOpenLink(toggleOpenLink + 1);
          }}
        >
          Claim Swap
        </ButtonClaimSwapTablet>
      </Buttons>
      <ButtonClaimSwapRow>
        <Button
          variant="tertiary"
          size="city"
          onClick={() => {
            setToggleOpenLink(toggleOpenLink + 1);
          }}
        >
          Claim Swap
        </Button>
      </ButtonClaimSwapRow>
    </ActionButtonsSwapContainer>
  );
};
