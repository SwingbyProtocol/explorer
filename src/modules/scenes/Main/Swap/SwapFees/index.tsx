import { Text, Tooltip } from '@swingby-protocol/pulsar';
import { buildContext, estimateAmountReceiving } from '@swingby-protocol/sdk';
import Link from 'next/link';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';

import { mode } from '../../../../env';
import { TTxRawObject } from '../../../../explorer';
import { toggleIsExistPreviousPage } from '../../../../store';
import { TextPrimary } from '../../../Common';

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
} from './styled';

interface Props {
  tx: TTxRawObject;
}

export const SwapFees = (props: Props) => {
  const { tx } = props;
  const [bridgeFee, setBridgeFee] = useState(null);
  (async () => {
    try {
      const context = await buildContext({ mode: mode });
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
                <TextPrimary>
                  <FormattedMessage id="common.click" />
                </TextPrimary>
                <FormattedMessage id="swap.node-explanation2" />
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
              {bridgeFee}{' '}
              <FormattedMessage id="swap.miner-fee" values={{ currency: tx.currencyIn }} />
            </Text>
          </FeeBox>
        </Center>
      </Row>
    </SwapFeesContainer>
  );
};
