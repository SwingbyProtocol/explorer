import { CoinIcon, Icon, StatusIcon, Text } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

interface BgProps {
  bg: boolean;
}

export const TxHistoriesMobileContainer = styled.div`
  margin-top: ${({ theme }) => rem(theme.pulsar.size.state)};
  @media (min-width: ${rem(media.sm)}) {
    padding-left: ${({ theme }) => rem(theme.pulsar.size.house)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.house)};
  }
  @media (min-width: ${rem(media.md)}) {
    display: none;
  }
`;

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
`;

export const Left = styled.div``;

export const Right = styled.div`
  padding-right: ${({ theme }) => rem(theme.pulsar.size.room)};
`;

export const Filter = styled(Icon.Filter)`
  color: ${({ theme }) => theme.pulsar.color.text.masked};
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
`;

export const TxHistoryRow = styled.div<BgProps>`
  height: ${rem(92)};
  background: ${(props) => !props.bg && props.theme.pulsar.color.bg.hover};
  padding-top: ${({ theme }) => rem(theme.pulsar.size.street)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.box)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  display: flex;
  cursor: pointer;

  @media (min-width: ${rem(media.xs)}) {
    display: grid;
    grid-template-columns: 28% 27% 9% 26% 10%;
  }
  @media (min-width: ${rem(media.sm)}) {
    display: grid;
    grid-template-columns: 24% 30% 8% 32% 6%;
  }
`;

export const Column = styled.div`
  height: ${({ theme }) => rem(theme.pulsar.size.state)};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;
export const Time = styled.div`
  display: flex;
`;
export const LabelText = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.drawer)};
`;

export const ColumnAmount = styled(Column)`
  width: ${rem(90)};
  display: grid;
  grid-template-columns: ${({ theme }) => rem(theme.pulsar.size.town)} ${rem(90 - 32)};
  align-items: center;
  @media (min-width: ${rem(media.xs)}) {
    width: ${rem(110)};
    grid-template-columns: ${({ theme }) => rem(theme.pulsar.size.town)} ${rem(110 - 32)};
  }
  @media (min-width: ${rem(media.sm)}) {
    width: ${rem(120)};
    grid-template-columns: ${({ theme }) => rem(theme.pulsar.size.town)} ${rem(120 - 32)};
  }
`;

export const Top = styled.div`
  width: ${({ theme }) => rem(theme.pulsar.size.state)};
  height: ${({ theme }) => rem(theme.pulsar.size.street)};
  display: flex;
  align-items: flex-end;
`;

export const Bottom = styled.div``;

export const Status = styled.div`
  align-items: center;
  display: flex;
  width: ${rem(100)};
`;

export const Detail = styled(Icon.CaretRight)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
  color: ${({ theme }) => theme.pulsar.color.text.masked};
  margin-left: ${({ theme }) => rem(theme.pulsar.size.box)};
`;

export const SwapHorizontal = styled(Icon.SwapHorizontal)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
  color: ${({ theme }) => theme.pulsar.color.text.masked};
  margin-right: ${({ theme }) => rem(theme.pulsar.size.house)};
`;

export const AmountText = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.closet)};
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  max-width: ${rem(54)};
  @media (min-width: ${rem(media.xs)}) {
    max-width: ${rem(60)};
  }
  @media (min-width: ${rem(media.sm)}) {
    max-width: ${rem(100)};
  }
`;

export const StatusText = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.closet)};
`;

export const Coin = styled(CoinIcon)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.street)};
`;

export const StatusCircle = styled(StatusIcon)`
  width: ${({ theme }) => rem(theme.pulsar.size.box * 1.5)};
  height: ${({ theme }) => rem(theme.pulsar.size.box * 1.5)};
  margin-right: ${({ theme }) => rem(theme.pulsar.size.box)};
`;

export const BrowserFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  @media (min-width: ${rem(media.md)}) {
    display: none;
  }
`;
