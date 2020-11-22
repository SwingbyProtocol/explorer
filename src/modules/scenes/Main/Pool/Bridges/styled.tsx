import { Icon, Text } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

interface BgProps {
  bg: boolean;
}

interface ActiveProps {
  isActive: boolean;
}

export const BridgesContainer = styled.div`
  @media (min-width: ${rem(media.lg)}) {
  }
`;

export const RowTitle = styled.div`
  @media (min-width: ${rem(media.lg)}) {
    padding-left: ${({ theme }) => rem(theme.pulsar.size.town)};
    margin-bottom: ${({ theme }) => rem(theme.pulsar.size.town)};
  }
`;

export const TextTitle = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
`;

export const RowBridge = styled.div<BgProps>`
  width: 100%;
  background: ${(props) => props.bg && props.theme.pulsar.color.bg.hover};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  @media (min-width: ${rem(media.lg)}) {
    height: ${({ theme }) => rem(theme.pulsar.size.state)};
    padding-left: ${({ theme }) => rem(theme.pulsar.size.state)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
`;

export const TextBridge = styled(Text)<ActiveProps>`
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
  color: ${(props) => props.isActive && props.theme.pulsar.color.primary.normal};
`;

export const IconRight = styled(Icon.CaretRight)<ActiveProps>`
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
  color: ${(props) => props.isActive && props.theme.pulsar.color.primary.normal};
`;
