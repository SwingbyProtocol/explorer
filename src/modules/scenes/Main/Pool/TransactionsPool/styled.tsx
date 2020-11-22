import { Text } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

export const TransactionsPoolContainer = styled.div`
  margin-top: ${({ theme }) => rem(-theme.pulsar.size.box)};
  padding-top: ${({ theme }) => rem(theme.pulsar.size.street)};
`;
export const TitleText = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
`;

export const TransactionsContainer = styled.div`
  margin-top: ${({ theme }) => rem(theme.pulsar.size.box * 5)};
  background-color: ${({ theme }) => theme.pulsar.color.bg.hover};
`;

export const Row = styled.div`
  padding: ${({ theme }) => rem(theme.pulsar.size.house)};
  display: grid;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.pulsar.color.border.normal};
  ${({ theme }) => theme.pulsar.color.bg.hover};
  grid-row-gap: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  @media (min-width: ${rem(media.xs)}) {
    padding: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
  @media (min-width: ${rem(media.lg)}) {
    justify-content: flex-start;
    grid-template-columns: ${rem(170)} ${rem(370)} ${rem(100)};
  }
  @media (min-width: ${rem(media.xl)}) {
    justify-content: flex-start;
    grid-template-columns: ${rem(170)} ${rem(420)} ${rem(100)};
  }
`;

export const AddressP = styled.p`
  color: #3799da;
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
  margin: 0;
  max-width: ${rem(370)};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media (min-width: ${rem(media.lg)}) {
    max-width: ${rem(320)};
  }
  @media (min-width: ${rem(media.xl)}) {
    max-width: ${rem(370)};
  }
`;

export const TextAmount = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
`;
