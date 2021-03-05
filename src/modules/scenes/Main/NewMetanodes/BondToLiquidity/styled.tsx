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

export const Bar = styled.div`
  height: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  border-radius: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  position: relative;
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.closet + theme.pulsar.size.house)};
`;

export const BarBond = styled.div<{ widthPercentage: number }>`
  position: absolute;
  height: 100%;
  width: calc(${({ widthPercentage }) => widthPercentage}% + 1px);
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.pulsar.color.primary.normal};
  border-top-left-radius: ${({ theme }) => rem(theme.pulsar.size.box)};
  border-bottom-left-radius: ${({ theme }) => rem(theme.pulsar.size.box)};
`;

export const BarLiquidity = styled.div<{ widthPercentage: number }>`
  position: absolute;
  height: 100%;
  width: ${({ widthPercentage }) => widthPercentage}%;
  top: 0;
  right: 0;
  background: ${({ theme }) => theme.pulsar.color.warning.normal};
  border-top-right-radius: ${({ theme }) => rem(theme.pulsar.size.box)};
  border-bottom-right-radius: ${({ theme }) => rem(theme.pulsar.size.box)};
`;

export const OptimalPoint = styled.div<{ optimalBondPercentage: number; label: string }>`
  position: absolute;
  height: ${({ theme }) => rem(theme.pulsar.size.house)};
  width: 3px;
  border-radius: 3px;
  left: calc(${({ optimalBondPercentage }) => optimalBondPercentage}% - 1.5px);
  top: ${({ theme }) => rem(-theme.pulsar.size.house / 2 + theme.pulsar.size.drawer / 2)};
  background: ${({ theme }) => theme.pulsar.color.text.masked};

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
