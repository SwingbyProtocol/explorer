import { createToast } from '@swingby-protocol/pulsar';
import { CONTRACTS } from '@swingby-protocol/sdk';
import React, { useCallback, useEffect, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

import { useToggleBridge } from '..';
import { ExplorerToast } from '../../../components/Toast';
import { mode, PATH, SIGNATURE_MESSAGE, SIGNATURE_SEED } from '../../env';
import { logger } from '../../logger';
import { useOnboard } from '../../onboard';
import { calculateGasMargin, generateSendParams, generateWeb3ErrorToast } from '../../web3';

/*
 * Store the signature data who signed on Terms of Use.
 * To recover from signature(hex) -> await web3.eth.personal.ecRecover(SIGNATURE_MESSAGE, signature)
 *  >> returns signed `wallet address`.
 *
 * Fixme: Getting error when use 'Ledger' option with `Ethereum Ledger Live -m/44'/60'` derivation path
 * name: "TransportError", message: "Ledger Device is busy (lock getAddress)
 * Could be an error on 'Ledger Live App'.
 */

export const useDistributeRewards = () => {
  const { onboard, wallet, address, network } = useOnboard();
  const { bridge } = useToggleBridge(PATH.METANODES);

  const distributeRewards = useCallback(async () => {
    try {
      const web3 = new Web3(wallet.provider);
      const contract = new web3.eth.Contract(
        CONTRACTS.bridges[bridge][mode].abi as AbiItem[],
        CONTRACTS.bridges[bridge][mode].address,
      );

      // Ref: https://swingby-workspace.slack.com/archives/C0183MH2S1W/p1627280984014500?thread_ts=1627278882.009000&cid=C0183MH2S1W
      const distributableRewards = await contract.methods.lockedLPTokensForNode().call();

      if (distributableRewards > 0) {
        const estimatedGas = await contract.methods
          .distributeNodeRewards()
          .estimateGas({ from: address });
        const gasLimit = calculateGasMargin(estimatedGas);
        const params = await generateSendParams({ from: address, network, gasLimit });

        if (!(await onboard.walletCheck())) {
          throw Error('Wallet check result is invalid');
        }

        return await contract.methods
          .distributeNodeRewards()
          .send(params)
          .on('transactionHash', (hash: string) => {
            createToast({
              content: <ExplorerToast network={network} hash={hash} isPending={true} />,
              type: 'success',
              toastId: `${hash}`,
              autoClose: true,
            });
          });
      } else {
        createToast({
          content: <FormattedMessage id="metanodes.distribute-rewards.rewards-not-enough" />,
          type: 'danger',
        });
      }
    } catch (e) {
      logger.error('Error trying to distribute rewards', e);
      generateWeb3ErrorToast({ e, toastId: 'distributeRewards' });
    } finally {
      try {
        await onboard.walletReset();
      } catch (e) {
        logger.error(e);
      }
    }
  }, [address, bridge, network, onboard, wallet]);

  const getSignature = useCallback(async () => {
    try {
      const web3 = new Web3(wallet.provider);
      const signature = await web3.eth.personal.sign(
        SIGNATURE_MESSAGE,
        address.toLowerCase(),
        SIGNATURE_SEED,
      );
      console.log('signature', signature);
      signature && distributeRewards();

      // Todo: POST the 'wallet address', 'Signature (Hex)' and 'SIGNATURE_MESSAGE'?? into DB
    } catch (e) {
      logger.error('Error trying to get signature', e);
      generateWeb3ErrorToast({ e, toastId: 'getSignature' });
    } finally {
      try {
        await onboard.walletReset();
      } catch (e) {
        logger.error(e);
      }
    }
  }, [address, wallet, onboard, distributeRewards]);

  const handleDistribute = useCallback(async () => {
    try {
      await onboard.walletSelect();
      return;
    } catch (error) {
      logger.error(error);
    }
  }, [onboard]);

  useEffect(() => {
    if (wallet && address) {
      // Todo: check the address is signed before. run `getSignature()` if address has never signed.
      // Placeholder
      let isSigned;

      if (isSigned) {
        distributeRewards();
        return;
      }

      getSignature();
    }
  }, [getSignature, distributeRewards, address, wallet]);

  return useMemo(() => ({ handleDistribute }), [handleDistribute]);
};
