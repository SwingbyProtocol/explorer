import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../modules/styles';

const { media } = StylingConstants;

export const SwapContainer = styled.div`
  max-width: ${rem(847)};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding-top: ${rem(74)};
  @media (min-width: ${rem(media.sm)}) {
    padding-top: ${rem(68)};
    padding-bottom: ${rem(10)};
  }
`;
