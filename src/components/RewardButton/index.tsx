import { Button, createToast, useMatchMedia } from '@swingby-protocol/pulsar';
import { CONTRACTS } from '@swingby-protocol/sdk';
import type { API as OnboardApi } from 'bnc-onboard/dist/src/interfaces'; // eslint-disable-line import/no-internal-modules
import { rem } from 'polished';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Web3 from 'web3';
import { TransactionConfig } from 'web3-eth';

import { mode } from '../../modules/env';
import { initOnboard } from '../../modules/onboard';
import { StylingConstants } from '../../modules/styles';

import { RewardButtonContainer } from './styled';

export const RewardButton = () => {
  const { media } = StylingConstants;
  const lg = useMatchMedia({ query: `(min-width: ${rem(media.lg)})` });
  const md = useMatchMedia({ query: `(min-width: ${rem(media.md)})` });
  const sm = useMatchMedia({ query: `(min-width: ${rem(media.sm)})` });
  const [onboard, setOnboard] = useState<OnboardApi>(null);

  const distributeRewards = async () => {
    await onboard.walletSelect();
    if (!(await onboard.walletCheck())) {
      return;
    }

    const wallet = onboard.getState().wallet;
    const address = onboard.getState().address;

    try {
      const web3 = new Web3(wallet.provider);
      const contract = new web3.eth.Contract(
        CONTRACTS.skybridge[mode].abi,
        CONTRACTS.skybridge[mode].address,
        wallet.provider,
      );

      const gasPrice = await web3.eth.getGasPrice();
      const rawTx: TransactionConfig = {
        chain: mode === 'production' ? 'mainnet' : 'goerli',
        nonce: await web3.eth.getTransactionCount(address),
        gasPrice: web3.utils.toHex(gasPrice),
        from: address,
        to: CONTRACTS.skybridge[mode].address,
        value: '0x0',
        data: contract.methods.distributeNodeRewards().encodeABI(),
      };

      console.debug('Will call estimateGas()', rawTx);
      const estimatedGas = await web3.eth.estimateGas(rawTx);
      if (!estimatedGas) {
        console.warn(`Did not get any value from estimateGas(): ${estimatedGas}`, rawTx);
      } else {
        console.debug(
          `Estimated gas that will be spent ${estimatedGas} (price: ${web3.utils.fromWei(
            gasPrice,
            'ether',
          )} ETH)`,
          rawTx,
        );
      }

      return await web3.eth.sendTransaction({ ...rawTx, gas: estimatedGas });
    } catch (e) {
      console.error('Error trying to distribute rewards', e);
      createToast({ content: e?.message || 'Failed to send transaction', type: 'danger' });
    } finally {
      try {
        await onboard.walletReset();
      } catch (e) {}
    }
  };

  useEffect(() => {
    setOnboard(initOnboard({ subscriptions: {} }));
  }, []);

  return (
    <RewardButtonContainer>
      <Button
        size={lg ? 'country' : md ? 'state' : 'country'}
        shape={sm ? 'fit' : 'fill'}
        variant="tertiary"
        onClick={distributeRewards}
      >
        <FormattedMessage id="metanodes.distribute-rewards" />
      </Button>
    </RewardButtonContainer>
  );
};
