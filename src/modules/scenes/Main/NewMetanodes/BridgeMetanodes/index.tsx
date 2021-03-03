import React from 'react';
import { FormattedMessage } from 'react-intl';

import { MetanodeBridges } from '../../../../metanodes';

import {
  BridgeMetanodesContainer,
  TextTitle,
  TextBridge,
  RowBridge,
  RowTitle,
  IconRight,
} from './styled';

interface Props {
  bridge: string;
  setBridge: (bridge: string) => void;
}

export const BridgeMetanodes = (props: Props) => {
  const { bridge, setBridge } = props;

  return (
    <BridgeMetanodesContainer>
      <RowTitle>
        <TextTitle variant="accent">
          <FormattedMessage id="pool.bridges" />
        </TextTitle>
      </RowTitle>
      {MetanodeBridges.map((b: string, i: number) => {
        return (
          <RowBridge key={b} bg={i % 2 === 0} onClick={() => setBridge(b)}>
            <TextBridge variant="accent" isActive={bridge === b}>
              {b}
            </TextBridge>
            <IconRight isActive={bridge === b} />
          </RowBridge>
        );
      })}
    </BridgeMetanodesContainer>
  );
};
