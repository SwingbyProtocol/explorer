import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

import { Loader } from '../../../../../components/Loader';
import { toBTC } from '../../../../explorer';
import { IconBack, TextBlock } from '../../../Common';

import {
  BackIconBox,
  BrowserFeesContainer,
  BrowserFeesDiv,
  Column,
  FeesContainer,
  RowDescription,
} from './styled';

export const BrowserFees = () => {
  const explorer = useSelector((state) => state.explorer);
  const { transactionFees } = explorer;
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Swingby Explorer | Fees</title>
      </Head>
      <BrowserFeesContainer>
        <BrowserFeesDiv size="bare">
          <BackIconBox>
            <IconBack
              onClick={() => {
                router.back();
              }}
            />
          </BackIconBox>
          {transactionFees !== null ? (
            <FeesContainer>
              <Column>
                <div />
                <TextBlock>
                  <FormattedMessage id="fees.currency" />
                </TextBlock>
                <div />
                {/* <SizeS>
                  <TextBlock>
                    <FormattedMessage id="fees.live" />
                  </TextBlock>
                </SizeS> */}
                {/* <div /> */}
                <TextBlock>
                  <FormattedMessage id="fees.feePercent" />
                </TextBlock>
                <div />
                <TextBlock>
                  <FormattedMessage id="fees.minerFee" />
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
                      {/* <SizeS>
                        <TextPrimary>Live</TextPrimary>
                      </SizeS> */}
                      {/* <div /> */}
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
            <Loader minHeight={409} />
          )}
        </BrowserFeesDiv>
      </BrowserFeesContainer>
    </>
  );
};
