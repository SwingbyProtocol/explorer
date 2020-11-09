import styled from 'styled-components';
import { rem } from 'polished';

export const SwapContainer = styled.div`
  max-width: ${rem(847)};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: ${({ theme }) => rem(theme.pulsar.size.street)};
`;
