import { Text, Tooltip, useMatchMedia } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { delay } from '../../modules/common';
import { useAssertTermsSignature, useDistributeRewards } from '../../modules/hooks';
import { showConnectNetwork, useOnboard } from '../../modules/onboard';
import { ButtonScale } from '../../modules/scenes/Common';
import { StylingConstants } from '../../modules/styles';

import { RewardButtonContainer } from './styled';

export const RewardButton = () => {
  const { media } = StylingConstants;
  const lg = useMatchMedia({ query: `(min-width: ${rem(media.lg)})` });
  const sm = useMatchMedia({ query: `(min-width: ${rem(media.sm)})` });
  const { distributeRewards } = useDistributeRewards();
  const { onboard, address } = useOnboard();
  const { isSigned, connectWallet } = useAssertTermsSignature();
  const [isSending, setIsSending] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (!address || !isSigned || isSending) {
        return;
      }
      if (!isSending) {
        try {
          setIsSending(true);
          await distributeRewards().catch((error) => console.log(error.message));
        } catch (error) {
          console.log(error.message);
        } finally {
          await onboard.walletReset();
        }
      }
    })();
  }, [distributeRewards, address, isSigned, onboard, isSending, setIsSending]);

  return (
    <RewardButtonContainer>
      <Tooltip
        content={
          <Tooltip.Content>
            <Text variant="normal">
              <FormattedMessage
                id="metanodes.distribute-rewards-warning"
                values={{ network: showConnectNetwork() }}
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
              if (isSending) {
                setIsSending(false);
              }
              // Memo: Reset 'address' for connectWallet.
              await onboard.walletReset();
              await delay(1000);
              await connectWallet();
            })();
          }}
        >
          <FormattedMessage id="metanodes.distribute-rewards" />
        </ButtonScale>
      </Tooltip>
    </RewardButtonContainer>
  );
};
