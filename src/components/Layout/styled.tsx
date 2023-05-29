import { rem } from 'polished';
import styled from 'styled-components';

export const SwapContainer = styled.div`
  max-width: ${rem(847)};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding-top: ${rem(70)};
`;

export const LayoutBody = styled.div<{ open: boolean }>`
  margin-left: ${({ open }) => (open ? '216px' : '72px')};
  transition: all 0.2s linear;
`;
