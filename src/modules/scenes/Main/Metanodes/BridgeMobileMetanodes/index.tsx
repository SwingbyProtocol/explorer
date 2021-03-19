import { Dropdown } from '@swingby-protocol/pulsar';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { PATH } from '../../../../env';
import { useToggleBridge } from '../../../../hooks';
import { IBridge, BRIDGES } from '../../../../metanodes';
import { TextChosenFilter } from '../../../Common';

import { BridgeMobileMetanodesContainer, DropTargetBridges, TextTitle } from './styled';

export const BridgeMobileMetanodes = () => {
  const { bridge, setBridge } = useToggleBridge(PATH.METANODES);
  const bridgesItems = (
    <>
      {BRIDGES.map((b: IBridge) => (
        <Dropdown.Item
          selected={bridge === b.bridge}
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
    <BridgeMobileMetanodesContainer>
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
    </BridgeMobileMetanodesContainer>
  );
};
