import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../modules/styles';

const { media } = StylingConstants;

export const SwapContainer = styled.div`
  max-width: ${rem(847)};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding-top: ${rem(70)};
`;

export const LayoutBody = styled.div<{ open: boolean }>`
  transition: all 0.2s linear;

  @media (min-width: ${rem(media.md)}) {
    margin-left: ${({ open }) => (open ? '216px' : '72px')};
  }
`;

export const AppLogoLink = styled.a`
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;

  > svg {
    height: 1.5em;
  }
`;
