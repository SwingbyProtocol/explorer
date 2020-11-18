import styled from 'styled-components';
import { rem } from 'polished';
import { Icon, Text } from '@swingby-protocol/pulsar';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

export const ExplorerInfosContainer = styled.div`
  grid-area: infos;
  padding-right: ${({ theme }) => rem(theme.pulsar.size.street)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.street)};
  @media (min-width: ${rem(media.xs)}) {
    display: flex;
    flex-direction: column;
  }
  @media (min-width: ${rem(media.md)}) {
    padding-top: ${({ theme }) => rem(theme.pulsar.size.box * 7)};
  }
  @media (min-width: ${rem(media.lg)}) {
    padding-top: ${({ theme }) => rem(theme.pulsar.size.closet)};
    grid-area: auto;
    border-right: 1px solid #cecddc;
    border-left: 1px solid #cecddc;
    padding-right: 0;
    padding-left: ${({ theme }) => rem(theme.pulsar.size.house)};
  }
  @media (min-width: ${rem(media.xl)}) {
    padding-left: ${({ theme }) => rem(theme.pulsar.size.town)};
  }
`;

export const InfosContainer = styled.div`
  border-top: 1px solid #cecddc;
  border-bottom: 1px solid #cecddc;
  padding-top: ${({ theme }) => rem(theme.pulsar.size.town)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.town)};
  display: grid;
  align-self: center;
  grid-template-columns: 1fr 1fr;
  grid-gap: ${({ theme }) => rem(theme.pulsar.size.street)};
  @media (min-width: ${rem(media.sm)}) {
    padding-top: ${({ theme }) => rem(theme.pulsar.size.state)};
    padding-bottom: ${({ theme }) => rem(theme.pulsar.size.state)};
  }
  @media (min-width: ${rem(media.md)}) {
    padding-top: ${({ theme }) => rem(theme.pulsar.size.country)};
    padding-left: ${({ theme }) => rem(theme.pulsar.size.city)};
    padding-bottom: 0;
    border-top: 0px solid transparent;
    border-bottom: 0px solid transparent;
    grid-gap: ${({ theme }) => rem(theme.pulsar.size.room)};
    grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.box)};
  }
  ${({ theme }) => rem(theme.pulsar.size.house)};
  @media (min-width: ${rem(media.lg)}) {
    grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.house)};
    padding-left: 0;
    padding-top: ${({ theme }) => rem(theme.pulsar.size.town)};
  }
  @media (min-width: ${rem(media.xl)}) {
    grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
`;

export const InfoContainer = styled.div`
  min-width: ${({ theme }) => rem(theme.pulsar.size.house)};
  display: grid;
  grid-template-columns: ${({ theme }) => rem(theme.pulsar.size.city)} auto;
  align-items: center;
  @media (min-width: ${rem(media.xs)}) {
    width: ${rem(160)};
  }
  @media (min-width: ${rem(media.lg)}) {
    width: ${rem(160)};
  }
`;

export const DataDiv = styled.div`
  display: grid;
  grid-row-gap: ${({ theme }) => rem(theme.pulsar.size.box)};
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: ${({ theme }) => rem(theme.pulsar.size.state)} auto;
  white-space: nowrap;
`;

export const RowValidator = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => rem(-theme.pulsar.size.box)};
`;

export const ValueSpan = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
`;

export const ValidatorLinkSpan = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
  margin-left: ${({ theme }) => rem(theme.pulsar.size.closet)};
  color: ${({ theme }) => theme.pulsar.color.primary.normal};
  border-bottom: 1px solid ${({ theme }) => theme.pulsar.color.primary.normal};
  cursor: pointer;
`;

export const Network = styled(Icon.NetworkVolume)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.street)};
  color: ${({ theme }) => theme.pulsar.color.text.masked};
`;

export const NetworkRewards = styled(Icon.NetworkRewards)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.street)};
  color: ${({ theme }) => theme.pulsar.color.text.masked};
`;

export const NetworkCapacity = styled(Icon.NetworkCapacity)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.street)};
  color: ${({ theme }) => theme.pulsar.color.text.masked};
`;

export const NetworkMetanodes = styled(Icon.NetworkValidators)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.street)};
  color: ${({ theme }) => theme.pulsar.color.text.masked};
`;
