import styled from 'styled-components';
import { Icon, StatusIcon, Text } from '@swingby-protocol/pulsar';
import { rem } from 'polished';

interface BgProps {
  bg: boolean;
}
// Request: Please add `disable` Props for icon
interface ButtonProps {
  disable: boolean;
}
export const TxHistoriesContainer = styled.div`
  /* Memo: Make space for when loading txs data */
  min-height: ${rem(413)};
`;

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
`;

export const Left = styled.div``;

export const Right = styled.div`
  padding-right: ${({ theme }) => rem(theme.pulsar.size.house)};
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.street)};
  align-items: center;
`;

export const Filter = styled(Icon.Filter)`
  color: ${({ theme }) => theme.pulsar.color.text.masked};
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
`;

export const TxHistoryRow = styled.div`
  height: ${rem(92)};
  background: ${(props: BgProps) => !props.bg && 'rgba(43, 55, 74, 0.02)'};
  padding-top: ${({ theme }) => rem(theme.pulsar.size.street)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.house)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.house)};
  display: grid;
  grid-template-columns: 10% 4% 24% 18% 6% 20% 15.5% 4%;
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
  max-width: ${rem(240)};
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

export const StatusCircle = styled(StatusIcon)`
  width: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  height: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  margin-right: ${({ theme }) => rem(theme.pulsar.size.box)};
`;
export const BrowserFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const Pagination = styled.div`
  display: flex;
  align-items: center;
`;
export const PageText = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const IconCaretLeft = styled(Icon.CaretLeft)`
  color: ${({ theme }) => theme.pulsar.color.text.masked};
  margin-right: ${({ theme }) => rem(theme.pulsar.size.room)};
  opacity: ${(props: ButtonProps) => props.disable && 0.4};
  cursor: ${(props: ButtonProps) => (props.disable ? 'not-allowed' : 'pointer')};
`;
export const IconCaretRight = styled(Icon.CaretRight)`
  color: ${({ theme }) => theme.pulsar.color.text.masked};
  margin-left: ${({ theme }) => rem(theme.pulsar.size.room)};
  opacity: ${(props: ButtonProps) => props.disable && 0.4};
  cursor: ${(props: ButtonProps) => (props.disable ? 'not-allowed' : 'pointer')};
`;
