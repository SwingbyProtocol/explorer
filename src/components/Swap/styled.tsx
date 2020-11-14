import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../modules/styles';

const { media } = StylingConstants;
export const StyledSwap = styled.iframe`
  display: none;
  @media (min-width: ${rem(media.sm)}) {
    outline: none;
    border: none;
    margin: 0;
    padding: 0;
    display: block;
    width: 100%;
    height: ${({ theme }) => rem(theme.pulsar.size.state + theme.pulsar.size.street * 2)};
  }
`;

export const SwapMobileRow = styled.div`
  width: 100%;
  padding-top: ${({ theme }) => rem(theme.pulsar.size.room)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.room)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.house)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.house)};
  @media (min-width: ${rem(media.sm)}) {
    display: none;
  }
`;
