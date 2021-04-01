import Head from 'next/head';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

import { GoBackArrow } from '../../../../../components/GoBackArrow';
import { Loader } from '../../../../../components/Loader';
import { toBTC } from '../../../../explorer';
import { TextBlock } from '../../../Common';

import {
  BackIconBox,
  BrowserFeesContainer,
  BrowserFeesDiv,
  Column,
  FeesContainer,
  RowDescription,
} from './styled';

export const BrowserFees = () => {
  const transactionFees = useSelector((state) => state.explorer.transactionFees);

  return (
    <>
      <Head>
        <title>Swingby Explorer | Fees</title>
      </Head>
      <BrowserFeesContainer>
        <BrowserFeesDiv size="bare">
          <BackIconBox>
            <GoBackArrow />
          </BackIconBox>
          {transactionFees !== null ? (
            <FeesContainer>
              <Column>
                <div />
                <TextBlock>
                  <FormattedMessage id="fees.currency" />
                </TextBlock>
                <div />
                <TextBlock>
                  <FormattedMessage id="fees.fee-percent" />
                </TextBlock>
                <div />
                <TextBlock>
                  <FormattedMessage id="fees.miner-fee" />
                </TextBlock>
                <div />
              </Column>
              {transactionFees &&
                transactionFees.map((fee, index) => {
                  return (
                    <RowDescription key={index} bg={index % 2 !== 0}>
                      <div />
                      <TextBlock>{fee.currency}</TextBlock>
                      <div />
                      <TextBlock>{fee.bridgeFeePercent}</TextBlock>
                      <div />
                      <TextBlock>
                        {toBTC(fee.minerFee)} {fee.currency}
                      </TextBlock>
                      <div />
                    </RowDescription>
                  );
                })}
            </FeesContainer>
          ) : (
            <Loader minHeight={362} />
          )}
        </BrowserFeesDiv>
      </BrowserFeesContainer>
    </>
  );
};
