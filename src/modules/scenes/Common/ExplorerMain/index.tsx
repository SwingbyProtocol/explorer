import { PulsarThemeProvider } from '@swingby-protocol/pulsar';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';

import { AccountId } from '../../../../components/AccountId';
import { Search } from '../../../../components/Search';
import { toastWrongAddress } from '../../../../components/Toast';
import { ETHCoins } from '../../../coins';
import { titleGenerator } from '../../../common';
import { mode, PATH, WIDGET_URL } from '../../../env';
import { SwapRawObject } from '../../../explorer';
import { initOnboard } from '../../../onboard';
import { setOnboard } from '../../../store';
import { Browser, BrowserDetail, BrowserPool } from '../../Main';

import { ExplorerMainContainer, HeadLine, TitleH1 } from './styled';

export const ExplorerMain = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  const theme = useTheme();
  const dispatch = useDispatch();
  const pool = useSelector((state) => state.pool);
  const { onboard } = pool;

  //Memo: For check walletAddress === tx.addressOut
  const [walletAddress, setWalletAddress] = useState(null);

  const login = useCallback(async () => {
    await onboard.walletSelect();
    await onboard.walletCheck();
  }, [onboard]);

  const linkToSwapWidget = useCallback(
    async (tx: SwapRawObject, userAddress = walletAddress) => {
      const swap = mode === 'test' ? '/test/swap/' : '/swap/';
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
        if (tx.addressOut.toLowerCase() !== userAddress && walletAddress !== undefined) {
          toastWrongAddress();
          setWalletAddress(null);
          onboard.walletReset();
          return;
        }
        if (walletAddress === undefined) {
          setWalletAddress(null);
          return;
        }
      } else {
        window.open(urlSwap, '_blank', 'noopener');
        return;
      }
    },
    [login, onboard, walletAddress],
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

  const switchBrowser = (path: string): JSX.Element => {
    switch (path) {
      case PATH.ROOT:
        return (
          <Browser
            linkToSwapWidget={linkToSwapWidget}
            walletAddress={walletAddress}
            setWalletAddress={setWalletAddress}
            runOnboard={runOnboard}
            theme={theme.pulsar.id}
          />
        );
      case PATH.SWAP + '/[hash]':
        return (
          <BrowserDetail
            linkToSwapWidget={linkToSwapWidget}
            runOnboard={runOnboard}
            theme={theme.pulsar.id}
          />
        );
      case PATH.POOL:
        return <BrowserPool />;

      default:
        <Browser
          linkToSwapWidget={linkToSwapWidget}
          walletAddress={walletAddress}
          setWalletAddress={setWalletAddress}
          runOnboard={runOnboard}
          theme={theme.pulsar.id}
        />;
    }
  };

  const switchRightComponent = (path: string): JSX.Element => {
    switch (path) {
      case PATH.ROOT:
        return <Search />;
      case PATH.SWAP + '/[hash]':
        return <Search />;
      case PATH.POOL:
        return <AccountId />;

      default:
        return <Search />;
    }
  };

  return (
    <PulsarThemeProvider theme="accent">
      <ExplorerMainContainer>
        <HeadLine>
          <TitleH1>{titleGenerator(currentPath)}</TitleH1>
          <PulsarThemeProvider>{switchRightComponent(currentPath)}</PulsarThemeProvider>
        </HeadLine>
        <PulsarThemeProvider>{switchBrowser(currentPath)}</PulsarThemeProvider>
      </ExplorerMainContainer>
    </PulsarThemeProvider>
  );
};
