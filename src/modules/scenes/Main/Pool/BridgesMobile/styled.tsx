import { Dropdown, Text } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

export const BridgesMobileContainer = styled.div`
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

export const BackDrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: ${({ theme }) => theme.pulsar.color.bg.transparent};
  border-radius: ${({ theme }) => rem(theme.pulsar.size.closet)};
  @media (min-width: ${rem(media.md)}) {
    display: none;
  }
`;