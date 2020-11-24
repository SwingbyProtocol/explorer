import { CoinIcon, Icon, Text } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

export const DetailCardContainer = styled.div`
  background-color: ${({ theme }) => theme.pulsar.color.bg.hover};
  margin-top: ${({ theme }) => rem(theme.pulsar.size.box * 5)};
  padding: ${({ theme }) => rem(theme.pulsar.size.house)};
  @media (min-width: ${rem(media.xs)}) {
    padding: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
`;

export const Top = styled.div``;

export const Bottom = styled.div``;

export const Coin = styled(CoinIcon)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.town)};
`;

export const Column = styled.div`
  height: ${({ theme }) => rem(theme.pulsar.size.state)};
  display: grid;
  grid-template-columns: ${({ theme }) => rem(theme.pulsar.size.state)} auto;
  align-items: center;
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.box * 5)};
`;

export const TextAmount = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
`;

export const TextRoom = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
`;

export const IconInfo = styled(Icon.InfoCircle)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
  color: ${({ theme }) => theme.pulsar.color.text.masked};
  cursor: pointer;
`;

export const RowRole = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const RowAddress = styled.div`
  display: grid;
  grid-template-columns: ${({ theme }) => rem(theme.pulsar.size.state)} auto;
  align-items: center;
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.drawer)};
`;

export const AddressP = styled.p`
  color: #3799da;
  font-weight: bold;
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
  margin: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
