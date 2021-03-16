import { CoinIcon, Icon, SwapStatusIcon, Text } from '@swingby-protocol/pulsar';
import { motion } from 'framer-motion';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../../styles';
import { AddressLinkP } from '../../../../Common';

interface BgProps {
  bg: boolean;
  borderColor: string;
}

const { media } = StylingConstants;

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
    grid-template-columns: 13.5% 4% 24% 15% 5% 20.5% 15.5% 2.5%;
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
  width: ${rem(120)};
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
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
  color: ${({ theme }) => theme.pulsar.color.text.masked};
`;

export const AddressP = styled(AddressLinkP)`
  max-width: ${rem(92)};
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
  /* white-space: nowrap; */
`;

export const Coin = styled(CoinIcon)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.town)};
`;

export const StatusCircle = styled(SwapStatusIcon)`
  width: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  height: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  margin-right: ${({ theme }) => rem(theme.pulsar.size.box)};
`;
