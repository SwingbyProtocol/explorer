import { Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';

import { useGetSwapRewards } from '../../modules/hooks';
import { ButtonScale } from '../../modules/scenes/Common';
import { ConnectWalletMini } from '../ConnectWalletMini';

import {
  BgContainer,
  Bottom,
  IconArrow,
  IconCoin,
  IconTick,
  ModalContent,
  RewardModal,
  RowAmount,
  RowAmounts,
  RowClaim,
  RowCoins,
  RowConnectWallet,
  RowFeatures,
  RowTitle,
  SwapRewardsModalContainer,
  TextFeature,
  Top,
} from './styled';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const SwapRewardsModal = (props: Props) => {
  const { open, onClose } = props;
  const { rewards, claimRewards, network } = useGetSwapRewards();
  const { swapFrom, swapTo, pending, claimed } = rewards;

  return (
    <RewardModal open={open} onClose={onClose}>
      <ModalContent>
        <BgContainer>
          <RowConnectWallet>
            <ConnectWalletMini />
          </RowConnectWallet>
          <SwapRewardsModalContainer>
            <Top>
              <RowCoins>
                <IconCoin symbol={swapFrom} />
                <IconArrow />
                <IconCoin symbol={swapTo} />
              </RowCoins>
              <RowTitle>
                <Text variant="section-title">
                  <FormattedMessage
                    id="swap-rewards.earn-your-rewards"
                    values={{
                      swapFrom,
                      swapTo,
                    }}
                  />
                </Text>
              </RowTitle>
              <RowFeatures>
                <IconTick />
                <TextFeature variant="normal">
                  <FormattedMessage id="swap-rewards.rewards-amount" />
                </TextFeature>
              </RowFeatures>
            </Top>
            <Bottom>
              <RowAmounts>
                <RowAmount>
                  <TextFeature variant="normal">
                    <FormattedMessage id="swap-rewards.total-pending" />
                  </TextFeature>
                  <TextFeature variant="normal">
                    <FormattedMessage
                      id="common.value.swingby"
                      values={{
                        value: (
                          <FormattedNumber
                            value={pending}
                            maximumFractionDigits={0}
                            minimumFractionDigits={0}
                          />
                        ),
                      }}
                    />
                  </TextFeature>
                </RowAmount>
                <RowAmount>
                  <TextFeature variant="normal">
                    <FormattedMessage id="swap-rewards.total-claimed" />
                  </TextFeature>
                  <TextFeature variant="normal">
                    <FormattedMessage
                      id="common.value.swingby"
                      values={{
                        value: (
                          <FormattedNumber
                            value={claimed}
                            maximumFractionDigits={0}
                            minimumFractionDigits={0}
                          />
                        ),
                      }}
                    />
                  </TextFeature>
                </RowAmount>
              </RowAmounts>
              <RowClaim>
                <ButtonScale
                  variant="primary"
                  size="city"
                  shape="fill"
                  onClick={claimRewards}
                  disabled={!network || pending === 0}
                >
                  <FormattedMessage id="common.claim" />
                </ButtonScale>
              </RowClaim>
            </Bottom>
          </SwapRewardsModalContainer>
        </BgContainer>
      </ModalContent>
    </RewardModal>
  );
};
