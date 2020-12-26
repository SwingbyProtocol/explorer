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
    height: ${rem(76)};
  }
`;

export const SwapMobileRow = styled.div`
  width: 100%;
  padding-top: ${({ theme }) => rem(theme.pulsar.size.box)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.house + 2)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.closet)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.closet)};

  @media (min-width: ${rem(media.sm)}) {
    display: none;
  }
`;
