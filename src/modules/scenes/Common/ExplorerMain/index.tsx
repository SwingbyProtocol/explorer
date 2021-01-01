import { PulsarThemeProvider } from '@swingby-protocol/pulsar';
import { createWidget, getUrl, openPopup } from '@swingby-protocol/widget';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AccountId } from '../../../../components/AccountId';
import { DuplicateSwapWidgetModal } from '../../../../components/DuplicateSwapWidgetModal';
import { Footer } from '../../../../components/Footer';
import { LinkToWidgetModal } from '../../../../components/LinkToWidgetModal';
import { Search } from '../../../../components/Search';
import { Star } from '../../../../components/Star';
import { toastWrongAddress } from '../../../../components/Toast';
import { ETHCoins } from '../../../coins';
import { titleGenerator } from '../../../common';
import { mode, PATH } from '../../../env';
import { TSwapWidget, TTxRawObject } from '../../../explorer';
import { initOnboard } from '../../../onboard';
import { setOnboard } from '../../../store';
import { Browser, BrowserDetail, BrowserFees, BrowserMetanodes, BrowserPool } from '../../Main';

import { ExplorerMainContainer, HeadLine, TitleH1 } from './styled';

export const ExplorerMain = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  const dispatch = useDispatch();
  const pool = useSelector((state) => state.pool);
  const { onboard } = pool;
  const explorer = useSelector((state) => state.explorer);
  const { swapDetails, themeMode } = explorer;

  //Memo: For check walletAddress === tx.addressOut
  const [walletAddress, setWalletAddress] = useState(null);
  const [isClaimWidgetModalOpen, setIsClaimWidgetModalOpen] = useState(false);
  const [isDuplicateWidgetModalOpen, setIsDuplicateWidgetModalOpen] = useState(false);

  // Memo: Scroll to top when go to another page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router.pathname]);

  const login = useCallback(async () => {
    await onboard.walletSelect();
    await onboard.walletCheck();
  }, [onboard]);

  const linkToSwapWidget = useCallback(
    async (tx: TTxRawObject, action: TSwapWidget, userAddress = walletAddress) => {
      const widget =
        action === 'claim'
          ? createWidget({
              mode,
              size: 'banner',
              resource: 'swap',
              hash: tx.hash,
              theme: themeMode,
              locale: router.locale,
            })
          : createWidget({
              mode,
              size: 'big',
              resource: 'swap',
              defaultCurrencyDeposit: tx.currencyIn as any,
              defaultCurrencyReceiving: tx.currencyOut as any,
              defaultAddressReceiving: tx.addressOut,
              defaultAmountDesired: tx.amountIn,
              theme: themeMode,
              locale: router.locale,
            });

      if (ETHCoins.includes(tx.currencyOut)) {
        if (tx.addressOut.toLowerCase() === userAddress) {
          action === 'claim' && window.open(getUrl({ widget }), '_blank', 'noopener');
          action === 'duplicate' && openPopup({ widget });
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
        // WHEN: Not swap to ERC20 coin
        action === 'claim' && setIsClaimWidgetModalOpen(true);
        action === 'duplicate' && setIsDuplicateWidgetModalOpen(true);
        return;
      }
    },
    // Memo: Do not add 'themeMode', so this function won't wake up when 'just' change the theme
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [login, onboard, walletAddress, router],
  );

  const runOnboard = useCallback(() => {
    const onboardData = initOnboard({
      subscriptions: {
        address: setWalletAddress,
      },
    });
    dispatch(setOnboard(onboardData));
  }, [dispatch]);

  const switchBrowser = (path: string): JSX.Element => {
    switch (path) {
      case PATH.ROOT:
        return (
          <Browser
            linkToSwapWidget={linkToSwapWidget}
            walletAddress={walletAddress}
            setWalletAddress={setWalletAddress}
            runOnboard={runOnboard}
          />
        );
      case PATH.SWAP + '/[hash]':
        return <BrowserDetail linkToSwapWidget={linkToSwapWidget} runOnboard={runOnboard} />;
      case PATH.FLOAT + '/[hash]':
        return <BrowserDetail linkToSwapWidget={linkToSwapWidget} runOnboard={runOnboard} />;
      case PATH.POOL:
        return <BrowserPool />;
      case PATH.METANODES:
        return <BrowserMetanodes />;
      case PATH.FEES:
        return <BrowserFees />;

      default:
        <Browser
          linkToSwapWidget={linkToSwapWidget}
          walletAddress={walletAddress}
          setWalletAddress={setWalletAddress}
          runOnboard={runOnboard}
        />;
    }
  };

  const switchRightComponent = (path: string): JSX.Element => {
    switch (path) {
      case PATH.ROOT:
        return <Search />;
      case PATH.SWAP + '/[hash]':
        return <Search />;
      case PATH.FLOAT + '/[hash]':
        return <Search />;
      case PATH.POOL:
        return <AccountId />;
      case PATH.METANODES:
        return <></>;
      case PATH.FEES:
        return <></>;

      default:
        return <Search />;
    }
  };

  const windowDimension = typeof window !== 'undefined' && window;
  const windowSize = { x: windowDimension.innerWidth, y: windowDimension.innerHeight };
  const randomize = (pos) => Math.random() * pos;
  const createElements = (num) => [...Array(num)];
  const [delay, setDelay] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setDelay(1);
    }, 1000);
  }, []);

  return (
    <>
      <LinkToWidgetModal
        isWidgetModalOpen={isClaimWidgetModalOpen}
        setIsWidgetModalOpen={setIsClaimWidgetModalOpen}
        tx={swapDetails}
      />
      <DuplicateSwapWidgetModal
        isWidgetModalOpen={isDuplicateWidgetModalOpen}
        setIsWidgetModalOpen={setIsDuplicateWidgetModalOpen}
        tx={swapDetails}
      />

      <PulsarThemeProvider theme="accent">
        {/* {createElements(7).map((el, i) => (
          <ShootingStar
            key={i}
            startX={randomize(windowSize.x)}
            startY={randomize(windowSize.y)}
            delay={randomize(10)}
          />
        ))} */}
        <ExplorerMainContainer>
          {createElements(70).map((el, i) => {
            return (
              <Star
                key={i}
                scale={randomize(1)}
                delay={randomize(delay)}
                xPos={randomize(windowSize.x)}
                yPos={randomize(300)}
              />
            );
          })}
          <HeadLine>
            <TitleH1>{titleGenerator(currentPath)}</TitleH1>
            <PulsarThemeProvider theme={themeMode}>
              {switchRightComponent(currentPath)}
            </PulsarThemeProvider>
          </HeadLine>
          <PulsarThemeProvider theme={themeMode}>
            {switchBrowser(currentPath)}
            <Footer />
          </PulsarThemeProvider>
        </ExplorerMainContainer>
      </PulsarThemeProvider>
    </>
  );
};
