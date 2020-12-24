import { CoinIcon, Icon, StatusIcon, Text } from '@swingby-protocol/pulsar';
import { motion } from 'framer-motion';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../styles';

interface BgProps {
  bg: boolean;
}

interface ContainerProps {
  txsHeight: number;
}
interface BridgeProps {
  isFloats: boolean;
}

const { media } = StylingConstants;

// Memo: PX for height of filter row
const filterRowHeight = 46;
export const TxHistoriesContainer = styled.div<ContainerProps>`
  /* Memo: Make space for when loading txs data */
  min-height: ${(props) => rem(filterRowHeight + props.txsHeight)};
`;

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
`;

export const Left = styled.div`
  padding-left: ${({ theme }) => rem(theme.pulsar.size.house)};
  @media (min-width: ${rem(media.xl)}) {
    padding-right: 0;
  }
`;

export const Right = styled.div<BridgeProps>`
  padding-right: ${({ theme }) => rem(theme.pulsar.size.house)};
  @media (min-width: ${rem(media.lg)}) {
    display: grid;
    grid-template-columns: ${rem(100)} 1fr;
    grid-column-gap: ${(props) =>
      props.isFloats ? `${rem(70)}` : `${rem(props.theme.pulsar.size.town)}`};
    align-items: center;
  }
  @media (min-width: ${rem(media.xl)}) {
    padding-right: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
`;

export const TextFee = styled(Text)`
  display: none;
  @media (min-width: ${rem(media.lg)}) {
    display: block;
  }
`;

export const TxHistoryRow = styled(motion.div)<BgProps>`
  height: ${rem(92)};
  background: ${(props) => !props.bg && props.theme.pulsar.color.bg.hover};
  padding-top: ${({ theme }) => rem(theme.pulsar.size.street)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.house)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.house)};
  display: grid;
  grid-template-columns: 19% 5% 20.5% 20.5% 10% 22% 2%;
  cursor: pointer;

  @media (min-width: ${rem(media.lg)}) {
    grid-template-columns: 13.5% 4% 23.5% 16.5% 5% 19.5% 16% 2%;
  }
  @media (min-width: ${rem(media.xl)}) {
    grid-template-columns: 13.5% 4% 23.5% 15.5% 4.5% 21% 15.5% 2.5%;
  }
`;

export const Column = styled.div`
  height: ${({ theme }) => rem(theme.pulsar.size.state)};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const ColumnEllipsis = styled(Column)``;

export const ColumnAmount = styled(Column)`
  display: grid;
  grid-template-columns: ${({ theme }) => rem(theme.pulsar.size.state)} ${rem(150)};
  align-items: center;
`;

export const ColumnFee = styled.div`
  display: none;
  @media (min-width: ${rem(media.lg)}) {
    height: ${({ theme }) => rem(theme.pulsar.size.state)};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
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

export const Ellipsis = styled(Icon.Ellipsis)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.street)};
  cursor: pointer;
  transition: all 0.3s ease 0s;
  :hover {
    transition: all 0.3s ease 0s;
    transform: scale(1.15);
  }
`;

export const SwapHorizontal = styled(Icon.SwapHorizontal)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.street)};
  color: ${({ theme }) => theme.pulsar.color.text.masked};
`;

export const AddressP = styled.p`
  color: #3799da;
  font-weight: bold;
  max-width: ${rem(92)};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
  @media (min-width: ${rem(media.lg)}) {
    max-width: ${rem(190)};
  }
  @media (min-width: ${rem(media.xl)}) {
    max-width: ${rem(230)};
  }
`;

export const AmountSpan = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
`;

export const StatusText = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
`;

export const Coin = styled(CoinIcon)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.town)};
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
