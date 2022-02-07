import { createToast } from '@swingby-protocol/pulsar';
import { SkybridgeTermsMessage } from '@swingby-protocol/sdk';
import Web3 from 'web3';

import { LOCAL_STORAGE } from '../env';

export const hasSignedTerms = async ({ address }: { address: string }): Promise<Boolean> => {
  const signedSignature = localStorage.getItem(LOCAL_STORAGE.Terms);
  if (!signedSignature) return false;

  const { message } = SkybridgeTermsMessage;
  const web3 = new Web3();
  const signedAddress = web3.eth.accounts.recover(message, signedSignature);
  if (!signedAddress) return false;

  const checkSumAddress = web3.utils.toChecksumAddress(address);
  const recoveredCheckSumAddress = web3.utils.toChecksumAddress(signedAddress);

  return checkSumAddress === recoveredCheckSumAddress;
};

export const signReminder = () =>
  createToast({
    content: 'Please sign on the Use of Terms before sending the transaction',
    type: 'danger',
    toastId: 'terms-error',
    autoClose: true,
  });
