import { Text } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../styles';
import { IconInfo } from '../../../Common';

const { media } = StylingConstants;

export const ActionButtonMetanodesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.box)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.box)};
  @media (min-width: ${rem(media.sm)}) {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const RowText = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: ${rem(media.sm)}) {
    align-items: center;
    flex-direction: row;
    width: auto;
    column-gap: ${({ theme }) => rem(theme.pulsar.size.box)};
  }
`;

export const ButtonContainer = styled.div``;

export const TextTitle = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
`;

export const TextAPR = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
  color: ${({ theme }) => theme.pulsar.color.primary.normal};
`;

export const TextSwapFee = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
  @media (min-width: ${rem(media.lg)}) {
    font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
  }
`;

export const InfoIcon = styled(IconInfo)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.closet)};
  margin-bottom: ${rem(-1)};
  margin-left: ${({ theme }) => rem(theme.pulsar.size.box)};
`;
