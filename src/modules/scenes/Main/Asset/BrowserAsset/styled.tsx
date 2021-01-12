import { Card, Text } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

export const BrowserAssetContainer = styled.div`
  display: grid;
  padding-top: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.room)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.closet)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.closet)};
  margin-top: ${({ theme }) => rem(theme.pulsar.size.house)};
  @media (min-width: ${rem(media.sm)}) {
    padding-top: 0;
    padding-left: 0;
    padding-right: 0;
    margin-top: 0;
  }
  @media (min-width: ${rem(media.md)}) {
    padding-bottom: ${({ theme }) => rem(theme.pulsar.size.state)};
  }
`;

export const BrowserAssetDiv = styled(Card)`
  padding-top: ${({ theme }) => rem(theme.pulsar.size.street)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.town)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  @media (min-width: ${rem(media.xs)}) {
    padding: ${({ theme }) => rem(theme.pulsar.size.street)};
    padding-bottom: ${({ theme }) => rem(theme.pulsar.size.town)};
  }
  @media (min-width: ${rem(media.md)}) {
    padding-top: ${({ theme }) => rem(theme.pulsar.size.town)};
    padding-left: ${({ theme }) => rem(theme.pulsar.size.street)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
  @media (min-width: ${rem(media.lg)}) {
    padding-top: ${({ theme }) => rem(theme.pulsar.size.street)};
    padding-left: ${({ theme }) => rem(theme.pulsar.size.city)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.city)};
  }
  @media (min-width: ${rem(media.xl)}) {
    width: ${rem(1188)};
  }
`;

export const Container = styled.div`
  @media (min-width: ${rem(media.md)}) {
    display: grid;
    grid-template-columns: 50% 50%;
  }
`;

export const CoinIntro = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.pulsar.color.border.normal};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
  @media (min-width: ${rem(media.md)}) {
    border-bottom: 0px solid ${({ theme }) => theme.pulsar.color.border.normal};
    border-right: 2px solid ${({ theme }) => theme.pulsar.color.border.normal};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
`;

export const CoinWidgets = styled.div`
  display: grid;
  grid-row-gap: ${({ theme }) => rem(theme.pulsar.size.street)};
  margin-top: ${({ theme }) => rem(theme.pulsar.size.street)};
  @media (min-width: ${rem(media.md)}) {
    margin-top: 0;
    padding-left: ${({ theme }) => rem(theme.pulsar.size.street)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
`;

export const TextTitle = styled(Text)`
  font-weight: 700;
  display: block;
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
`;

export const TextTitleMobile = styled(TextTitle)`
  @media (min-width: ${rem(media.md)}) {
    display: none;
  }
`;

export const TextTitleLaptop = styled(TextTitle)`
  display: none;
  @media (min-width: ${rem(media.md)}) {
    display: block;
  }
`;

export const WidgetContainer = styled.div`
  justify-self: center;
  width: ${rem(332)};
  @media (min-width: ${rem(media.sm)}) {
    width: ${rem(464)};
  }
  @media (min-width: ${rem(media.md)}) {
    width: ${rem(326)};
  }
  @media (min-width: ${rem(media.lg)}) {
    width: ${rem(430)};
  }
  @media (min-width: ${rem(media.xl)}) {
    width: ${rem(502)};
  }
`;

export const CoinInfo = styled(WidgetContainer)``;

export const ChartBox = styled(WidgetContainer)``;
