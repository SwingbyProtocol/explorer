import { Text } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../modules/styles';

const { media } = StylingConstants;

export const ModalContainer = styled.div`
  word-break: break-all;
  padding-left: ${({ theme }) => rem(theme.pulsar.size.closet)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.closet)};
`;
export const Buttons = styled.div`
  display: grid;
  margin-top: ${({ theme }) => rem(theme.pulsar.size.house)};
  grid-row-gap: ${({ theme }) => rem(theme.pulsar.size.house)};
  @media (min-width: ${rem(media.md + 50)}) {
    grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.country)};
    grid-template-columns: 1fr 1fr;
  }
`;

export const TextAddress = styled(Text)`
  margin-top: ${({ theme }) => rem(theme.pulsar.size.closet)};
  display: block;
  color: ${({ theme }) => theme.pulsar.color.primary.active};
`;
