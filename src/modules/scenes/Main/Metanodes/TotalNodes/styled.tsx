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

export const StatusIconWithWarningHalf = styled(StatusIcon)`
  position: relative;

  ::after {
    content: '';
    position: absolute;
    display: block;
    width: 0;
    height: 1;
    border-left: ${({ theme }) => rem(theme.pulsar.size.closet / 2)} solid transparent;
    border-bottom: ${({ theme }) => rem(theme.pulsar.size.closet / 2)} solid
      ${({ theme }) => theme.pulsar.color.warning.normal};
    border-right: ${({ theme }) => rem(theme.pulsar.size.closet / 2)} solid
      ${({ theme }) => theme.pulsar.color.warning.normal};
    border-top: ${({ theme }) => rem(theme.pulsar.size.closet / 2)} solid transparent;
    border-radius: 50%;
  }
`;

export const StatusContainer = styled.div`
  display: grid;
  grid-row-gap: ${({ theme }) => rem(theme.pulsar.size.closet)};
  margin-top: ${({ theme }) => rem(theme.pulsar.size.town)};
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.drawer)};
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: ${({ theme }) => rem(theme.pulsar.size.street)} auto;
  align-items: center;
`;

export const CustomTooltipContainer = styled.div`
  border-radius: ${({ theme }) => rem(theme.pulsar.size.closet)};
  background: ${({ theme }) => theme.pulsar.color.bg.masked};
  display: flex;
  flex-direction: column;
  padding: ${rem(4)} ${rem(12)};
`;

export const NodeTvl = styled.div`
  display: flex;
  justify-contents: space-between;
  column-gap: ${({ theme }) => rem(theme.pulsar.size.street)};
`;

export const ColumnTvl = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ValueUsd = styled.div`
  align-self: flex-end;
`;
