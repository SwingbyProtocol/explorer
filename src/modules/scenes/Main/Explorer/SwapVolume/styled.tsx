import styled from 'styled-components';
import { rem } from 'polished';
import { Text } from '@swingby-protocol/pulsar';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

export const SwapVolumeContainer = styled.div`
  padding-left: ${({ theme }) => rem(theme.pulsar.size.closet)};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: ${({ theme }) => rem(theme.pulsar.size.town)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.town)};

  @media (min-width: ${rem(media.sm)}) {
    padding-top: 0;
    padding-bottom: 0;
  }
`;

export const Box = styled.div`
  @media (min-width: ${rem(media.xs)}) {
    width: ${rem(342)};
  }
  @media (min-width: ${rem(media.sm)}) {
    width: 100%;
  }
`;

export const TitleDiv = styled.div`
  align-self: flex-start;
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.closet)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.house)};
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const AllVolumeSpan = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
  color: ${({ theme }) => theme.pulsar.color.primary.normal};
  border-bottom: 1px solid ${({ theme }) => theme.pulsar.color.primary.normal};
  cursor: pointer;
`;
