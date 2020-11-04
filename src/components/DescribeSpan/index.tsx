import styled from 'styled-components';
import { rem } from 'polished';

export const DescribeSpan = styled.span`
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
  color: ${({ theme }) => theme.pulsar.color.text.masked};
`;
