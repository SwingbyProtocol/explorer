import { Dropdown } from '@swingby-protocol/pulsar';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { MetanodeBridges } from '../../../../metanodes';
import { TextChosenFilter } from '../../../Common';

import { BridgeMobileMetanodesContainer, DropTargetBridges, TextTitle } from './styled';

interface Props {
  bridge: string;
  setBridge: (bridge: string) => void;
}

export const BridgeMobileMetanodes = (props: Props) => {
  const { bridge, setBridge } = props;
  const bridgesItems = (
    <>
      {MetanodeBridges.map((b) => (
        <Dropdown.Item selected={bridge === b} onClick={() => setBridge(b)} key={b}>
          {b}
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