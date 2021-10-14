import { Text, Tooltip, useMatchMedia } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

import { PATH } from '../../modules/env';
import { useDistributeRewards, useGetSignature, useToggleBridge } from '../../modules/hooks';
import { showConnectNetwork, useOnboard } from '../../modules/onboard';
import { ButtonScale } from '../../modules/scenes/Common';
import { StylingConstants } from '../../modules/styles';

import { RewardButtonContainer } from './styled';

export const RewardButton = () => {
  const { media } = StylingConstants;
  const lg = useMatchMedia({ query: `(min-width: ${rem(media.lg)})` });
  const sm = useMatchMedia({ query: `(min-width: ${rem(media.sm)})` });
  const { bridge } = useToggleBridge(PATH.METANODES);
  const { connectWallet, isSigned } = useGetSignature();
  const { distributeRewards } = useDistributeRewards();
  const { onboard } = useOnboard();
  console.log('isSigned RewardButton', isSigned);

  useEffect(() => {
    (async () => {
      if (isSigned) {
        await distributeRewards();
      }
    })();
  }, [isSigned, distributeRewards]);

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
          onClick={() => {
            (async () => {
              // Memo: Reset 'address' for connectWallet.
              await onboard.walletReset();
              setTimeout(async () => {
                await connectWallet();
              }, 1000);
            })();
          }}
        >
          <FormattedMessage id="metanodes.distribute-rewards" />
        </ButtonScale>
      </Tooltip>
    </RewardButtonContainer>
  );
};
