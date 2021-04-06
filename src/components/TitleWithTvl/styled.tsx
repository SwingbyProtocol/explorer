import { Text } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../modules/styles';

const { media } = StylingConstants;

export const TitleWithTvlContainer = styled.div``;

export const RowTvl = styled.div`
  position: absolute;
`;

export const TextTvl = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
  display: flex;
  align-items: center;
  @media (min-width: ${rem(media.lg)}) {
    margin-top: ${({ theme }) => rem(theme.pulsar.size.box)};
    font-size: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
`;
export const RowLoader = styled.div`
  margin-top: ${({ theme }) => rem(-theme.pulsar.size.box)};
  margin-left: ${({ theme }) => rem(theme.pulsar.size.drawer)};
`;
