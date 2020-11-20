import { Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { useSelector } from 'react-redux';

import { calculateFixedFee, SwapRawObject } from '../../../../explorer';

import { Coin, CoinContainer, Row, SwapFeesContainer, TitleText } from './styled';

interface Props {
  tx: SwapRawObject;
}

export const SwapFees = (props: Props) => {
  const { tx } = props;
  const explorer = useSelector((state) => state.explorer);
  const { transactionFees } = explorer;
  const calculatedFees = transactionFees && calculateFixedFee(tx.feeCurrency, transactionFees);
  return (
    <SwapFeesContainer>
      <TitleText variant="accent">Swap Fees</TitleText>
      <Row>
        <CoinContainer>
          <Coin symbol={tx.feeCurrency} />
          <Text variant="accent"> {tx.fee}</Text>
        </CoinContainer>
        <Text variant="masked">
          {calculatedFees && calculatedFees.fixedFee}% +{' '}
          {calculatedFees && calculatedFees.feePercent} {tx.feeCurrency}
        </Text>
      </Row>
    </SwapFeesContainer>
  );
};
