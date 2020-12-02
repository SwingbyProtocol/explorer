import { Text, SwapProgress } from '@swingby-protocol/pulsar';
import { useRouter } from 'next/router';
import React from 'react';
import { useIntl } from 'react-intl';

import { Loader } from '../../../../../components/Loader';
import {
  capitalize,
  convertTxTime,
  statusColor,
  SwapRawObject,
  TStatus,
} from '../../../../explorer';
import { allocateStatus, generateMessage } from '../../../../swap';

import {
  Clock,
  Row,
  StatusCardContainer,
  StatusCircle,
  StatusText,
  SwapStatus,
  TextMsg,
  IconBack,
} from './styled';

interface Props {
  tx: SwapRawObject;
}

export const StatusCard = (props: Props) => {
  const { tx } = props;
  const router = useRouter();
  const { locale } = useIntl();

  return (
    <StatusCardContainer>
      {tx ? (
        <>
          <IconBack
            onClick={() => {
              router.back();
            }}
          />
          <Row>
            <StatusCircle variant={statusColor(tx.status)} />
            <StatusText variant="accent">{capitalize(tx.status)}</StatusText>
          </Row>
          <SwapStatus
            status={allocateStatus(tx.status) as TStatus}
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
