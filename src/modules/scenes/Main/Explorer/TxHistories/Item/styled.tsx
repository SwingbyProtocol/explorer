import { CoinIcon, Icon, SwapStatusIcon, Text } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../../styles';

interface BgProps {
  bg: boolean;
  borderColor: string;
}

const { media } = StylingConstants;

export const TxHistoryRow = styled.div<BgProps>`
  height: ${rem(92)};
  background: ${(props) => !props.bg && props.theme.pulsar.color.bg.hover};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.box)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  @media (min-width: ${rem(media.md)}) {
    display: grid;

    grid-template-columns: 13% 20% 22% 5% 22% auto;
    padding-right: ${({ theme }) => rem(0)};
    padding-left: ${({ theme }) => rem(0)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.house)};
    padding-left: ${({ theme }) => rem(theme.pulsar.size.house)};
  }
  @media (min-width: ${rem(media.lg)}) {
    grid-template-columns: 13% 20% 21% 4% 23% 15% auto;
  }
  @media (min-width: ${rem(media.xl)}) {
    /* Memo: Won't show animation for low spec computer   */
    transition: all 0.3s ease 0s;
    border: 2px solid transparent;
    :hover {
      border: ${(props) => props.borderColor};
      transition: all 0.3s ease 0s;
      border-radius: 6px;
    }
  }
`;

export const Column = styled.div`
  height: ${({ theme }) => rem(theme.pulsar.size.state)};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const ColumnMobile = styled(Column)`
  @media (min-width: ${rem(media.md)}) {
    display: none;
  }
`;

export const ColumnM = styled(Column)`
  display: none;
  @media (min-width: ${rem(media.md)}) {
    display: flex;
  }
`;

export const ColumnEllipsis = styled(Column)``;

export const ColumnAmount = styled(Column)`
  display: grid;
  grid-template-columns: ${({ theme }) => rem(theme.pulsar.size.town)} ${rem(60)};
  align-items: center;
  height: auto;
  @media (min-width: ${rem(media.md)}) {
    grid-template-columns: ${({ theme }) => rem(theme.pulsar.size.state)} ${rem(100)};
  }
`;

export const ColumnFee = styled.div`
  display: none;
  @media (min-width: ${rem(media.lg)}) {
    height: ${({ theme }) => rem(theme.pulsar.size.state)};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    word-break: break-word;
    max-width: ${rem(140)};
  }
`;

export const Top = styled.div`
  width: ${({ theme }) => rem(theme.pulsar.size.state)};
  display: flex;
  @media (min-width: ${rem(media.md)}) {
    display: block;
  }
`;

export const Row = styled.div``;

export const RowAbsolute = styled.div`
  position: absolute;
  bottom: ${({ theme }) => rem(theme.pulsar.size.closet)};
  @media (min-width: ${rem(media.md)}) {
    bottom: ${rem(0)};
  }
  @media (min-width: ${rem(media.lg)}) {
    bottom: ${({ theme }) => rem(theme.pulsar.size.box)};
  }
`;

export const RowAddress = styled.div`
  display: grid;
  grid-template-columns: ${({ theme }) => rem(theme.pulsar.size.city)} auto;
`;

export const Status = styled.div`
  align-items: center;
  display: flex;
  width: ${rem(90)};
  @media (min-width: ${rem(media.md)}) {
    width: ${rem(120)};
  }
`;

export const Ellipsis = styled(Icon.Ellipsis)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.street)};
  cursor: pointer;
  transition: all 0.3s ease 0s;
  :hover {
    transition: all 0.3s ease 0s;
    transform: scale(1.15);
  }
`;

export const IconArrowRight = styled(Icon.ArrowRight)`
  margin-right: ${({ theme }) => rem(theme.pulsar.size.house)};
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
  color: ${({ theme }) => theme.pulsar.color.text.masked};
  @media (min-width: ${rem(media.md)}) {
    margin-right: 0;
  }
`;

export const RowAmount = styled.div`
  width: ${rem(50)};
  @media (min-width: ${rem(media.xs)}) {
    width: ${rem(70)};
  }
  @media (min-width: ${rem(media.sm)}) {
    width: ${rem(90)};
  }
  @media (min-width: ${rem(media.md)}) {
    width: 100%;
  }
`;

export const AmountSpan = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.closet)};
  display: block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.box)};
  @media (min-width: ${rem(media.md)}) {
    font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
  }
`;

export const NetworkText = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  @media (min-width: ${rem(media.md)}) {
    font-size: ${({ theme }) => rem(theme.pulsar.size.closet)};
    white-space: nowrap;
  }
`;

export const TextTime = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  @media (min-width: ${rem(media.md)}) {
    font-size: ${({ theme }) => rem(theme.pulsar.size.closet)};
  }
`;
export const TextConfirmation = styled(TextTime)``;

export const StatusText = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.closet)};
  @media (min-width: ${rem(media.md)}) {
    font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
  }
`;

export const Coin = styled(CoinIcon)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.street)};
  @media (min-width: ${rem(media.md)}) {
    font-size: ${({ theme }) => rem(theme.pulsar.size.town)};
  }
`;

export const StatusCircle = styled(SwapStatusIcon)`
  width: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  height: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  margin-right: ${({ theme }) => rem(theme.pulsar.size.box)};
`;

export const IconDetail = styled(Icon.CaretRight)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
  color: ${({ theme }) => theme.pulsar.color.text.masked};
  margin-left: ${({ theme }) => rem(theme.pulsar.size.box)};
`;
