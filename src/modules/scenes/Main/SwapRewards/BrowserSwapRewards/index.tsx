import { Text } from '@swingby-protocol/pulsar';
import Head from 'next/head';
import React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';

import { ConnectWalletMini } from '../../../../../components/ConnectWalletMini';
import { GoBackArrow } from '../../../../../components/GoBackArrow';
import { Loader } from '../../../../../components/Loader';
import { useGetSwapRewards } from '../../../../hooks';
import { ButtonScale } from '../../../Common';

import {
  BackIconBox,
  BgContainer,
  Bottom,
  BrowserSwapRewardsContainer,
  BrowserSwapRewardsDiv,
  IconArrow,
  IconCoin,
  IconTick,
  RowAmount,
  RowAmounts,
  RowClaim,
  RowCoins,
  Middle,
  RowFeatures,
  RowTitle,
  TextFeature,
  Top,
  RowFeature,
} from './styled';

export const BrowserSwapRewards = () => {
  const { user, rewards, claimRewards, network, isLoading } = useGetSwapRewards();
  const { pending, claimed } = user;
  const { swapFrom, swapTo } = rewards;
  const rewardsCurrency = network === 56 || network === 97 ? 'BEP20 SWINGBY' : 'ERC20 SWINGBY';

  return (
    <>
      <Head>
        <title>Swingby Explorer | Swap Rewards</title>
      </Head>
      <BrowserSwapRewardsContainer>
        <BrowserSwapRewardsDiv size="bare">
          <BgContainer>
            <Top>
              <BackIconBox>
                <GoBackArrow />
              </BackIconBox>
              <ConnectWalletMini />
            </Top>
            <Middle>
              {isLoading ? (
                <Loader minHeight={180} />
              ) : (
                <>
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
                    <RowFeature>
                      <IconTick />
                      <TextFeature variant="normal">
                        <FormattedMessage id="swap-rewards.rewards-amount" />
                      </TextFeature>
                    </RowFeature>
                    <RowFeature>
                      <IconTick />
                      <TextFeature variant="normal">
                        <FormattedMessage
                          id="swap-rewards.paid-by"
                          values={{ value: rewardsCurrency }}
                        />
                      </TextFeature>
                    </RowFeature>
                  </RowFeatures>
                </>
              )}
            </Middle>
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
                            value={Number(pending)}
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
                            value={Number(claimed)}
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
                  disabled={!network || Number(pending) === 0}
                >
                  <FormattedMessage id="common.claim" />
                </ButtonScale>
              </RowClaim>
            </Bottom>
          </BgContainer>
        </BrowserSwapRewardsDiv>
      </BrowserSwapRewardsContainer>
    </>
  );
};
