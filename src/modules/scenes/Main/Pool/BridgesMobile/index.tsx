import { Dropdown } from '@swingby-protocol/pulsar';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setBridge } from '../../../../store';

import { BridgesMobileContainer, DropTargetBridges, TextTitle } from './styled';

export const BridgesMobile = () => {
  const bridges = ['Apollo1', 'Apollo2', 'Falcon9'];
  const dispatch = useDispatch();
  const pool = useSelector((state) => state.pool);

  const bridgesItems = (
    <>
      {bridges.map((bridge) => (
        <Dropdown.Item
          selected={bridge === pool.bridge}
          onClick={() => dispatch(setBridge(bridge))}
          key={bridge}
        >
          {bridge}
        </Dropdown.Item>
      ))}
    </>
  );

  return (
    <BridgesMobileContainer>
      <TextTitle variant="accent">Bridges</TextTitle>
      <Dropdown
        target={<DropTargetBridges size="city">{pool.bridge}</DropTargetBridges>}
        data-testid="dropdown"
      >
        {bridgesItems}
      </Dropdown>
    </BridgesMobileContainer>
  );
};
