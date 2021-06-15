import { createToast, Text, Tooltip, useMatchMedia } from '@swingby-protocol/pulsar';
import { CONTRACTS } from '@swingby-protocol/sdk';
import { rem } from 'polished';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Web3 from 'web3';
import { TransactionConfig } from 'web3-eth';

import { mode, PATH } from '../../modules/env';
import { useToggleBridge } from '../../modules/hooks';
import { showConnectNetwork, useOnboard } from '../../modules/onboard';
import { ButtonScale } from '../../modules/scenes/Common';
import { StylingConstants } from '../../modules/styles';

import { RewardButtonContainer } from './styled';

export const RewardButton = () => {
  const { media } = StylingConstants;
  const lg = useMatchMedia({ query: `(min-width: ${rem(media.lg)})` });
  const sm = useMatchMedia({ query: `(min-width: ${rem(media.sm)})` });
  const { bridge } = useToggleBridge(PATH.METANODES);
  const { onboard } = useOnboard();

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
        CONTRACTS.bridges[bridge][mode].abi,
        CONTRACTS.bridges[bridge][mode].address,
        wallet.provider,
      );

      const gasPrice = await web3.eth.getGasPrice();
      const rawTx: TransactionConfig = {
        chain: mode === 'production' ? 'mainnet' : 'goerli',
        nonce: await web3.eth.getTransactionCount(address),
        gasPrice: web3.utils.toHex(gasPrice),
        from: address,
        to: CONTRACTS.bridges[bridge][mode].address,
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

  return (
    <RewardButtonContainer>
      <Tooltip
        content={
          <Tooltip.Content>
            <Text variant="normal">
              <FormattedMessage
                id="metanodes.distribute-rewards-warning"
                values={{ network: showConnectNetwork(bridge) }}
              />
            </Text>
          </Tooltip.Content>
        }
        targetHtmlTag="span"
      >
        <ButtonScale
          size={lg ? 'country' : 'state'}
          shape={sm ? 'fit' : 'fill'}
          variant="primary"
          onClick={distributeRewards}
        >
          <FormattedMessage id="metanodes.distribute-rewards" />
        </ButtonScale>
      </Tooltip>
    </RewardButtonContainer>
  );
};
