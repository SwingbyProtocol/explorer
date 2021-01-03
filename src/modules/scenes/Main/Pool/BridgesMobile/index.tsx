import { Dropdown } from '@swingby-protocol/pulsar';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { setBridge } from '../../../../store';
import { TextChosenFilter } from '../../../Common';

import { BackDrop, BridgesMobileContainer, DropTargetBridges, TextTitle } from './styled';

export const BridgesMobile = () => {
  const bridges = ['Apollo1'];
  const dispatch = useDispatch();
  const pool = useSelector((state) => state.pool);
  const { bridge, userAddress } = pool;

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
      {!userAddress && <BackDrop />}
      <TextTitle variant="accent">
        <FormattedMessage id="pool.bridges" />
      </TextTitle>
      <Dropdown
        target={
          <DropTargetBridges size="city">
            <TextChosenFilter> {bridge}</TextChosenFilter>{' '}
          </DropTargetBridges>
        }
        data-testid="dropdown"
      >
        {bridgesItems}
      </Dropdown>
    </BridgesMobileContainer>
  );
};
