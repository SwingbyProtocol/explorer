import { Text } from '@swingby-protocol/pulsar';
import { useRouter } from 'next/router';
import React from 'react';

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
  Arrow,
  Clock,
  Row,
  StatusCardContainer,
  StatusCircle,
  StatusText,
  SwapStatus,
  TextMsg,
} from './styled';

interface Props {
  tx: SwapRawObject;
}

export const StatusCard = (props: Props) => {
  const { tx } = props;
  const router = useRouter();

  return (
    <StatusCardContainer>
      {tx ? (
        <>
          <Arrow
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
