import { Dropdown, Text } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

export const BridgeMobileMetanodesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  @media (min-width: ${rem(media.md)}) {
    display: none;
  }
`;

export const DropTargetBridges = styled(Dropdown.DefaultTarget)`
  padding-left: ${({ theme }) => rem(theme.pulsar.size.house)};
`;

export const TextTitle = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
`;
