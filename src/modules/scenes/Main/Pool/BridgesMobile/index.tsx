import { Dropdown } from '@swingby-protocol/pulsar';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { PATH } from '../../../../env';
import { useToggleBridge } from '../../../../hooks';
import { BRIDGES, IBridge } from '../../../../metanodes';
import { TextChosenFilter } from '../../../Common';

import {
  BridgesMobileContainer,
  DropTargetBridges,
  HintBridge,
  TextBridge,
  TextContainer,
  TextTitle,
} from './styled';

export const BridgesMobile = () => {
  const { bridge } = useToggleBridge(PATH.POOL);
  const bridgesItems = (
    <>
      {BRIDGES.map((b: IBridge) => (
        <Dropdown.Item
          selected={b.bridge === bridge}
          onClick={() => b.bridge !== bridge && window.open(`/pool?bridge=${b.bridge}`, '_self')}
          key={b.bridge}
        >
          <TextContainer>
            <TextBridge variant="accent" isActive={bridge === b.bridge}>
              {b.tabMenu}
            </TextBridge>
            <HintBridge variant="label" isActive={bridge === b.bridge}>
              {b.hint}
            </HintBridge>
          </TextContainer>
        </Dropdown.Item>
      ))}
    </>
  );

  const selectedBridge = bridge ? BRIDGES.find((b) => bridge === b.bridge) : BRIDGES[0];

  return (
    <BridgesMobileContainer>
      <TextTitle variant="accent">
        <FormattedMessage id="pool.bridges" />
      </TextTitle>
      <Dropdown
        target={
          <DropTargetBridges size="city">
            <TextChosenFilter> {selectedBridge && selectedBridge.tabMenu}</TextChosenFilter>{' '}
          </DropTargetBridges>
        }
        data-testid="dropdown"
      >
        {bridgesItems}
      </Dropdown>
    </BridgesMobileContainer>
  );
};
