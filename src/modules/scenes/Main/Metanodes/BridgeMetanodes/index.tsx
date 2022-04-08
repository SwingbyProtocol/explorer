import React from 'react';
import { FormattedMessage } from 'react-intl';

import { PATH } from '../../../../env';
import { useToggleBridge } from '../../../../hooks';
import { IBridge, BRIDGES } from '../../../../metanodes';

import {
  BridgeMetanodesContainer,
  IconRight,
  RowBridge,
  RowTitle,
  TextBridge,
  TextTitle,
} from './styled';

export const BridgeMetanodes = () => {
  const { bridge, setBridge } = useToggleBridge(PATH.METANODES);

  return (
    <BridgeMetanodesContainer>
      <RowTitle>
        <TextTitle variant="accent">
          <FormattedMessage id="pool.bridges" />
        </TextTitle>
      </RowTitle>
      {BRIDGES.map((b: IBridge, i: number) => {
        return (
          <RowBridge key={b.tabMenu} bg={i % 2 === 0} onClick={() => setBridge(b.bridge)}>
            <TextBridge variant="accent" isActive={bridge === b.bridge}>
              {b.tabMenu}
            </TextBridge>
            <IconRight/>
          </RowBridge>
        );
      })}
    </BridgeMetanodesContainer>
  );
};
