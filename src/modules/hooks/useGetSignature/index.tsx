import { useCallback, useEffect, useMemo, useState } from 'react';
import Web3 from 'web3';

import {
  useHasSignedTermsQuery,
  useSignTermsMutation,
  useTermsMessageQuery,
} from '../../../generated/graphql';
import { logger } from '../../logger';
import { useOnboard } from '../../onboard';
import { generateWeb3ErrorToast } from '../../web3';

/*
 * Store the signature data who signed on Terms of Use.
 * To recover from signature(hex) -> await web3.eth.personal.ecRecover(SIGNATURE_MESSAGE, signature)
 *  >> returns signed `wallet address`.
 *  !! MUST use same wallet.provider (same address?) to make web3 instance. const web3 = new Web3(wallet.provider)
 *
 * Fixme: Getting error when use 'Ledger' option with `Ethereum Ledger Live -m/44'/60'` derivation path
 * name: "TransportError", message: "Ledger Device is busy (lock getAddress)
 * Could be an error on 'Ledger Live App'.
 */

export const useGetSignature = () => {
  const [isSigned, setIsSigned] = useState<Boolean>(false);
  const { onboard, wallet, address } = useOnboard();
  const { data: msgData } = useTermsMessageQuery();
  const { data: addressTerms, loading } = useHasSignedTermsQuery({
    variables: {
      address,
    },
  });
  const [signTerms] = useSignTermsMutation();

  const getSignature = useCallback(async () => {
    if (msgData) {
      const message = msgData && msgData.termsMessage.message;
      const seed = msgData && msgData.termsMessage.seed;
      try {
        const web3 = new Web3(wallet.provider);
        const signature = await web3.eth.personal.sign(message, address, seed);
        signTerms({ variables: { address, signature } });
        setIsSigned(true);
      } catch (e) {
        logger.error('Error trying to get signature', e);
        generateWeb3ErrorToast({ e, toastId: 'getSignature' });
        await onboard.walletReset();
      }
    }
  }, [address, wallet, onboard, msgData, signTerms]);

  const connectWallet = useCallback(async () => {
    try {
      onboard.walletSelect().then(async () => {
        if (!(await onboard.walletCheck())) {
          throw Error('Wallet check result is invalid');
        }
      });
    } catch (error) {
      console.log('error wallet connect');
      logger.error(error);
    }
  }, [onboard]);

  useEffect(() => {
    (async () => {
      if (!loading && addressTerms !== undefined && wallet && address) {
        if (addressTerms.hasSignedTerms) {
          setIsSigned(true);
          return;
        }
        if (!addressTerms.hasSignedTerms) {
          await getSignature();
          return;
        }
      }
    })();
  }, [getSignature, wallet, address, addressTerms, isSigned, loading]);

  return useMemo(() => ({ connectWallet, isSigned }), [connectWallet, isSigned]);
};
