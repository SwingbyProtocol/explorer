import { Text, Tooltip } from '@swingby-protocol/pulsar';
import { estimateAmountReceiving } from '@swingby-protocol/sdk';
import Link from 'next/link';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';

import { TTxRawObject } from '../../../../explorer';
import { useSdkContext } from '../../../../sdk-context';
import { toggleIsExistPreviousPage } from '../../../../store';
import { swingbyTextDisplay } from '../../../../coins';

import {
  Center,
  Coin,
  CoinContainer,
  FeeBox,
  IconInfo,
  Row,
  SwapFeesContainer,
  TitleText,
  Top,
  TextPrimary,
} from './styled';

interface Props {
  tx: TTxRawObject;
}

export const SwapFees = (props: Props) => {
  const { tx } = props;
  const [bridgeFee, setBridgeFee] = useState(null);
  const context = useSdkContext();
  (async () => {
    try {
      const { feeBridgeFraction } = await estimateAmountReceiving({
        context,
        currencyDeposit: tx.currencyIn,
        currencyReceiving: tx.currencyOut,
        amountDesired: tx.amountOut,
      });
      setBridgeFee(Number(feeBridgeFraction) * 100);
    } catch (e) {
      console.log(e);
    }
  })();

  const dispatch = useDispatch();
  return (
    <SwapFeesContainer>
      <TitleText variant="accent">
        <FormattedMessage id="swap.swap-fees" />
      </TitleText>
      <Row>
        <Top>
          <Tooltip
            content={
              <Tooltip.Content>
                <FormattedMessage id="swap.node-explanation1" />
                <Link href="/fees">
                  <TextPrimary>
                    <FormattedMessage id="common.click" />
                  </TextPrimary>
                </Link>
                <FormattedMessage id="swap.node-explanation2" />
              </Tooltip.Content>
            }
            data-testid="tooltip"
            interactive={true}
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
              {bridgeFee}{' '}
              <FormattedMessage
                id="swap.miner-fee"
                values={{ currency: swingbyTextDisplay(tx.currencyIn) }}
              />
            </Text>
          </FeeBox>
        </Center>
      </Row>
    </SwapFeesContainer>
  );
};
