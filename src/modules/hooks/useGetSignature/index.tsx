import { useCallback, useEffect, useMemo, useState } from 'react';
import Web3 from 'web3';

import { SIGNATURE_MESSAGE, SIGNATURE_SEED } from '../../env';
import { logger } from '../../logger';
import { useOnboard } from '../../onboard';
import { generateWeb3ErrorToast } from '../../web3';

/*
 * Store the signature data who signed on Terms of Use.
 * To recover from signature(hex) -> await web3.eth.personal.ecRecover(SIGNATURE_MESSAGE, signature)
 *  >> returns signed `wallet address`.
 *
 * Fixme: Getting error when use 'Ledger' option with `Ethereum Ledger Live -m/44'/60'` derivation path
 * name: "TransportError", message: "Ledger Device is busy (lock getAddress)
 * Could be an error on 'Ledger Live App'.
 */

export const useGetSignature = () => {
  const { onboard, wallet, address } = useOnboard();
  const [signature, setSignature] = useState<string>('');

  const getSignature = useCallback(async () => {
    try {
      const web3 = new Web3(wallet.provider);
      const sign = await web3.eth.personal.sign(
        SIGNATURE_MESSAGE,
        address.toLowerCase(),
        SIGNATURE_SEED,
      );
      console.log('sign', sign);
      // Todo: POST the 'wallet address', 'Signature (Hex)' and 'SIGNATURE_MESSAGE'?? into DB
      setSignature(sign);
    } catch (e) {
      logger.error('Error trying to get signature', e);
      generateWeb3ErrorToast({ e, toastId: 'getSignature' });
      await onboard.walletReset();
    }
  }, [address, wallet, onboard]);

  const connectWallet = useCallback(async () => {
    try {
      await onboard.walletSelect();
      if (!(await onboard.walletCheck())) {
        throw Error('Wallet check result is invalid');
      }
    } catch (error) {
      logger.error(error);
    }
  }, [onboard]);

  useEffect(() => {
    (async () => {
      // Todo: fetch from DB
      let signatureInDB = null;
      if (signatureInDB) {
        setSignature(signatureInDB);
        return;
      }
      if (wallet && address && signature === '') {
        await getSignature();
        return;
      }
    })();
  }, [getSignature, wallet, address, signature]);

  return useMemo(() => ({ connectWallet, signature }), [connectWallet, signature]);
};
