import styled from 'styled-components';
import { rem } from 'polished';
import { CoinIcon, Text } from '@swingby-protocol/pulsar';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

export const NetworkBridgeContainer = styled.div`
  padding-top: ${({ theme }) => rem(theme.pulsar.size.house)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.house)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.house)};
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.room)};

  @media (min-width: ${rem(media.xs)}) {
    display: flex;
    flex-direction: column;
  }
  @media (min-width: ${rem(media.sm)}) {
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    margin-bottom: 0;
  }
`;

export const TitleText = styled(Text)`
  @media (min-width: ${rem(media.xs)}) {
    text-align: center;
  }
  @media (min-width: ${rem(media.sm)}) {
    text-align: left;
  }
`;

export const CoinContainer = styled.div`
  margin-top: ${({ theme }) => rem(theme.pulsar.size.street)};
  display: grid;
  grid-gap: ${({ theme }) => rem(theme.pulsar.size.street)};
  align-self: center;
  justify-content: center;
  grid-template-columns: 1fr 1fr;
  @media (min-width: ${rem(media.xs)}) {
    grid-gap: ${({ theme }) => rem(theme.pulsar.size.town)};
  }
  @media (min-width: ${rem(media.sm)}) {
    margin-top: ${({ theme }) => rem(theme.pulsar.size.city)};
    width: 100%;
    padding-right: ${({ theme }) => rem(theme.pulsar.size.city)};
    grid-gap: ${({ theme }) => rem(theme.pulsar.size.street)};
    grid-template-columns: 1fr 1fr;
  }
`;

export const CoinInfo = styled.div`
  display: grid;
  grid-template-columns: ${rem(40)} auto;
  align-items: center;
  @media (min-width: ${rem(media.xs)}) {
    width: ${rem(160)};
  }
  @media (min-width: ${rem(media.sm)}) {
    grid-template-columns: ${rem(50)} auto;
  }
`;

export const Coin = styled(CoinIcon)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.town)};

  @media (min-width: ${rem(media.sm)}) {
    font-size: ${({ theme }) => rem(theme.pulsar.size.city)};
  }
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
