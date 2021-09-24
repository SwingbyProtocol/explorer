import { Icon } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

export const ExplorerToastContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
`;
export const ColumnLink = styled.div`
  display: flex;
  align-items: center;
`;

export const IconLink = styled(Icon.ExternalLink)`
  font-size: ${rem(10)};
  margin-left: ${({ theme }) => rem(theme.pulsar.size.box)};
  margin-top: ${({ theme }) => rem(-theme.pulsar.size.box / 2)};
`;
