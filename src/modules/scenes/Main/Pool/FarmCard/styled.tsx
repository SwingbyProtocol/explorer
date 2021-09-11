import { CoinIcon, Icon, Text } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../styles';
import { ButtonScale } from '../../../Common';

const { media } = StylingConstants;

export const FarmCardContainer = styled.div`
  background-color: ${({ theme }) => theme.pulsar.color.bg.hover};
  padding: ${({ theme }) => rem(theme.pulsar.size.house)};
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
  @media (min-width: ${rem(media.xs)}) {
    padding: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
  @media (min-width: ${rem(media.md)}) {
    width: ${rem(400)};
  }
  @media (min-width: ${rem((media.md + media.lg) / 2)}) {
    width: ${rem(400 * 1.3)};
  }
  @media (min-width: ${rem(media.lg)}) {
    margin-bottom: 0;
    width: ${rem(280)};
    /* height: ${rem(190)}; */
    height: ${rem(250)};
    padding-top: ${({ theme }) => rem(theme.pulsar.size.closet)};
    padding-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};
    padding-left: ${({ theme }) => rem(theme.pulsar.size.street)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
  @media (min-width: ${rem((media.lg + media.xl) / 2)}) {
    width: ${rem(280 * 1.4)};
  }
  @media (min-width: ${rem(media.xl)}) {
    width: ${rem(280)};
  }
`;

export const Coin = styled(CoinIcon)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.state)};
  align-self: center;
`;

export const CoinMini = styled(CoinIcon)`
  font-size: ${rem(28)};
`;

export const Box = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: ${({ theme }) => rem(theme.pulsar.size.house)};
`;

export const Column = styled.div`
  height: ${({ theme }) => rem(theme.pulsar.size.state)};
  display: grid;
  grid-template-columns: ${({ theme }) => rem(theme.pulsar.size.city)} auto;
  align-items: center;
  /* margin-bottom: ${({ theme }) => rem(theme.pulsar.size.house)}; */
`;

export const RowTitle = styled.div`
  /* margin-bottom: ${({ theme }) => rem(theme.pulsar.size.box)}; */
`;

export const RowEarning = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  justify-content: space-between;
`;

export const Atag = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  /* border-bottom: 1px solid ${({ theme }) => theme.pulsar.color.text.placeholder}; */
`;

export const AprBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TextTitle = styled(Text)`
  font-weight: bold;
  font-size: ${({ theme }) => rem(theme.pulsar.size.closet)};
`;

export const TextTvl = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
`;

export const FeaturesBox = styled.div`
  /* display: flex; */
  /* justify-content: space-between; */
  margin-top: ${({ theme }) => rem(theme.pulsar.size.house)};
  padding-top: ${({ theme }) => rem(theme.pulsar.size.room)};
  border-top: 1px solid ${({ theme }) => theme.pulsar.color.text.placeholder};
`;

export const RowFeatures = styled.div`
  display: flex;
  align-content: center;
  margin-top: ${({ theme }) => rem(theme.pulsar.size.box)};
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => rem(theme.pulsar.size.house)};
`;

export const ButtonLink = styled(ButtonScale)`
  width: ${rem(108)};
`;

export const IconTick = styled(Icon.TickCircle)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
  margin-right: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  color: ${({ theme }) => theme.pulsar.color.primary.normal};
`;
