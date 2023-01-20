import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../modules/styles';

const { media } = StylingConstants;

export const StyledSwap = styled.div`
  display: none;

  @media (min-width: ${rem(media.sm)}) {
    outline: none;
    border: none;
    margin: 0;
    padding: 0;
    display: block;
    width: 100%;
    height: ${rem(88)};
  }

  > iframe {
    height: 100% !important;
  }
`;

export const SwapMobileRow = styled.div`
  width: 100%;
  padding-left: ${({ theme }) => rem(theme.pulsar.size.closet)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.closet)};
  height: ${rem(88)};
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: ${rem(media.sm)}) {
    display: none;
  }
`;
