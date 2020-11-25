import { Icon } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

export const IconInfo = styled(Icon.InfoCircle)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
  color: ${({ theme }) => theme.pulsar.color.text.masked};
  cursor: pointer;
`;
