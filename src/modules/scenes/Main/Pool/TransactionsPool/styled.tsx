import { Button, Text } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

interface PageProps {
  page: number;
}

export const TransactionsPoolContainer = styled.div`
  margin-top: ${({ theme }) => rem(-theme.pulsar.size.box)};
  padding-top: ${({ theme }) => rem(theme.pulsar.size.street)};
  width: 100%;
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
    justify-content: flex-start;
    grid-template-columns: ${rem(140)} auto ${rem(80)};
  }
  @media (min-width: ${rem(620)}) {
    justify-content: flex-start;
    grid-template-columns: ${rem(140)} auto ${rem(80)};
  }
  @media (min-width: ${rem(media.md)}) {
    justify-content: flex-start;
    grid-template-columns: ${rem(170)} auto ${rem(80)};
  }
  @media (min-width: ${rem(media.lg)}) {
    grid-template-columns: ${rem(170)} auto ${rem(110)};
  }
  @media (min-width: ${rem(media.xl)}) {
    grid-template-columns: ${rem(170)} auto ${rem(110)};
  }
`;

export const AddressA = styled.a`
  color: #3799da;
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
  margin: 0;
  max-width: ${rem(360)};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media (min-width: ${rem(media.xs)}) {
    max-width: 90%;
  }
`;

export const TextAmount = styled(Text)`
  display: block;
  width: 100%;
  text-align: right;
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
`;

export const PaginationRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
`;

export const PageText = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const BackButton = styled(Button)`
  color: ${({ theme }) => theme.pulsar.color.text.masked};
  margin-right: ${({ theme }) => rem(theme.pulsar.size.room)};
  background-color: transparent;
`;

export const NextButton = styled(Button)`
  color: ${({ theme }) => theme.pulsar.color.text.masked};
  margin-left: ${({ theme }) => rem(theme.pulsar.size.room)};
  background-color: transparent;
`;

export const PageRow = styled.div<PageProps>`
  /* Memo: Fix the width to avoid moving the back/next arrow in besides */
  width: ${(props) => (props.page > 99 ? rem(100) : rem(80))};
  text-align: center;
  white-space: nowrap;
`;
