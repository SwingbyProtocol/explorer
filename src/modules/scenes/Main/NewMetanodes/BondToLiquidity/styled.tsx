import { SwapStatusIcon, Text } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

export const BondToLiquidityContainer = styled.div`
  background-color: ${({ theme }) => theme.pulsar.color.bg.hover};
  padding: ${({ theme }) => rem(theme.pulsar.size.house)};
  width: 100%;
  @media (min-width: ${rem(media.xs)}) {
    padding: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
  @media (min-width: ${rem(media.lg)}) {
    margin-bottom: ${rem(5)};
    padding-top: ${({ theme }) => rem(theme.pulsar.size.house)};
    padding-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};
    padding-left: ${({ theme }) => rem(theme.pulsar.size.street)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
`;

export const RowTitle = styled.div`
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};
  display: flex;
  justify-content: space-between;
  white-space: nowrap;
`;

export const BarContainer = styled.div`
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};
`;

export const StatusIcon = styled(SwapStatusIcon)`
  width: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  height: ${({ theme }) => rem(theme.pulsar.size.drawer)};
`;

export const ContainerStatus = styled.div`
  /* display: flex; */
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: ${({ theme }) => rem(theme.pulsar.size.box)};
`;

export const ColumnStatus = styled.div`
  display: grid;
  grid-template-columns: ${({ theme }) => rem(theme.pulsar.size.room)} auto;
  align-items: center;
  @media (min-width: ${rem(media.lg)}) {
    grid-template-columns: ${({ theme }) => rem(theme.pulsar.size.room)} auto;
  }
  @media (min-width: ${rem(media.xl)}) {
    grid-template-columns: ${({ theme }) => rem(theme.pulsar.size.room)} auto;
  }
`;

export const TextStatus = styled(Text)`
  color: ${({ theme }) => theme.pulsar.color.primary.normal};
  font-weight: 700;
`;
