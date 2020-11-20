import { Text } from '@swingby-protocol/pulsar';
import React from 'react';

import { exponentialToNumber, Reward, SwapRawObject } from '../../../explorer';

import {
  AddressP,
  IconLinkArrow,
  Coin,
  CoinContainer,
  FeeDistributionContainer,
  RewardsContainer,
  Row,
  SeeMore,
  SeeMoreRow,
  TitleText,
  IconRightArrow,
} from './styled';

interface Props {
  tx: SwapRawObject;
}

export const FeeDistribution = (props: Props) => {
  const { tx } = props;

  return (
    <FeeDistributionContainer>
      <TitleText variant="accent">Fee Distribution</TitleText>
      <RewardsContainer>
        {tx.rewards &&
          tx.rewards.map((reward: Reward, i: number) => {
            return (
              <Row key={i}>
                <CoinContainer>
                  <Coin symbol={tx.currencyOut} />
                  <Text variant="accent"> {exponentialToNumber(reward.amount)}</Text>
                </CoinContainer>
                <IconRightArrow />
                <AddressP>{reward.address}</AddressP>
              </Row>
            );
          })}
        {tx.rewards.length > 5 && (
          <SeeMoreRow>
            <SeeMore>
              {/* Todo: Add click logic */}
              <Text variant="accent">See more</Text>
              <IconLinkArrow />
            </SeeMore>
          </SeeMoreRow>
        )}
      </RewardsContainer>
    </FeeDistributionContainer>
  );
};
