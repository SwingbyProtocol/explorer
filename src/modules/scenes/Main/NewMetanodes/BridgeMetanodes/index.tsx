import React from 'react';
import { FormattedMessage } from 'react-intl';

import { IBridge, MetanodeBridges } from '../../../../metanodes';

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
      {MetanodeBridges.map((b: IBridge, i: number) => {
        return (
          <RowBridge key={b.tabMenu} bg={i % 2 === 0} onClick={() => setBridge(b.path)}>
            <TextBridge variant="accent" isActive={bridge === b.path}>
              {b.tabMenu}
            </TextBridge>
            <IconRight isActive={bridge === b.path} />
          </RowBridge>
        );
      })}
    </BridgeMetanodesContainer>
  );
};
