import { Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { SeeMore } from '../../../../../components/SeeMore';
import { TXS_COUNT } from '../../../../env';
import { exponentialToNumber, Reward, TTxRawObject } from '../../../../explorer';
import { transactionDetailByAddress, transactionDetailByTxId } from '../../../../swap';
import { Atag, IconInfo } from '../../../Common';

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
  tx: TTxRawObject;
}

export const FeeDistribution = (props: Props) => {
  const { tx } = props;

  const rewardsDataSlice = tx.rewards.slice(0, TXS_COUNT);

  return (
    <FeeDistributionContainer>
      <TitleRow>
        <TitleText variant="accent">
          <FormattedMessage id="swap.feeDistribution" />
        </TitleText>
        {tx.rewards[0].txId && (
          <a
            href={transactionDetailByTxId(tx.currencyOut, tx.rewards[0].txId)}
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
                <Atag
                  href={transactionDetailByAddress(tx.currencyOut, reward.address)}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <AddressP>{reward.address}</AddressP>
                </Atag>
              </Row>
            );
          })}
        {tx.rewards.length > 4 && tx.rewards.length !== 5 && <SeeMore />}
      </RewardsContainer>
    </FeeDistributionContainer>
  );
};
