import { rem } from 'polished';
import styled from 'styled-components';

export const CustomTooltipContainer = styled.div`
  border-radius: ${({ theme }) => rem(theme.pulsar.size.closet)};
  background: ${({ theme }) => theme.pulsar.color.bg.masked};
  display: flex;
  flex-direction: column;
  padding: ${rem(4)} ${rem(12)};
`;
