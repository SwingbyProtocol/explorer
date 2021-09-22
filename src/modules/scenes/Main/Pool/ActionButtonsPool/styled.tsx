import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

export const ActionButtonsPoolContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => rem(theme.pulsar.size.house)};
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
  padding-top: ${({ theme }) => rem(theme.pulsar.size.box)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.box)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.box)};
  @media (min-width: ${rem(media.sm)}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  @media (min-width: ${rem(media.md)}) {
    margin-top: 0;
    padding-left: 0;
    padding-right: 0;
  }
`;

export const ColumnIcon = styled.div`
  align-self: flex-start;
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};
  margin-left: ${({ theme }) => rem(theme.pulsar.size.box)};
  @media (min-width: ${rem(media.sm)}) {
    align-self: auto;
    margin-bottom: 0;
    margin-left: 0;
  }
`;

export const Buttons = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.closet)};
  @media (min-width: ${rem(media.sm)}) {
    grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.house)};
  }
`;
