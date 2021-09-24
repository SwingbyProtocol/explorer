import { Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';

import { CoinSymbol } from '../../modules/coins';
import { ButtonScale } from '../../modules/scenes/Common';
import { ConnectWalletMini } from '../ConnectWalletMini';

import {
  IconCoin,
  RowCoins,
  SwapRewardsModalContainer,
  IconArrow,
  IconTick,
  RowFeatures,
  TextFeature,
  RowTitle,
  RowAmounts,
  RowAmount,
  RowClaim,
  RewardModal,
  Bottom,
  Top,
  BgContainer,
  ModalContent,
  RowConnectWallet,
} from './styled';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const SwapRewardsModal = (props: Props) => {
  const { open, onClose } = props;
  const rewardsCoinFrom = CoinSymbol.WBTC;
  const rewardsCoinTo = CoinSymbol.BTC;
  const pendingRewards = 2291;
  const claimedRewards = 5000;

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
                <IconCoin symbol={rewardsCoinFrom} />
                <IconArrow />
                <IconCoin symbol={rewardsCoinTo} />
              </RowCoins>
              <RowTitle>
                <Text variant="section-title">
                  <FormattedMessage
                    id="swap-rewards.earn-your-rewards"
                    values={{
                      swapFrom: rewardsCoinFrom,
                      swapTo: rewardsCoinTo,
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
                            value={pendingRewards}
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
                            value={claimedRewards}
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
                <ButtonScale variant="primary" size="city" shape="fill">
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
