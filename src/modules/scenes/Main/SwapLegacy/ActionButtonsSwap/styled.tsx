import { SwapProgress } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../styles';
import { ButtonScale } from '../../../Common';

const { media } = StylingConstants;

export const ActionButtonsSwapContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
`;

export const Buttons = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  @media (min-width: ${rem(media.sm)}) {
    grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.house)};
  }
  @media (min-width: ${rem(media.md)}) {
    grid-template-columns: auto auto auto;
  }
  @media (min-width: ${rem(media.lg)}) {
    grid-template-columns: auto auto;
  }
`;

export const SwapStatus = styled(SwapProgress)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.town)};
  @media (min-width: ${rem((media.xs + media.sm) / 2)}) {
    font-size: ${({ theme }) => rem(theme.pulsar.size.city)};
  }
  @media (min-width: ${rem(media.md)}) {
    font-size: ${({ theme }) => rem(theme.pulsar.size.state)};
  }
  @media (min-width: ${rem(media.lg)}) {
    display: none;
  }
`;

export const ButtonClaimSwapRow = styled.div`
  display: none;
  @media (min-width: ${rem(media.lg)}) {
    display: block;
    width: ${rem(120)};
  }
`;

export const ButtonClaimSwapTablet = styled(ButtonScale)`
  display: none;
  @media (min-width: ${rem(media.md)}) {
    display: block;
    width: ${rem(120)};
  }
  @media (min-width: ${rem(media.lg)}) {
    display: none;
  }
`;
