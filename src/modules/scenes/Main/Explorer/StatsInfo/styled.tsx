import styled from 'styled-components';
import { rem } from 'polished';
import { Icon, Text } from '@swingby-protocol/pulsar';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

export const StatsInfoContainer = styled.div`
  padding-right: ${({ theme }) => rem(theme.pulsar.size.street)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.street)};
  @media (min-width: ${rem(media.xs)}) {
    display: flex;
    justify-content: center;
  }
  @media (min-width: ${rem(media.lg)}) {
    grid-area: auto;
    border-left: 1px solid #cecddc;
    padding-right: 0;
    padding-left: ${({ theme }) => rem(theme.pulsar.size.house)};
    margin-top: ${({ theme }) => rem(theme.pulsar.size.town)};
  }
  @media (min-width: ${rem(media.xl)}) {
    padding-left: ${({ theme }) => rem(theme.pulsar.size.house)};
  }
`;

export const InfosContainer = styled.div`
  border-top: 1px solid #cecddc;
  padding-top: ${({ theme }) => rem(theme.pulsar.size.town)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.town)};
  display: grid;
  align-self: center;
  grid-template-columns: 1fr;
  grid-gap: ${({ theme }) => rem(theme.pulsar.size.street)};
  @media (min-width: ${rem(media.xs)}) {
    width: ${rem(344)};
  }
  @media (min-width: ${rem(media.sm)}) {
    padding-top: ${({ theme }) => rem(theme.pulsar.size.state)};
    padding-bottom: ${({ theme }) => rem(theme.pulsar.size.state)};
  }
  @media (min-width: ${rem(media.md)}) {
    padding-top: 0;
    padding-left: 0;
    border-top: 0px solid transparent;
    grid-gap: ${({ theme }) => rem(theme.pulsar.size.room)};
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    width: 100%;
  }
  ${({ theme }) => rem(theme.pulsar.size.house)};
  @media (min-width: ${rem(media.lg)}) {
    padding-right: ${({ theme }) => rem(theme.pulsar.size.house)};
    grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.house)};
    padding-left: 0;
    padding-bottom: 0;
    padding-top: 0;
  }
  @media (min-width: ${rem(media.xl)}) {
    padding-right: ${({ theme }) => rem(theme.pulsar.size.box)};
  }
`;

export const InfoContainer = styled.div`
  min-width: ${({ theme }) => rem(theme.pulsar.size.house)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (min-width: ${rem(media.xs)}) {
  }
  @media (min-width: ${rem(media.lg)}) {
    align-items: flex-end;
  }
`;

export const DataDiv = styled.div`
  display: grid;
  grid-row-gap: ${({ theme }) => rem(theme.pulsar.size.box)};
  margin-left: ${({ theme }) => rem(theme.pulsar.size.closet)};
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  white-space: nowrap;
`;

export const RowValidator = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => rem(-theme.pulsar.size.box)};
`;

export const TextValue = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
`;

export const TextEst = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.closet)};
  align-self: end;
  padding-left: ${({ theme }) => rem(theme.pulsar.size.box)};
  @media (min-width: ${rem(media.xs)}) {
    padding-left: 0;
  }
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

export const NetworkLock = styled(Icon.Lock)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.street)};
  color: ${({ theme }) => theme.pulsar.color.text.masked};
`;

export const NetworkMetanodes = styled(Icon.NetworkValidators)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.street)};
  color: ${({ theme }) => theme.pulsar.color.text.masked};
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  @media (min-width: ${rem(media.xl)}) {
    margin-right: ${({ theme }) => rem(theme.pulsar.size.box)};
  }
`;
export const Right = styled.div``;

export const ChartBox = styled.div`
  width: ${rem(176)};
  height: ${rem(60)};
  @media (min-width: ${rem(media.xs)}) {
    width: ${rem(186)};
    height: ${rem(64)};
  }
  @media (min-width: ${rem(media.md)}) {
    width: ${rem(200)};
    height: ${rem(70)};
  }
  @media (min-width: ${rem((media.md + media.lg) / 2)}) {
    width: ${rem(258)};
    height: ${rem(90)};
  }
  @media (min-width: ${rem(media.lg)}) {
    width: ${rem(170)};
    height: ${rem(76)};
  }
  @media (min-width: ${rem(media.xl)}) {
    width: ${rem(220)};
    height: ${rem(76)};
  }
`;

export const StatsWithoutChart = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const DataRow = styled.div`
  display: flex;
  align-items: center;
`;

export const IconInfo = styled(Icon.InfoCircle)`
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.box / 2)};
  margin-left: ${({ theme }) => rem(theme.pulsar.size.closet)};
  font-size: ${({ theme }) => rem(theme.pulsar.size.closet)};
  color: ${({ theme }) => theme.pulsar.color.text.masked};
  cursor: pointer;
`;
