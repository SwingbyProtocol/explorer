import styled from 'styled-components';
import { rem } from 'polished';
import { Text } from '@swingby-protocol/pulsar';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

interface DateProps {
  isActive: boolean;
  isAll: boolean;
}

export const EarningsChartContainer = styled.div`
  grid-area: volume;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: ${({ theme }) => rem(theme.pulsar.size.town)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};
  background-color: ${({ theme }) => theme.pulsar.color.bg.hover};
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
    width: ${rem(375)};
    height: ${rem(190)};
    grid-area: auto;
    padding-top: ${({ theme }) => rem(theme.pulsar.size.house)};
    padding-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};
    padding-left: ${({ theme }) => rem(theme.pulsar.size.street)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.street)};
    justify-self: center;
  }
  @media (min-width: ${rem(media.xl)}) {
    width: ${rem(430)};
  }
`;

export const Box = styled.div`
  @media (min-width: ${rem(media.xs)}) {
    width: ${rem(342)};
  }
  @media (min-width: ${rem(media.md)}) {
    width: 100%;
  }
  @media (min-width: ${rem(media.lg)}) {
    margin-top: ${({ theme }) => rem(theme.pulsar.size.room)};
  }
`;
export const LineContainer = styled.div`
  @media (min-width: ${rem(media.lg)}) {
    padding-top: 0;
  }
`;

export const TitleDiv = styled.div`
  align-self: flex-start;
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.closet)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media (min-width: ${rem(media.sm)}) {
    padding-right: ${({ theme }) => rem(theme.pulsar.size.house)};
  }
  @media (min-width: ${rem(media.lg)}) {
    /* margin-bottom: ${({ theme }) => rem(theme.pulsar.size.house)}; */
    /* margin-bottom: ${({ theme }) => rem(theme.pulsar.size.drawer)}; */
  }
`;

export const Column = styled.div`
  width: ${rem(80)};
  display: flex;
  justify-content: space-between;
`;

export const TextDate = styled(Text)<DateProps>`
  cursor: pointer;
  color: ${(props) => props.isActive && props.theme.pulsar.color.primary.normal};
  border-bottom: ${(props) =>
    props.isAll
      ? props.isActive
        ? `1px solid ${props.theme.pulsar.color.primary.normal}`
        : `1px solid ${props.theme.pulsar.color.text.masked}`
      : `1px solid transparent`};
`;
