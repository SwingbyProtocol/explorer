import { Button } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

interface PageProps {
  page: number;
}

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
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

export const PaginationRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;
