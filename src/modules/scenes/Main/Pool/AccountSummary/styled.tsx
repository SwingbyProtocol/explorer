import { CoinIcon, Text } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

export const AccountSummaryContainer = styled.div`
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
    height: ${rem(190)};
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

export const Top = styled.div``;

export const Bottom = styled.div``;

export const RowBalance = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.box)};
`;

export const Coin = styled(CoinIcon)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.town)};
`;

export const CoinMini = styled(CoinIcon)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.street)};
  margin-top: ${({ theme }) => rem(-theme.pulsar.size.box / 2)};
  margin-right: ${({ theme }) => rem(theme.pulsar.size.box / 2)};
`;

export const Column = styled.div`
  height: ${({ theme }) => rem(theme.pulsar.size.state)};
  display: grid;
  grid-template-columns: ${({ theme }) => rem(theme.pulsar.size.state)} auto;
  align-items: center;
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};
`;

export const TextAmount = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
`;

export const RowTitle = styled.div`
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.room)};
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
`;
