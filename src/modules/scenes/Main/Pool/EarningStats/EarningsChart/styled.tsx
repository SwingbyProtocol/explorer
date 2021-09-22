import { Text } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

interface DateProps {
  isActive: boolean;
}

export const EarningsChartContainer = styled.div`
  display: grid;
  height: ${rem(210)};
  justify-content: center;
`;

export const MessageBox = styled.div`
  padding-top: ${({ theme }) => rem(theme.pulsar.size.house)};
`;

export const TitleDiv = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
  align-items: start;
  width: auto;
  padding-right: ${({ theme }) => rem(theme.pulsar.size.room)};
`;

export const ColumnEarned = styled.div`
  margin-top: ${({ theme }) => rem(-theme.pulsar.size.box / 2)};
`;

export const Column = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.drawer)};
`;

export const TextDate = styled(Text)<DateProps>`
  cursor: pointer;
  color: ${(props) => props.isActive && props.theme.pulsar.color.primary.normal};
  border-bottom: ${(props) =>
    props.isActive
      ? `1px solid ${props.theme.pulsar.color.primary.normal}`
      : `1px solid transparent`};
`;
