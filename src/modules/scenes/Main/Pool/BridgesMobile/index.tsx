import { Dropdown } from '@swingby-protocol/pulsar';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { PATH } from '../../../../env';
import { useToggleBridge } from '../../../../hooks';
import { BRIDGES, IBridge } from '../../../../metanodes';
import { useOnboard } from '../../../../onboard';
import { TextChosenFilter } from '../../../Common';

import { BackDrop, BridgesMobileContainer, DropTargetBridges, TextTitle } from './styled';

export const BridgesMobile = () => {
  const { bridge, setBridge } = useToggleBridge(PATH.POOL);
  const { address } = useOnboard();
  const bridgesItems = (
    <>
      {BRIDGES.map((b: IBridge) => (
        <Dropdown.Item
          selected={b.bridge === bridge}
          onClick={() => setBridge(b.bridge)}
          key={b.bridge}
        >
          {b.tabMenu}
        </Dropdown.Item>
      ))}
    </>
  );

  const selectedBridge = bridge ? BRIDGES.find((b) => bridge === b.bridge) : BRIDGES[0];

  return (
    <BridgesMobileContainer>
      {!address && <BackDrop />}
      <TextTitle variant="accent">
        <FormattedMessage id="pool.bridges" />
      </TextTitle>
      <Dropdown
        target={
          <DropTargetBridges size="city">
            <TextChosenFilter> {selectedBridge.tabMenu}</TextChosenFilter>{' '}
          </DropTargetBridges>
        }
        data-testid="dropdown"
      >
        {bridgesItems}
      </Dropdown>
    </BridgesMobileContainer>
  );
};
