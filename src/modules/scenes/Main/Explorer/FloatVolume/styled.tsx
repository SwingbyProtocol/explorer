import styled from 'styled-components';
import { rem } from 'polished';
import { CoinIcon, Text } from '@swingby-protocol/pulsar';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

export const FloatVolumeContainer = styled.div`
  grid-area: network;
  padding-top: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.house)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.house)};
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.room)};

  @media (min-width: ${rem(media.xs)}) {
    display: flex;
    flex-direction: column;
  }
  @media (min-width: ${rem(media.sm)}) {
    margin-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
  @media (min-width: ${rem(media.lg)}) {
    grid-area: auto;
    padding-top: 0;
    padding-bottom: 0;
    padding-right: 0;
    margin-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
  @media (min-width: ${rem(media.xl)}) {
    padding-left: 0;
    margin-bottom: 0;
  }
`;

export const CoinContainer = styled.div`
  display: grid;
  grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.street)};
  align-self: center;
  justify-content: center;
  grid-template-columns: 1fr 1fr;
  height: ${rem(60)};
  @media (min-width: ${rem(media.md)}) {
    margin-top: 0;
    width: 100%;
    grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.street)};
    grid-template-columns: 1fr 1fr;
    padding-left: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
  @media (min-width: ${rem(media.lg)}) {
    padding-left: 0;
    grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.room)};
  }
  @media (min-width: ${rem(media.xl)}) {
    padding-right: ${({ theme }) => rem(theme.pulsar.size.city)};
    grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
`;

export const CoinInfo = styled.div`
  display: grid;
  grid-template-columns: ${rem(38)} auto;
  align-items: center;
  @media (min-width: ${rem(media.xs)}) {
    width: ${rem(160)};
  }
  @media (min-width: ${rem(media.sm)}) {
    grid-template-columns: ${rem(46)} auto;
  }
`;

export const Coin = styled(CoinIcon)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.town)};
`;

export const DataDiv = styled.div`
  display: grid;
  grid-row-gap: ${({ theme }) => rem(theme.pulsar.size.box)};
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: ${rem(50)} auto;
`;

export const FloatSpan = styled.div`
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
  font-weight: bold;
`;

export const VolSpan = styled.div`
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
`;

export const BridgeContainer = styled.div`
  margin-top: ${({ theme }) => rem(theme.pulsar.size.box)};
`;

export const TextBridge = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
`;

export const BridgeInfos = styled.div`
  display: grid;
  justify-content: center;
  @media (min-width: ${rem(media.lg)}) {
    margin-top: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  }
`;

export const RowBridge = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => rem(theme.pulsar.size.box / 2)};
  @media (min-width: ${rem(media.md)}) {
    margin-left: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
  @media (min-width: ${rem(media.lg)}) {
    margin-left: 0;
  }
`;

export const Atag = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  margin-right: ${({ theme }) => rem(theme.pulsar.size.closet)};
`;

export const TextLink = styled(Text)`
  border-bottom: 1px solid ${({ theme }) => theme.pulsar.color.text.masked};
`;
