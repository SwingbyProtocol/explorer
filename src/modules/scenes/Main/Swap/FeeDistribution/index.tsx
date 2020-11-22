import { Text } from '@swingby-protocol/pulsar';
import React from 'react';

import { SeeMore } from '../../../../../components/SeeMore';
import { TXS_COUNT } from '../../../../env';
import { exponentialToNumber, Reward, SwapRawObject } from '../../../../explorer';

import {
  AddressP,
  Coin,
  CoinContainer,
  FeeDistributionContainer,
  IconRightArrow,
  RewardsContainer,
  Row,
  TitleText,
} from './styled';

interface Props {
  tx: SwapRawObject;
}

export const FeeDistribution = (props: Props) => {
  const { tx } = props;

  const rewardsDataSlice = tx.rewards.slice(0, TXS_COUNT);

  return (
    <FeeDistributionContainer>
      <TitleText variant="accent">Fee Distribution</TitleText>
      <RewardsContainer>
        {tx.rewards &&
          rewardsDataSlice.map((reward: Reward, i: number) => {
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
        {tx.rewards.length > 4 && tx.rewards.length !== 5 && <SeeMore />}
      </RewardsContainer>
    </FeeDistributionContainer>
  );
};
