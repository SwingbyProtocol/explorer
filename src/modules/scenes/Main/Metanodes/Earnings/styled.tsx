import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

export const EarningsContainer = styled.div`
  background-color: ${({ theme }) => theme.pulsar.color.bg.hover};
  padding: ${({ theme }) => rem(theme.pulsar.size.house)};
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
  width: 100%;
  @media (min-width: ${rem(media.xs)}) {
    padding: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
  @media (min-width: ${rem(media.md)}) {
    margin-bottom: ${({ theme }) => rem(theme.pulsar.size.town)};
  }
  @media (min-width: ${rem(media.lg)}) {
    margin-bottom: ${({ theme }) => rem(theme.pulsar.size.town)};
    padding-top: ${({ theme }) => rem(theme.pulsar.size.house)};
    padding-bottom: 0;
    padding-left: ${({ theme }) => rem(theme.pulsar.size.street)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
`;

export const Row = styled.div`
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.room)};
`;
