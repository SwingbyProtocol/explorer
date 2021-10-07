import { Text, Tooltip, useMatchMedia } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

import { PATH } from '../../modules/env';
import { useDistributeRewards, useGetSignature, useToggleBridge } from '../../modules/hooks';
import { logger } from '../../modules/logger';
import { showConnectNetwork, useOnboard } from '../../modules/onboard';
import { ButtonScale } from '../../modules/scenes/Common';
import { StylingConstants } from '../../modules/styles';

import { RewardButtonContainer } from './styled';

export const RewardButton = () => {
  const { media } = StylingConstants;
  const lg = useMatchMedia({ query: `(min-width: ${rem(media.lg)})` });
  const sm = useMatchMedia({ query: `(min-width: ${rem(media.sm)})` });
  const { bridge } = useToggleBridge(PATH.METANODES);
  const { handleGetSignature, signature } = useGetSignature();
  const { distributeRewards } = useDistributeRewards();
  console.log('RewardButton, signature', signature);
  const { onboard } = useOnboard();

  useEffect(() => {
    (async () => {
      if (signature) {
        await distributeRewards();
      }
    })();
  }, [signature, distributeRewards]);

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
              await onboard.walletReset();
              setTimeout(async () => {
                await handleGetSignature();
              }, 500);
            })();
          }}
        >
          <FormattedMessage id="metanodes.distribute-rewards" />
        </ButtonScale>
      </Tooltip>
    </RewardButtonContainer>
  );
};
