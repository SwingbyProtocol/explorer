import styled from 'styled-components';
import { rem } from 'polished';
import { CoinIcon } from '@swingby-protocol/pulsar';

export const CoinContainer = styled.div`
  margin-top: ${({ theme }) => rem(theme.pulsar.size.city)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.city)};
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: ${({ theme }) => rem(theme.pulsar.size.street)};
`;

export const CoinInfo = styled.div`
  min-width: ${rem(160)};
  display: grid;
  grid-template-columns: ${rem(50)} auto;
  align-items: center;
`;

export const Coin = styled(CoinIcon)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.city)};
`;

export const DataDiv = styled.div`
  display: grid;
  grid-row-gap: ${({ theme }) => rem(theme.pulsar.size.box)};
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: ${rem(50)} auto;
`;

export const AmountSpan = styled.div`
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
  font-weight: bold;
`;
