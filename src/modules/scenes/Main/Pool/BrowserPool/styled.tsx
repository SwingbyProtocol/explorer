import { Card, Text } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

export const BrowserPoolContainer = styled.div`
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

export const BrowserPoolDiv = styled(Card)`
  padding-top: ${({ theme }) => rem(theme.pulsar.size.street)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.city)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  position: relative;
  @media (min-width: ${rem(media.xs)}) {
    padding: ${({ theme }) => rem(theme.pulsar.size.street)};
    padding-bottom: ${({ theme }) => rem(theme.pulsar.size.city)};
  }
  @media (min-width: ${rem(media.md)}) {
    padding-top: ${({ theme }) => rem(theme.pulsar.size.city)};
    padding-bottom: ${({ theme }) => rem(theme.pulsar.size.city)};
    padding-right: 0;
    padding-left: 0;
    display: grid;
    grid-template-columns: ${rem(260)} auto;
    min-height: ${rem(500)};
  }
  @media (min-width: ${rem(media.lg)}) {
    grid-template-columns: ${rem(290)} auto;
  }
  @media (min-width: ${rem(media.xl)}) {
    width: ${rem(1188)};
  }
`;

export const Left = styled.div`
  @media (min-width: ${rem(media.md)}) {
    border-right: 1px solid ${({ theme }) => theme.pulsar.color.border.normal};
  }
`;

export const Right = styled.div`
  position: relative;
  @media (min-width: ${rem(media.md)}) {
    padding-left: ${({ theme }) => rem(theme.pulsar.size.street)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
  @media (min-width: ${rem(media.lg)}) {
    padding-left: ${({ theme }) => rem(theme.pulsar.size.city)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.city)};
  }
  @media (min-width: ${rem(media.xl)}) {
    padding-left: ${rem(74)};
    padding-right: ${rem(74)};
  }
`;

export const Row = styled.div`
  @media (min-width: ${rem(media.md)}) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @media (min-width: ${rem(media.lg)}) {
    display: grid;
    grid-template-columns: ${rem(280)} auto ${rem(375)};
  }
  @media (min-width: ${rem(media.xl)}) {
    grid-template-columns: ${rem(280)} auto ${rem(430)};
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
