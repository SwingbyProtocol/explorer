import React from 'react';
import { FormattedMessage } from 'react-intl';

import { PATH } from '../../../../env';
import { useToggleBridge } from '../../../../hooks';
import { BRIDGES, IBridge } from '../../../../metanodes';

import { BridgesContainer, TextTitle, TextBridge, RowBridge, RowTitle, IconRight } from './styled';

export const Bridges = () => {
  const { bridge, setBridge } = useToggleBridge(PATH.POOL);

  return (
    <BridgesContainer>
      <RowTitle>
        <TextTitle variant="accent">
          <FormattedMessage id="pool.bridges" />
        </TextTitle>
      </RowTitle>
      {BRIDGES.map((b: IBridge, i: number) => {
        return (
          <RowBridge key={b.bridge} bg={i % 2 === 0} onClick={() => setBridge(b.bridge)}>
            <TextBridge variant="accent" isActive={bridge === b.bridge}>
              {b.tabMenu}
            </TextBridge>
            <IconRight isActive={bridge === b.bridge} />
          </RowBridge>
        );
      })}
    </BridgesContainer>
  );
};
