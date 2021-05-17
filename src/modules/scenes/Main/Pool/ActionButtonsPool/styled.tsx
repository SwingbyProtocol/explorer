import { Text } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

export const ActionButtonsPoolContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => rem(theme.pulsar.size.house)};
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.box)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.box)};
  @media (min-width: ${rem(media.md)}) {
    margin-top: 0;
    padding-left: 0;
    padding-right: 0;
  }
`;

export const RowText = styled.div`
  width: ${rem(80)};
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.box)};

  @media (min-width: ${rem(media.sm)}) {
    width: auto;
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

export const TextTitle = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
`;

export const TextAPR = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
  color: ${({ theme }) => theme.pulsar.color.primary.normal};
`;
