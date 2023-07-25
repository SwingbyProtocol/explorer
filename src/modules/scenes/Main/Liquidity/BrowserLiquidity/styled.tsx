import { Card, Text } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

export const BrowserLiquidityContainer = styled.div`
  display: grid;
  padding-top: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.room)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.closet)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.closet)};
  @media (min-width: ${rem(media.sm)}) {
    padding-top: 0;
    padding-left: 0;
    padding-right: 0;
  }
  @media (min-width: ${rem(media.md)}) {
    padding-bottom: ${({ theme }) => rem(theme.pulsar.size.state)};
  }
`;

export const BrowserLiquidityDiv = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  @media (min-width: ${rem(media.sm)}) {
    padding-top: ${({ theme }) => rem(theme.pulsar.size.city)};
    padding-bottom: ${({ theme }) => rem(theme.pulsar.size.city)};
    background-color: ${({ theme }) => (theme.pulsar.id === 'PulsarLight' ? '#FFF' : '#2A3039')};
  }
  @media (min-width: ${rem(media.md)}) {
    min-height: ${rem(500)};
  }
  @media (min-width: ${rem(media.lg)}) {
    width: ${rem(980)};
    margin: 0 auto;
  }
  @media (min-width: ${rem(media.xl)}) {
    width: ${rem(1100)};
  }
`;

export const ValidationResult = styled.div`
  position: absolute;
  margin-top: ${({ theme }) => rem(theme.pulsar.size.box / 2)};
`;

export const TextValidationResult = styled(Text)`
  color: ${({ theme }) => theme.pulsar.color.danger.active};
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
`;
