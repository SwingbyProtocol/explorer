import { Dropdown } from '@swingby-protocol/pulsar';
import { SkybridgeBridge } from '@swingby-protocol/sdk';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { IBridge, MetanodeBridges } from '../../../../metanodes';
import { TextChosenFilter } from '../../../Common';

import { BridgeMobileMetanodesContainer, DropTargetBridges, TextTitle } from './styled';

interface Props {
  bridge: SkybridgeBridge;
  setBridge: (bridge: string) => void;
}

export const BridgeMobileMetanodes = (props: Props) => {
  const { bridge, setBridge } = props;
  const bridgesItems = (
    <>
      {MetanodeBridges.map((b: IBridge) => (
        <Dropdown.Item selected={bridge === b.path} onClick={() => setBridge(b.path)} key={b.path}>
          {b.tabMenu}
        </Dropdown.Item>
      ))}
    </>
  );

  return (
    <BridgeMobileMetanodesContainer>
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
    </BridgeMobileMetanodesContainer>
  );
};
