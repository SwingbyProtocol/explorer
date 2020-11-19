import { Text } from '@swingby-protocol/pulsar';
import React from 'react';

import { exponentialToNumber, Reward } from '../../../explorer';

import {
  Coin,
  CoinContainer,
  FeeDistributionContainer,
  Row,
  AddressP,
  TitleText,
  RewardsContainer,
  SeeMore,
  Arrow,
  SeeMoreRow,
} from './styled';

interface Props {
  rewards: Reward[];
  currency: string;
}

export const FeeDistribution = (props: Props) => {
  const { rewards, currency } = props;

  return (
    <FeeDistributionContainer>
      <TitleText variant="accent">Fee Distribution</TitleText>
      <RewardsContainer>
        {rewards &&
          rewards.map((reward: Reward, i: number) => {
            return (
              <Row key={i}>
                <CoinContainer>
                  <Coin symbol={currency} />
                  <Text variant="accent"> {exponentialToNumber(reward.amount)}</Text>
                </CoinContainer>
                <AddressP>{reward.address}</AddressP>
              </Row>
            );
          })}
        <SeeMoreRow>
          <SeeMore>
            <Text variant="accent">See more</Text>
            <Arrow />
          </SeeMore>
        </SeeMoreRow>
      </RewardsContainer>
    </FeeDistributionContainer>
  );
};
