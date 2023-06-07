import { Card, Icon, Text } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

export const BrowserContainer = styled.div`
  display: grid;
  padding-top: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.room)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.closet)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.closet)};
  @media (min-width: ${rem(media.sm)}) {
    padding-top: 0;
    padding-left: 0;
    padding-right: 0;
  }
  @media (min-width: ${rem(media.lg)}) {
    padding-bottom: ${({ theme }) => rem(theme.pulsar.size.state)};
  }
  @media (min-width: ${rem(media.xl)}) {
    justify-self: center;
  }
`;

export const BrowserDiv = styled(Card)`
  background-color: var(--theme-card-color);
  box-shadow: var(--theme-card-shadow);
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  @media (min-width: ${rem(media.lg)}) {
    padding-top: ${({ theme }) => rem(theme.pulsar.size.town)};
    padding-left: ${({ theme }) => rem(theme.pulsar.size.box)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.box)};
    padding-bottom: ${({ theme }) => rem(theme.pulsar.size.closet)};
  }
  @media (min-width: ${rem(media.xl)}) {
    padding-left: ${({ theme }) => rem(theme.pulsar.size.town)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.town)};
    padding-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};
  }
`;

export const Top = styled.div`
  @media (min-width: ${rem(media.lg)}) {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    align-items: start;
  }
  padding-top: 0;
  @media (min-width: ${rem(media.xl)}) {
  }
`;

export const Bottom = styled.div`
  margin-top: ${({ theme }) => rem(theme.pulsar.size.house)};
  @media (min-width: ${rem(media.md)}) {
    margin-top: 0;
  }
  @media (min-width: ${rem(media.lg)}) {
    margin-top: ${({ theme }) => rem(theme.pulsar.size.town)};
  }
  @media (min-width: ${rem(media.xl)}) {
    margin-top: ${({ theme }) => rem(theme.pulsar.size.state)};
  }
`;

export const TextTvl = styled(Text)`
  display: flex;
  align-items: center;
  margin-right: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  margin-top: ${({ theme }) => rem(theme.pulsar.size.box / 2)};
  @media (min-width: ${rem(media.xs)}) {
    margin-top: ${({ theme }) => rem(theme.pulsar.size.box)};
    margin-bottom: ${({ theme }) => rem(-theme.pulsar.size.box)};
  }
  @media (min-width: ${rem(media.md)}) {
    margin-top: ${({ theme }) => rem(theme.pulsar.size.box / 2)};
  }
  @media (min-width: ${rem(media.lg)}) {
    font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
  }
`;

export const IconInfo = styled(Icon.InfoCircle)`
  margin-bottom: ${({ theme }) => rem(-theme.pulsar.size.box / 2)};
  margin-right: ${({ theme }) => rem(theme.pulsar.size.closet)};
  font-size: ${({ theme }) => rem(theme.pulsar.size.closet)};
  color: ${({ theme }) => theme.pulsar.color.text.masked};
  cursor: pointer;
`;

export const RowTitleText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${({ theme }) => rem(theme.pulsar.size.street)};
  @media (min-width: ${rem(media.lg)}) {
    margin-top: 0;
    flex-direction: row;
    justify-content: space-between;
    padding-left: ${({ theme }) => rem(theme.pulsar.size.closet)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.closet)};
  }
  @media (min-width: ${rem(media.xl)}) {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const RowTvlText = styled.div`
  display: flex;
`;

export const RowLoader = styled.div`
  margin-left: ${({ theme }) => rem(theme.pulsar.size.drawer)};
`;

export const TitleText = styled(Text)`
  @media (min-width: ${rem(media.xs)}) {
    text-align: center;
  }
  @media (min-width: ${rem(media.md)}) {
    text-align: left;
  }
`;
