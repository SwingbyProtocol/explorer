import styled from 'styled-components';
import { rem } from 'polished';

export const TitleSpan = styled.span`
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
  color: ${({ theme }) => theme.pulsar.color.text.masked};
  font-weight: bold;
`;
