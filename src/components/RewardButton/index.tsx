import { createToast, Text, Tooltip, useMatchMedia } from '@swingby-protocol/pulsar';
import { CONTRACTS } from '@swingby-protocol/sdk';
import { rem } from 'polished';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

import { mode, PATH } from '../../modules/env';
import { useToggleBridge } from '../../modules/hooks';
import { showConnectNetwork, useOnboard } from '../../modules/onboard';
import { ButtonScale } from '../../modules/scenes/Common';
import { StylingConstants } from '../../modules/styles';
import { calculateGasMargin, generateSendParams } from '../../modules/web3';

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
    const network = onboard.getState().network;

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

        return await contract.methods.distributeNodeRewards().send(params);
      } else {
        createToast({
          content: <FormattedMessage id="metanodes.distribute-rewards.rewards-not-enough" />,
          type: 'danger',
        });
      }
    } catch (e) {
      console.error('Error trying to distribute rewards', e);
      createToast({ content: e?.message || 'Failed to send transaction', type: 'danger' });
    } finally {
      try {
        await onboard.walletReset();
      } catch (e) {
        console.log(e);
      }
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
