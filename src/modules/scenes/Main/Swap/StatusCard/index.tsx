import { SwapProgress, Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { useIntl } from 'react-intl';

import { GoBackArrow } from '../../../../../components/GoBackArrow';
import { Loader } from '../../../../../components/Loader';
import { castUiStatus, convertTxTime, TStatus, TTxRawObject } from '../../../../explorer';
import { generateMessage } from '../../../../swap';

import {
  Clock,
  Row,
  StatusCardContainer,
  StatusCircle,
  StatusText,
  SwapStatus,
  TextMsg,
} from './styled';

interface Props {
  tx: TTxRawObject;
}

export const StatusCard = (props: Props) => {
  const { tx } = props;
  const { locale } = useIntl();

  return (
    <StatusCardContainer>
      {tx ? (
        <>
          <GoBackArrow />
          <Row>
            <StatusCircle status={tx.status} />
            <StatusText variant="accent">{castUiStatus(tx.status)}</StatusText>
          </Row>
          <SwapStatus
            status={tx.status as TStatus}
            currencyIn={tx.currencyIn}
            currencyOut={tx.currencyOut}
            messages={SwapProgress.defaultMessages({ locale })}
          />
          <TextMsg variant="label">{generateMessage(tx.status)}</TextMsg>
          <Row>
            <Clock />
            <Text variant="section-title">{convertTxTime(tx.timestamp)}</Text>
          </Row>
        </>
      ) : (
        <Loader minHeight={250} />
      )}
    </StatusCardContainer>
  );
};
