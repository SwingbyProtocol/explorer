import { Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { useSelector } from 'react-redux';

import { calculateFixedFee } from '../../../explorer';

import { Coin, CoinContainer, Row, SwapFeesContainer, TitleText } from './styled';

interface Props {
  fee: string;
  currency: string;
}

export const SwapFees = (props: Props) => {
  const { fee, currency } = props;
  const explorer = useSelector((state) => state.explorer);
  const { transactionFees } = explorer;
  const calculatedFees = transactionFees && calculateFixedFee(currency, transactionFees);
  return (
    <SwapFeesContainer>
      <TitleText variant="accent">Swap Fees</TitleText>
      <Row>
        <CoinContainer>
          <Coin symbol={currency} />
          <Text variant="accent"> {fee}</Text>
        </CoinContainer>
        <Text variant="masked">
          {calculatedFees && calculatedFees.fixedFee}% +{' '}
          {calculatedFees && calculatedFees.feePercent} {currency}
        </Text>
      </Row>
    </SwapFeesContainer>
  );
};
