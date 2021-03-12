import { rem } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  flex-direction: column;
`;

export const LegendContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: ${({ theme }) => rem(theme.pulsar.size.closet)};
  max-width: 50%;
  align-self: flex-end;
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};
`;

export const LegendBond = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: ${({ theme }) => rem(theme.pulsar.size.closet)};

  ::before {
    content: '';
    display: block;
    flex-shrink: 0;
    width: ${({ theme }) => rem(theme.pulsar.size.drawer)};
    height: ${({ theme }) => rem(theme.pulsar.size.drawer)};
    margin-right: ${({ theme }) => rem(theme.pulsar.size.box)};
    border-radius: 50%;
    background: ${({ theme }) => theme.pulsar.color.primary.normal};
  }
`;

export const LegendLiquidity = styled(LegendBond)`
  ::before {
    background: ${({ theme }) => theme.pulsar.color.warning.normal};
  }
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
