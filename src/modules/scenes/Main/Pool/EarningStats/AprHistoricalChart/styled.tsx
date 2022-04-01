import { Text } from '@swingby-protocol/pulsar';
import { SkybridgeBridge } from '@swingby-protocol/sdk';
import { rem } from 'polished';
import styled from 'styled-components';

interface DateProps {
  isActive: boolean;
}

interface BridgeProps {
  bridge: SkybridgeBridge;
}

export const AprHistoricalChartContainer = styled.div`
  display: grid;
  height: ${rem(210)};
  justify-content: center;
`;

export const TitleDiv = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
  align-items: start;
  width: auto;
  padding-right: ${({ theme }) => rem(theme.pulsar.size.room)};
`;

export const Column = styled.div<BridgeProps>`
  display: grid;
  /* Todo: Update once BSC sbBTC pool is deployed */
  grid-template-columns: ${(props) => (props.bridge === 'btc_skypool' ? 'auto' : 'auto auto auto')};
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
