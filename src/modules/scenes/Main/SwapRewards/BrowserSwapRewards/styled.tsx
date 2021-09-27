import { Card, CoinIcon, Icon, logos, Text } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

interface WidthProps {
  width: number;
}

export const BrowserSwapRewardsContainer = styled.div`
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
  @media (min-width: ${rem(media.xl)}) {
    width: ${rem(1188)};
  }
`;

export const BrowserSwapRewardsDiv = styled(Card)`
  justify-self: center;
  width: ${rem(344)};
  border-radius: ${({ theme }) => rem(theme.pulsar.size.closet)};
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 0;
  background: ${(props) =>
    props.theme.pulsar.id === 'PulsarLight'
      ? props.theme.pulsar.color.bg.normal
      : props.theme.pulsar.color.bg.accent};

  @media (min-width: ${rem(media.xs)}) {
    width: ${rem(350)};
  }
`;

export const BackIconBox = styled.div``;

export const BgContainer = styled.div`
  background-image: url(${logos.StarsBgAnimated});
  background-size: 100%;
  background-repeat: repeat;
`;

export const Top = styled.div`
  padding-top: ${({ theme }) => rem(theme.pulsar.size.street)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.house)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.house)};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Middle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.house)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.house)};
`;

export const Bottom = styled.div`
  width: 100%;
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
  background: ${({ theme }) => theme.pulsar.color.bg.masked};
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom-left-radius: ${({ theme }) => rem(theme.pulsar.size.closet)};
  border-bottom-right-radius: ${({ theme }) => rem(theme.pulsar.size.closet)};
`;

export const RowCoins = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.house)};
  margin-top: ${({ theme }) => rem(theme.pulsar.size.city)};
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
  align-items: center;
`;

export const IconCoin = styled(CoinIcon)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.city)};
`;

export const IconArrow = styled(Icon.ArrowRight)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.street)};
`;

export const RowFeatures = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  grid-row-gap: ${({ theme }) => rem(theme.pulsar.size.box)};
`;

export const RowFeature = styled.div`
  display: flex;
  align-items: center;
`;

export const RowTitle = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.room)};
`;

export const IconTick = styled(Icon.TickCircle)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
  margin-right: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  color: ${({ theme }) => theme.pulsar.color.primary.normal};
`;

export const TextFeature = styled(Text)`
  font-weight: bold;
  font-size: ${({ theme }) => rem(theme.pulsar.size.closet)};
`;

export const RowAmounts = styled.div`
  margin-top: ${({ theme }) => rem(theme.pulsar.size.street)};
  width: 100%;
  display: grid;
  grid-row-gap: ${({ theme }) => rem(theme.pulsar.size.drawer)};
`;

export const RowAmount = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

export const AmountLeft = styled.div`
  width: ${rem(90)};
`;

export const AmountRight = styled.div<WidthProps>`
  width: ${(props) => rem(props.width)};
  white-space: nowrap;
`;

export const RowClaim = styled.div`
  margin-top: ${({ theme }) => rem(theme.pulsar.size.street)};
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
  width: ${rem(160)};
`;
