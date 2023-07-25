import { Dropdown } from '@swingby-protocol/pulsar';
import { FormattedMessage } from 'react-intl';

import { NetworkDropdownContainer, SwapBridgeDropdownTarget } from './styled';

export const NetworkSelect = () => {
  return (
    <NetworkDropdownContainer>
      <FormattedMessage id="swap.mode.network-select-label" />
      <Dropdown
        target={
          <SwapBridgeDropdownTarget size="city">
            <FormattedMessage id="swap.mode.ethereum" />
          </SwapBridgeDropdownTarget>
        }
      >
        <Dropdown.Item selected>
          <FormattedMessage id="swap.mode.ethereum" />
        </Dropdown.Item>
      </Dropdown>
    </NetworkDropdownContainer>
  );
};
