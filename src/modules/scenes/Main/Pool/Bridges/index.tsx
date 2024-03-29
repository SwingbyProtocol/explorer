import React from 'react';
import { FormattedMessage } from 'react-intl';

import { PATH } from '../../../../env';
import { useToggleBridge } from '../../../../hooks';
import { BRIDGES, IBridge } from '../../../../metanodes';

import {
  BridgesContainer,
  TextTitle,
  TextBridge,
  RowBridge,
  RowTitle,
  IconRight,
  HintBridge,
  TextContainer,
} from './styled';

export const Bridges = () => {
  const { bridge } = useToggleBridge(PATH.POOL);

  return (
    <BridgesContainer>
      <RowTitle>
        <TextTitle variant="accent">
          <FormattedMessage id="pool.bridges" />
        </TextTitle>
      </RowTitle>
      {BRIDGES.map((b: IBridge, i: number) => {
        return (
          <RowBridge
            key={b.bridge}
            bg={i % 2 === 0}
            onClick={() => {
              b.bridge !== bridge && window.open(`/pool?bridge=${b.bridge}`, '_self');
            }}
          >
            <TextContainer>
              <TextBridge variant="accent" isActive={bridge === b.bridge}>
                {b.tabMenu}
              </TextBridge>
              <HintBridge variant="label" isActive={bridge === b.bridge}>
                {b.hint}
              </HintBridge>
            </TextContainer>
            <IconRight isActive={bridge === b.bridge} />
          </RowBridge>
        );
      })}
    </BridgesContainer>
  );
};
