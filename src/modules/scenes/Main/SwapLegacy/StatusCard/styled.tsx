import { Icon, SwapStatusIcon, SwapProgress, Text } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

export const StatusCardContainer = styled.div`
  display: none;
  @media (min-width: ${rem(media.lg)}) {
    width: ${rem(350)};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${({ theme }) => rem(theme.pulsar.size.town)};
    border-radius: 0.75em;
    background-color: ${({ theme }) => theme.pulsar.color.bg.normal};
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.town)};
`;

export const StatusCircle = styled(SwapStatusIcon)`
  width: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  height: ${({ theme }) => rem(theme.pulsar.size.drawer)};
`;

export const StatusText = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
  margin-left: ${({ theme }) => rem(theme.pulsar.size.drawer)};
`;
export const TextMsg = styled(Text)`
  padding-left: ${({ theme }) => rem(theme.pulsar.size.state)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.state)};
  text-align: center;
  margin-top: ${({ theme }) => rem(theme.pulsar.size.town)};
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
`;

export const Clock = styled(Icon.Clock)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
  margin-right: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  color: ${({ theme }) => theme.pulsar.color.text.masked};
`;

export const SwapStatus = styled(SwapProgress)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.country)};
`;
