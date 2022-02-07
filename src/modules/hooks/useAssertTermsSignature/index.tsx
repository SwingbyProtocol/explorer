import { createToast } from '@swingby-protocol/pulsar';
import { SkybridgeTermsMessage } from '@swingby-protocol/sdk';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Web3 from 'web3';

import { LOCAL_STORAGE } from '../../env';
import { logger } from '../../logger';
import { useOnboard } from '../../onboard';
import { hasSignedTerms } from '../../terms';

export const useAssertTermsSignature = () => {
  const { wallet, address, onboard } = useOnboard();
  const [isSigned, setIsSigned] = useState<boolean>(false);

  const connectWallet = useCallback(async () => {
    try {
      await onboard.walletSelect();
      if (!(await onboard.walletCheck())) {
        throw Error('Wallet check result is invalid');
      }
    } catch (error) {
      console.log('error wallet connect');
      logger.error(error);
    }
  }, [onboard]);

  const assertTermsSignature = useCallback(async () => {
    if (!wallet || !address) {
      throw new Error('No wallet connected');
    }

    const signed = await hasSignedTerms({ address });
    console.log('signed', signed);
    if (signed) {
      return true;
    }

    const { message, seed } = SkybridgeTermsMessage;
    if (!message || !seed) {
      throw new Error('No Terms of Service message found');
    }

    console.log('1');
    const web3 = new Web3(wallet.provider);
    console.log('2');
    const signature = await web3.eth.personal.sign(message, address, seed);
    console.log('3');
    localStorage.setItem(LOCAL_STORAGE.Terms, signature);
    return true;
  }, [address, wallet]);

  useEffect(() => {
    if (!address || isSigned) return;

    (async () => {
      try {
        const signed = await assertTermsSignature();
        setIsSigned(signed);
      } catch (error) {
        logger.error({ error }, 'Error sign on the terms');
        await onboard.walletReset();
        createToast({
          content: 'Signature request was rejected',
          type: 'danger',
          toastId: 'terms-error',
          autoClose: true,
        });
      }
    })();
  }, [address, assertTermsSignature, onboard, isSigned]);

  return useMemo(() => ({ assertTermsSignature, isSigned, connectWallet }), [
    assertTermsSignature,
    isSigned,
    connectWallet,
  ]);
};
