import { createWidget, getUrl, openPopup } from '@swingby-protocol/widget';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { toastWrongAddress } from '../../../components/Toast';
import { useAffiliateCode } from '../../affiliate-code';
import { CoinSymbol, EthereumWalletAddressCoins } from '../../coins';
import { mode } from '../../env';
import { TSwapWidget, TTxRawObject } from '../../explorer';
import { useOnboard } from '../../onboard';
import { useThemeSettings } from '../../store/settings';

interface IData {
  action: TSwapWidget | null;
  toggleOpenLink: number;
  tx: TTxRawObject;
  setToggleOpenLink: (arg: number) => void;
}

export const useLinkToWidget = (data: IData) => {
  const { toggleOpenLink, tx, action, setToggleOpenLink } = data;
  const router = useRouter();
  const [theme] = useThemeSettings();
  const affiliateCode = useAffiliateCode();
  const { onboard, address } = useOnboard();
  const [walletAddress, setWalletAddress] = useState(null);
  const [isClaimWidgetModalOpen, setIsClaimWidgetModalOpen] = useState(false);
  const [isDuplicateWidgetModalOpen, setIsDuplicateWidgetModalOpen] = useState(false);

  const formattedUserAddress = address && address.toLowerCase();

  const login = useCallback(async () => {
    await onboard?.walletSelect();
    await onboard?.walletCheck();
  }, [onboard]);

  useEffect(() => {
    if (tx && toggleOpenLink > 1) {
      // Memo: Widget config for ETH bridge
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

      // Memo: Open the ^widget for ETH coins
      if (EthereumWalletAddressCoins.includes(tx?.currencyOut as CoinSymbol)) {
        if (tx.addressOut.toLowerCase() === formattedUserAddress) {
          action === 'claim' && window.open(getUrl({ widget }), '_blank', 'noopener');
          action === 'duplicate' && openPopup({ widget });
          setToggleOpenLink(1);
          return;
        }
        if (formattedUserAddress === null) {
          login();
          return;
        }

        if (tx.addressOut.toLowerCase() !== formattedUserAddress) {
          toastWrongAddress();
          setWalletAddress(null);
          onboard.walletReset();
          return;
        }

        if (!address) {
          setWalletAddress(null);
          setToggleOpenLink(1);
          return;
        }
      } else {
        // WHEN: Not swap to ERC20 coin
        action === 'claim' && setIsClaimWidgetModalOpen(true);
        action === 'duplicate' && setIsDuplicateWidgetModalOpen(true);
        setToggleOpenLink(1);
        return;
      }
    }
  }, [
    tx,
    toggleOpenLink,
    action,
    affiliateCode,
    formattedUserAddress,
    theme,
    login,
    router,
    walletAddress,
    onboard,
    setToggleOpenLink,
    address,
  ]);

  return {
    isClaimWidgetModalOpen,
    isDuplicateWidgetModalOpen,
    setIsClaimWidgetModalOpen,
    setIsDuplicateWidgetModalOpen,
  };
};
