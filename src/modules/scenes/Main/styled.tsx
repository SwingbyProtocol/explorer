import { rem } from 'polished';
import styled from 'styled-components';

export const SwapContainer = styled.div`
  max-width: ${rem(847)};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding-top: ${({ theme }) => rem(74)};
  @media (min-width: ${rem(576)}) {
    padding-top: ${({ theme }) => rem(90)};
  }
`;
