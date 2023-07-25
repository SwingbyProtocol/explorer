import { Dropdown } from '@swingby-protocol/pulsar';
import styled from 'styled-components';

export const NetworkDropdownContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: ${({ theme }) =>
    theme.pulsar.id === 'PulsarLight' ? '#FFF' : theme.pulsar.color.text.normal};
`;

export const SwapBridgeDropdownTarget = styled(Dropdown.DefaultTarget)`
  margin-left: 1rem;
  background-color: transparent;
  color: ${({ theme }) => theme.pulsar.color.success.normal};
  font-weight: bold;
`;
