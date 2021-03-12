import { SwapStatusIcon, Text } from '@swingby-protocol/pulsar';
import { rem, transitions } from 'polished';
import styled, { css } from 'styled-components';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

export const LiquidityRatioContainer = styled.div<{ isLoading: boolean }>`
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

  ${({ isLoading }) => isLoading && loading};
`;

export const RowTitle = styled.div`
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};
  display: grid;
  grid-row-gap: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  white-space: nowrap;
  @media (min-width: ${rem(media.sm)}) {
    display: flex;
    justify-content: space-between;
  }
  @media (min-width: ${rem(media.md)}) {
    display: grid;
  }
  @media (min-width: ${rem((media.md + media.lg) / 2)}) {
    display: flex;
  }
`;

export const BarContainer = styled.div`
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};
`;

export const StatusIcon = styled(SwapStatusIcon)`
  width: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  height: ${({ theme }) => rem(theme.pulsar.size.drawer)};
`;

export const ContainerStatus = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: ${({ theme }) => rem(theme.pulsar.size.box)};
  justify-self: center;
  @media (min-width: ${rem(media.xs)}) {
    grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.room)};
  }
  @media (min-width: ${rem(media.md)}) {
    grid-column-gap: 0;
  }
`;

export const ColumnStatus = styled.div`
  display: grid;
  grid-template-columns: ${({ theme }) => rem(theme.pulsar.size.closet)} auto;
  align-items: center;
  @media (min-width: ${rem(media.sm)}) {
    grid-template-columns: ${({ theme }) => rem(theme.pulsar.size.room)} auto;
  }
`;

export const TextStatus = styled(Text)`
  color: ${({ theme }) => theme.pulsar.color.primary.normal};
  font-weight: 700;
`;

export const Bar = styled.div`
  height: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  border-radius: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  position: relative;
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.closet + theme.pulsar.size.house)};
  background: ${({ theme }) => theme.pulsar.color.warning.normal};
  border-radius: ${({ theme }) => rem(theme.pulsar.size.box)};
`;

export const BarBond = styled.div<{ widthPercentage: number }>`
  position: absolute;
  height: 100%;
  width: calc(${({ widthPercentage }) => widthPercentage}% + 1px);
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.pulsar.color.primary.normal};
  border-radius: ${({ theme }) => rem(theme.pulsar.size.box)};
  ${({ theme }) => transitions(['width'], theme.pulsar.duration.normal)};
`;

export const OptimalPoint = styled.div<{ optimalBondPercentage: number; label: string }>`
  position: absolute;
  height: ${({ theme }) => rem(theme.pulsar.size.house)};
  width: 3px;
  border-radius: 3px;
  left: calc(${({ optimalBondPercentage }) => optimalBondPercentage}% - 1.5px);
  top: ${({ theme }) => rem(-theme.pulsar.size.house / 2 + theme.pulsar.size.drawer / 2)};
  background: ${({ theme }) => theme.pulsar.color.text.masked};
  ${({ theme }) => transitions(['left'], theme.pulsar.duration.normal)};

  ::after {
    position: absolute;
    content: '${({ label }) => label}';
    width: 100px;
    text-align: center;
    left: -50px;
    top: ${({ theme }) => rem(theme.pulsar.size.house)};
    font-size: ${({ theme }) => rem(theme.pulsar.size.closet)};
  }
`;

const loading = css`
  @keyframes pulse {
    0% {
      filter: saturate(0);
    }

    25% {
      filter: saturate(0.25);
    }

    100% {
      filter: saturate(0);
    }
  }

  animation-name: pulse;
  animation-duration: 2s;
  animation-iteration-count: infinite;
`;
