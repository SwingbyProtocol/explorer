import { SwapStatusIcon, Text } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

export const TotalNodesContainer = styled.div`
  background-color: ${({ theme }) => theme.pulsar.color.bg.hover};
  padding: ${({ theme }) => rem(theme.pulsar.size.house)};
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
  width: 100%;
  display: flex;
  flex-direction: column;
  @media (min-width: ${rem(media.xs)}) {
    padding: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
  @media (min-width: ${rem(media.md)}) {
    margin-bottom: ${({ theme }) => rem(theme.pulsar.size.town)};
    margin-right: 0;
  }
  @media (min-width: ${rem(media.lg)}) {
    margin-bottom: 0;
    padding-top: ${({ theme }) => rem(theme.pulsar.size.house)};
    padding-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};
    padding-left: ${({ theme }) => rem(theme.pulsar.size.street)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
`;

export const DoughnutWrapper = styled.div`
  align-self: center;
  position: relative;
  width: ${rem(200)};
`;

export const TextNodeNum = styled(Text)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const RowTitle = styled.div`
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.room)};
`;

export const StatusIcon = styled(SwapStatusIcon)`
  width: ${({ theme }) => rem(theme.pulsar.size.closet)};
  height: ${({ theme }) => rem(theme.pulsar.size.closet)};
`;

export const StatusContainer = styled.div`
  display: grid;
  grid-row-gap: ${({ theme }) => rem(theme.pulsar.size.closet)};
  margin-top: ${({ theme }) => rem(theme.pulsar.size.town)};
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: ${({ theme }) => rem(theme.pulsar.size.street)} auto;
  align-items: center;
`;
