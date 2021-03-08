import styled from 'styled-components';
import { rem } from 'polished';
import { Text } from '@swingby-protocol/pulsar';

import { StylingConstants } from '../../../../styles';
import { LineBox } from '../../../Common';

const { media } = StylingConstants;

interface DateProps {
  isActive: boolean;
  isAll: boolean;
}

export const TotalSwingbyBondContainer = styled.div`
  grid-area: volume;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: ${({ theme }) => rem(theme.pulsar.size.town)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};
  background-color: ${({ theme }) => theme.pulsar.color.bg.hover};
  width: 100%;
  @media (min-width: ${rem(media.sm)}) {
    padding-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
  }

  @media (min-width: ${rem(media.lg)}) {
    margin-top: 0;
    grid-area: auto;
    padding-top: ${({ theme }) => rem(theme.pulsar.size.house)};
    padding-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};
    padding-left: ${({ theme }) => rem(theme.pulsar.size.street)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.street)};
    justify-self: center;
    padding-bottom: ${({ theme }) => rem(theme.pulsar.size.box)};
  }
`;

export const Box = styled.div`
  @media (min-width: ${rem(media.xs)}) {
    width: ${rem(330)};
  }
  @media (min-width: ${rem((media.xs + media.sm) / 2)}) {
    width: ${rem(330 * 1.2)};
  }
  @media (min-width: ${rem(media.sm)}) {
    width: ${rem(420)};
  }
  @media (min-width: ${rem((media.sm + media.md) / 2)}) {
    width: ${rem(420 * 1.4)};
    padding-left: ${({ theme }) => rem(theme.pulsar.size.street)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
  @media (min-width: ${rem(media.md)}) {
    width: ${rem(420)};
    padding-left: 0;
    padding-right: 0;
  }
  @media (min-width: ${rem((media.md + media.lg) / 2)}) {
    width: ${rem(420 * 1.3)};
  }
  @media (min-width: ${rem(media.lg)}) {
    margin-top: ${({ theme }) => rem(theme.pulsar.size.room)};
    width: ${rem(300)};
  }
  @media (min-width: ${rem((media.lg + media.xl) / 2)}) {
    width: ${rem(340)};
  }
  @media (min-width: ${rem(media.xl)}) {
    width: ${rem(380)};
    padding-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
`;

export const LineContainer = styled.div`
  text-align: center;
  position: relative;
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

export const LineDiv = styled(LineBox)`
  @media (min-width: ${rem(media.lg)}) {
    height: ${rem(126)};
  }
`;