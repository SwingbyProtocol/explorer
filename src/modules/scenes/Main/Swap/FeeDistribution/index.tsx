import { Text } from '@swingby-protocol/pulsar';
import React from 'react';

import { SeeMore } from '../../../../../components/SeeMore';
import { TXS_COUNT } from '../../../../env';
import { exponentialToNumber, Reward, SwapRawObject } from '../../../../explorer';
import { transactionDetail } from '../../../../swap';
import { IconInfo } from '../../../Common';

import {
  AddressP,
  Coin,
  CoinContainer,
  FeeDistributionContainer,
  IconRightArrow,
  RewardsContainer,
  Row,
  TitleRow,
  TitleText,
} from './styled';

interface Props {
  tx: SwapRawObject;
}

export const FeeDistribution = (props: Props) => {
  const { tx } = props;
  console.log('tx', tx);

  const rewardsDataSlice = tx.rewards.slice(0, TXS_COUNT);

  return (
    <FeeDistributionContainer>
      <TitleRow>
        <TitleText variant="accent">Fee Distribution</TitleText>
        {tx.rewards[0].txId && (
          <a
            href={transactionDetail(tx.currencyOut, tx.rewards[0].txId)}
            rel="noopener noreferrer"
            target="_blank"
          >
            <IconInfo />
          </a>
        )}
      </TitleRow>
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
