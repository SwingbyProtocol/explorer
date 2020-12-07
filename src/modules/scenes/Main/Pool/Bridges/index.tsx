import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setBridge } from '../../../../store';

import { BridgesContainer, TextTitle, TextBridge, RowBridge, RowTitle, IconRight } from './styled';

export const Bridges = () => {
  const bridges = ['Apollo1'];
  const dispatch = useDispatch();
  const pool = useSelector((state) => state.pool);

  return (
    <BridgesContainer>
      <RowTitle>
        <TextTitle variant="accent">Bridges</TextTitle>
      </RowTitle>
      {bridges.map((bridge: string, i: number) => {
        return (
          <RowBridge key={bridge} bg={i % 2 === 0} onClick={() => dispatch(setBridge(bridge))}>
            <TextBridge variant="accent" isActive={bridge === pool.bridge}>
              {bridge}
            </TextBridge>
            <IconRight isActive={bridge === pool.bridge} />
          </RowBridge>
        );
      })}
    </BridgesContainer>
  );
};
