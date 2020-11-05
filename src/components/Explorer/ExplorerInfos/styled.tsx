import styled from 'styled-components';
import { rem } from 'polished';
import { Icon } from '@swingby-protocol/pulsar';

export const ExplorerInfosContainer = styled.div`
  border-right: 1px solid #cecddc;
  border-left: 1px solid #cecddc;
  padding-right: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.city)};
`;
export const InfosContainer = styled.div`
  padding-top: ${({ theme }) => rem(theme.pulsar.size.country)};
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: ${({ theme }) => rem(theme.pulsar.size.street)};
`;
export const InfoContainer = styled.div`
  min-width: ${({ theme }) => rem(theme.pulsar.size.house)};
  display: grid;
  grid-template-columns: ${({ theme }) => rem(theme.pulsar.size.city)} auto;
  align-items: center;
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
`;

export const ValueSpan = styled.span`
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
  font-weight: bold;
`;
export const ValidatorLinkSpan = styled.span`
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
  margin-left: ${({ theme }) => rem(theme.pulsar.size.closet)};
  color: ${({ theme }) => theme.pulsar.color.primary.normal};
  border-bottom: 1px solid ${({ theme }) => theme.pulsar.color.primary.normal};
  margin-bottom: ${({ theme }) => -rem(theme.pulsar.size.closet)};
  :hover {
    cursor: pointer;
  }
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
export const NetworkValidators = styled(Icon.NetworkValidators)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.street)};
  color: ${({ theme }) => theme.pulsar.color.text.masked};
`;
