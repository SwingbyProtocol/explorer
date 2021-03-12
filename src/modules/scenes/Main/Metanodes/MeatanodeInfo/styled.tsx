import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

export const MetanodeInfoContainer = styled.div``;

export const Top = styled.div`
  @media (min-width: ${rem(media.lg)}) {
    display: grid;
    grid-template-columns: ${rem(300)} auto;
    grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  }
  @media (min-width: ${rem((media.lg + media.xl) / 2)}) {
    grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.house)};
  }
`;

export const Bottom = styled.div``;

export const Left = styled.div`
  display: grid;
  grid-row-gap: ${rem(31)};

  @media (min-width: ${rem(media.xl)}) {
    grid-row-gap: ${rem(14)};
  }
`;

export const Right = styled.div`
  display: grid;
  grid-row-gap: ${rem(31)};

  @media (min-width: ${rem(media.xl)}) {
    grid-row-gap: ${rem(20)};
  }
`;

export const Row = styled.div`
  display: grid;
  @media (min-width: ${rem(media.lg)}) {
    grid-template-columns: ${rem(190)} auto;
    grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  }
  @media (min-width: ${rem((media.lg + media.xl) / 2)}) {
    grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.house)};
  }
  @media (min-width: ${rem(media.xl)}) {
    grid-template-columns: ${rem(280)} auto;
    grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.house)};
  }
`;
