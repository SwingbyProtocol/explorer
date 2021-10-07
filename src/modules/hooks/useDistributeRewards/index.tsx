import { createToast } from '@swingby-protocol/pulsar';
import { CONTRACTS } from '@swingby-protocol/sdk';
import React, { useCallback, useEffect, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

import { useGetSignature, useToggleBridge } from '..';
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
  // const { signature } = useGetSignature();

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

  // const getSignature = useCallback(async () => {
  //   try {
  //     const web3 = new Web3(wallet.provider);
  //     const signature = await web3.eth.personal.sign(
  //       SIGNATURE_MESSAGE,
  //       address.toLowerCase(),
  //       SIGNATURE_SEED,
  //     );
  //     console.log('signature', signature);
  //     // Todo: POST the 'wallet address', 'Signature (Hex)' and 'SIGNATURE_MESSAGE'?? into DB

  //     await distributeRewards();
  //     return true;
  //   } catch (e) {
  //     logger.error('Error trying to get signature', e);
  //     generateWeb3ErrorToast({ e, toastId: 'getSignature' });
  //     await onboard.walletReset();
  //     return false;
  //   }
  // }, [address, wallet, onboard, distributeRewards]);

  // const connectWallet = useCallback(async () => {
  //   try {
  //     await onboard.walletSelect();
  //     if (!(await onboard.walletCheck())) {
  //       throw Error('Wallet check result is invalid');
  //     }
  //     console.log('wallet selected');
  //     return;
  //   } catch (error) {
  //     logger.error(error);
  //   }
  // }, [onboard]);

  // const handleDistribute = useCallback(async () => {
  //   if (!wallet && !address) {
  //     await connectWallet();
  //   }
  //   if (signature) {
  //     await distributeRewards();
  //   }
  // }, [connectWallet, distributeRewards, signature, wallet, address]);

  // useEffect(() => {
  //   (async () => {
  //     console.log('wallet', wallet);
  //     console.log('address', address);
  //     if (wallet && address) {
  //       // Todo: check the address is signed before.(get DB data from API)
  //       // run `getSignature()` if address has never signed.
  //       let signature = null; // Placeholder

  //       if (signature) {
  //         await distributeRewards();
  //         return;
  //       }
  //       console.log('go to getSignature');
  //       const isSigned = await getSignature();
  //       console.log('isSigned', isSigned);
  //       // if (isSigned) {
  //       //   distributeRewards();
  //       // }
  //     }
  //   })();
  // }, [getSignature, distributeRewards, address, wallet]);

  return useMemo(() => ({ distributeRewards }), [distributeRewards]);
};
