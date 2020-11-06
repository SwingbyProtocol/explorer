import styled from 'styled-components';
import { Icon, Text } from '@swingby-protocol/pulsar';
import { rem } from 'polished';

export const TxHistoriesContainer = styled.div``;

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Left = styled.div``;

export const Right = styled.div`
  padding-right: ${({ theme }) => rem(theme.pulsar.size.street)};
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.city)};
`;

export const Filter = styled(Icon.Filter)`
  color: ${({ theme }) => theme.pulsar.color.text.masked};
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
`;

export const TxHistoriesRow = styled.div`
  height: ${rem(92)};
  background: rgba(43, 55, 74, 0.02);
  margin-top: ${({ theme }) => rem(theme.pulsar.size.street)};
  padding-top: ${({ theme }) => rem(theme.pulsar.size.street)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.house)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.house)};
  display: grid;
  grid-template-columns: 10% 4% 30% 18% 6% 20% 8% 4%;
`;

export const Column = styled.div`
  height: ${({ theme }) => rem(theme.pulsar.size.state)};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const Top = styled.div`
  margin-bottom: ${({ theme }) => theme.pulsar.size.box};
  height: ${({ theme }) => rem(theme.pulsar.size.street)};
`;

export const Bottom = styled.div``;

export const Status = styled.div`
  align-items: center;
  display: flex;
  width: ${rem(100)};
`;

export const ColumnAmount = styled.div`
  height: ${({ theme }) => rem(theme.pulsar.size.state)};
  justify-content: center;
  display: grid;
  grid-template-columns: ${({ theme }) => rem(theme.pulsar.size.state)} ${rem(150)};
  align-items: center;
`;

export const Ellipsis = styled(Icon.Ellipsis)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.street)};
  :hover {
    cursor: pointer;
  }
`;

export const SwapHorizontal = styled(Icon.SwapHorizontal)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.street)};
  color: ${({ theme }) => theme.pulsar.color.text.masked};
`;

export const AddressP = styled.p`
  color: #3799da;
  font-weight: bold;
  max-width: ${rem(320)};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
`;

export const AmountSpan = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
`;

export const StatusText = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
`;

export const CoinImg = styled.img`
  width: ${({ theme }) => rem(theme.pulsar.size.town)};
`;
