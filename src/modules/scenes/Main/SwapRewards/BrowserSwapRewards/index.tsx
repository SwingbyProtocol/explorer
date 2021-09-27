import { Text } from '@swingby-protocol/pulsar';
import Head from 'next/head';
import React, { useMemo } from 'react';
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
  AmountRight,
  AmountLeft,
} from './styled';

export const BrowserSwapRewards = () => {
  const {
    user,
    rewards,
    claimRewards,
    bridge,
    isLoading,
    network,
    rewardsPercent,
  } = useGetSwapRewards();
  const { pending, claimed } = user;
  const { swapFrom, swapTo } = rewards;
  const rewardsCurrency = bridge === 'btc_bep20' ? 'BEP20 SWINGBY' : 'ERC20 SWINGBY';

  const widthAmountRight = useMemo(() => {
    const amount = Number(pending) > Number(claimed) ? Number(pending) : Number(claimed);
    return amount > 100000
      ? 116
      : amount > 10000
      ? 106
      : amount > 1000
      ? 96
      : amount > 100
      ? 86
      : 80;
  }, [claimed, pending]);

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
                        id={
                          network === 1 || network === 56 || network === 97
                            ? 'swap-rewards.preparing-contract'
                            : 'swap-rewards.earn-your-rewards'
                        }
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
                        <FormattedMessage
                          id="swap-rewards.rewards-amount"
                          values={{
                            value: (
                              <FormattedNumber
                                value={Number(rewardsPercent)}
                                maximumFractionDigits={1}
                                minimumFractionDigits={1}
                              />
                            ),
                          }}
                        />
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
                  <AmountLeft>
                    <TextFeature variant="normal">
                      <FormattedMessage id="swap-rewards.total-pending" />
                    </TextFeature>
                  </AmountLeft>
                  <AmountRight width={widthAmountRight}>
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
                  </AmountRight>
                </RowAmount>
                <RowAmount>
                  <AmountLeft>
                    <TextFeature variant="normal">
                      <FormattedMessage id="swap-rewards.total-claimed" />
                    </TextFeature>
                  </AmountLeft>
                  <AmountRight width={widthAmountRight}>
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
                  </AmountRight>
                </RowAmount>
              </RowAmounts>
              <RowClaim>
                <ButtonScale
                  variant="primary"
                  size="city"
                  shape="fill"
                  onClick={claimRewards}
                  disabled={Number(pending) === 0}
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
