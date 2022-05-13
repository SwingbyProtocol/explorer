import { Dropdown, Text } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

interface ActiveProps {
  isActive: boolean;
}

export const BridgesMobileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.box)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.box)};
  @media (min-width: ${rem(media.md)}) {
    display: none;
  }
`;

export const DropTargetBridges = styled(Dropdown.DefaultTarget)`
  padding-left: ${({ theme }) => rem(theme.pulsar.size.house)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.house)};
`;

export const TextTitle = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
`;

export const TextBridge = styled(Text)<ActiveProps>`
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
  color: ${(props) => props.isActive && props.theme.pulsar.color.primary.normal};
`;

export const HintBridge = styled(Text)<ActiveProps>`
  font-size: ${({ theme }) => rem(theme.pulsar.size.closet)};
  color: ${(props) => props.isActive && props.theme.pulsar.color.text.placeholder};
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
