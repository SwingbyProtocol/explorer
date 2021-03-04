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
import { toastWrongAddress } from '../../../../components/Toast';
import { useAffiliateCode } from '../../../affiliate-code';
import { ETHCoins } from '../../../coins';
import { scrollToTop, titleGenerator } from '../../../common';
import { mode, PATH } from '../../../env';
import { TSwapWidget, TTxRawObject } from '../../../explorer';
import { initOnboard } from '../../../onboard';
import { setOnboard } from '../../../store';
import { useThemeSettings } from '../../../store/settings';
import {
  Browser,
  BrowserAsset,
  BrowserDetail,
  BrowserFees,
  BrowserMetanodes,
  BrowserPool,
} from '../../Main';

import { ExplorerMainContainer, HeadLine, TitleH1 } from './styled';

export const ExplorerMain = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  useEffect(() => {
    scrollToTop();
  }, [currentPath]);

  const dispatch = useDispatch();
  const pool = useSelector((state) => state.pool);
  const { onboard } = pool;
  const swapDetails = useSelector((state) => state.explorer.swapDetails);
  const affiliateCode = useAffiliateCode();
  const [theme] = useThemeSettings();

  //Memo: For check walletAddress === tx.addressOut
  const [walletAddress, setWalletAddress] = useState(null);
  const [isClaimWidgetModalOpen, setIsClaimWidgetModalOpen] = useState(false);
  const [isDuplicateWidgetModalOpen, setIsDuplicateWidgetModalOpen] = useState(false);

  const login = useCallback(async () => {
    await onboard.walletSelect();
    await onboard.walletCheck();
  }, [onboard]);

  const linkToSwapWidget = useCallback(
    async (tx: TTxRawObject, action: TSwapWidget, userAddress = walletAddress) => {
      const formattedUserAddress = userAddress && userAddress.toLowerCase();
      const widget =
        action === 'claim'
          ? createWidget({
              mode,
              size: 'banner',
              resource: router.asPath.includes('float') ? 'pool' : 'swap',
              hash: tx.hash,
              theme,
              locale: router.locale,
              affiliateCode,
            })
          : createWidget({
              mode,
              size: 'big',
              resource: router.asPath.includes('float') ? 'pool' : 'swap',
              defaultCurrencyDeposit: tx.currencyIn as any,
              defaultCurrencyReceiving: tx.currencyOut as any,
              defaultAddressReceiving: tx.addressOut,
              defaultAmountDesired: tx.amountIn,
              theme,
              locale: router.locale,
              affiliateCode,
            });

      if (ETHCoins.includes(tx.currencyOut)) {
        if (tx.addressOut.toLowerCase() === formattedUserAddress) {
          action === 'claim' && window.open(getUrl({ widget }), '_blank', 'noopener');
          action === 'duplicate' && openPopup({ widget });
          return;
        }
        if (userAddress === null) {
          await login();
          return;
        }
        if (tx.addressOut.toLowerCase() !== formattedUserAddress && walletAddress !== undefined) {
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
    const handleSetWalletAddress = (address: string): void => {
      if (address !== undefined) {
        setWalletAddress(address);
      }
    };
    const onboardData = initOnboard({
      subscriptions: {
        address: handleSetWalletAddress,
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
      case PATH.ASSET_BTC:
        return <BrowserAsset />;
      case PATH.ASSET_WBTC:
        return <BrowserAsset />;

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
      case PATH.ASSET_BTC:
        return <></>;
      case PATH.ASSET_WBTC:
        return <></>;

      default:
        return <Search />;
    }
  };

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
        <ExplorerMainContainer>
          <HeadLine>
            <TitleH1>{titleGenerator(currentPath)}</TitleH1>
            <PulsarThemeProvider theme={theme}>
              {switchRightComponent(currentPath)}
            </PulsarThemeProvider>
          </HeadLine>
          <PulsarThemeProvider theme={theme}>
            {switchBrowser(currentPath)}
            <Footer />
          </PulsarThemeProvider>
        </ExplorerMainContainer>
      </PulsarThemeProvider>
    </>
  );
};
