import { Text, Tooltip } from '@swingby-protocol/pulsar';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import { calculateFixedFee, TTxRawObject } from '../../../../explorer';
import { TextPrimary } from '../../../Common';
import { toggleIsExistPreviousPage } from '../../../../store';

import {
  Coin,
  CoinContainer,
  Row,
  SwapFeesContainer,
  TitleText,
  FeeBox,
  IconInfo,
  Top,
  Center,
} from './styled';

interface Props {
  tx: TTxRawObject;
}

export const SwapFees = (props: Props) => {
  const { tx } = props;
  const explorer = useSelector((state) => state.explorer);
  const { transactionFees } = explorer;
  const calculatedFees = transactionFees && calculateFixedFee(tx.feeCurrency, transactionFees);
  const dispatch = useDispatch();
  return (
    <SwapFeesContainer>
      <TitleText variant="accent">
        <FormattedMessage id="swap.swapFees" />
      </TitleText>
      <Row>
        <Top>
          <Tooltip
            content={
              <Tooltip.Content>
                <FormattedMessage id="swap.nodeExplanation1" />
                <TextPrimary>
                  <FormattedMessage id="common.click" />
                </TextPrimary>
                <FormattedMessage id="swap.nodeExplanation2" />
              </Tooltip.Content>
            }
            data-testid="tooltip"
          >
            <Link href="/fees">
              <IconInfo onClick={() => dispatch(toggleIsExistPreviousPage(true))} />
            </Link>
          </Tooltip>
        </Top>
        <Center>
          <CoinContainer>
            <Coin symbol={tx.feeCurrency} />
            <Text variant="accent"> {tx.fee}</Text>
          </CoinContainer>
          <FeeBox>
            <Text variant="masked">
              {calculatedFees && calculatedFees.feePercent}{' '}
              <FormattedMessage id="swap.minerFee" values={{ currency: tx.currencyIn }} />
            </Text>
          </FeeBox>
        </Center>
      </Row>
    </SwapFeesContainer>
  );
};
