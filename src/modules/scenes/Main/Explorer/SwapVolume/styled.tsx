import styled from 'styled-components';
import { rem } from 'polished';
import { Text } from '@swingby-protocol/pulsar';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

export const SwapVolumeContainer = styled.div`
  grid-area: volume;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: ${({ theme }) => rem(theme.pulsar.size.town)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};
  @media (min-width: ${rem(media.sm)}) {
    padding-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
  @media (min-width: ${rem(media.md)}) {
    width: ${rem(650)};
    margin-top: ${({ theme }) => rem(-theme.pulsar.size.house)};
    justify-self: center;
    padding-left: 0;
    padding-top: 0;
    padding-bottom: 0;
    align-self: start;
  }
  @media (min-width: ${rem(media.lg)}) {
    margin-top: 0;
    width: ${rem(300)};
    grid-area: auto;
    padding-top: 0;
    padding-bottom: 0;
    padding-left: ${({ theme }) => rem(theme.pulsar.size.drawer)};
    justify-self: center;
  }
  @media (min-width: ${rem(media.xl)}) {
    width: ${rem(370)};
    padding-left: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
`;

export const Box = styled.div`
  height: ${rem(152)};
  @media (min-width: ${rem(media.xs)}) {
    width: ${rem(342)};
  }
  @media (min-width: ${rem(media.md)}) {
    width: 100%;
  }
`;
export const LineContainer = styled.div`
  text-align: center;
  position: relative;
  @media (min-width: ${rem(media.lg)}) {
    padding-top: ${({ theme }) => rem(theme.pulsar.size.house)};
  }
  @media (min-width: ${rem(media.xl)}) {
    padding-top: 0;
  }
`;

export const TitleDiv = styled.div`
  align-self: flex-start;
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.closet)};
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media (min-width: ${rem(media.sm)}) {
    padding-right: ${({ theme }) => rem(theme.pulsar.size.house)};
  }
  @media (min-width: ${rem(media.lg)}) {
    margin-bottom: ${({ theme }) => rem(theme.pulsar.size.box)};
  }
`;

export const AllVolumeSpan = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
  color: ${({ theme }) => theme.pulsar.color.primary.normal};
  border-bottom: 1px solid ${({ theme }) => theme.pulsar.color.primary.normal};
  cursor: pointer;
`;
