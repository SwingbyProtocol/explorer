import { Text } from '@swingby-protocol/pulsar';
import { useRouter } from 'next/router';
import React from 'react';

import { Loader } from '../../../../../components/Loader';
import { capitalize, convertTxTime, statusColor, SwapRawObject } from '../../../../explorer';
import { generateMessage } from '../../../../swap';

import {
  Arrow,
  StatusCardContainer,
  Row,
  StatusCircle,
  StatusText,
  TextMsg,
  Clock,
} from './styled';

interface Props {
  tx: SwapRawObject;
  setBrowser: (arg: string) => void;
}

export const StatusCard = (props: Props) => {
  const { tx, setBrowser } = props;
  const router = useRouter();

  return (
    <StatusCardContainer>
      {tx ? (
        <>
          <Arrow
            onClick={() => {
              setBrowser('Explorer');
              router.back();
            }}
          />
          <Row>
            <StatusCircle variant={statusColor(tx.status)} />
            <StatusText variant="accent">{capitalize(tx.status)}</StatusText>
          </Row>
          <h1 style={{ margin: 0 }}>Status images</h1>
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
