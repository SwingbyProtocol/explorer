import { createToast } from '@swingby-protocol/pulsar';
import { SkybridgeMode, SkybridgeBridge } from '@swingby-protocol/sdk';
import Web3 from 'web3';

import { infuraApiKey } from '../env';

export { calculateGasMargin } from './calculateGasMargin';
export { generateSendParams } from './generateSendParams';
export { getUserBal } from './utils/';

export const createWeb3Instance = ({
  mode,
  bridge,
}: {
  mode: SkybridgeMode;
  bridge: SkybridgeBridge;
}) => {
  if (bridge === 'btc_skypool') {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        `https://${mode === 'production' ? 'mainnet' : 'ropsten'}.infura.io/v3/${infuraApiKey}`,
      ),
    );
    return web3;
  }

  throw new Error(`Could not build Web3 instance for "${bridge}"`);
};

export const generateWeb3ErrorToast = ({
  e,
  toastId,
}: {
  e: { code?: number; message?: string };
  toastId: string;
}): false => {
  // Reproduce: Firefox, Metamask(10.0.3), Ledger
  // e.message: "Invalid transaction params: params specify an EIP-1559 transaction but the current network does not support EIP-1559"
  const errorCode = -32602;
  if (e.code === errorCode) {
    createToast({
      content: 'Please make sure your Metamask version is newer than 10.1.0',
      type: 'danger',
      toastId,
      autoClose: true,
    });
    return false;
  }

  const errorMsg = e?.message.includes('[object Object]')
    ? 'Failed to send transaction'
    : e?.message || 'Failed to send transaction';

  createToast({
    content: errorMsg,
    type: 'danger',
    toastId,
    autoClose: true,
  });
  return false;
};
