import { Icon, Text } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../styles';

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
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  align-items: center;
  @media (min-width: ${rem(media.sm)}) {
    grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.town)};
  }
  @media (min-width: ${rem(media.xl)}) {
    padding-right: 0;
  }
`;

export const Buttons = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  @media (min-width: ${rem(media.xs)}) {
    padding-right: ${({ theme }) => rem(theme.pulsar.size.house)};
  }
  @media (min-width: ${rem(media.sm)}) {
    grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.house)};
  }
`;

export const Right = styled.div<BridgeProps>`
  padding-right: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  @media (min-width: ${rem(media.xs)}) {
    padding-right: ${({ theme }) => rem(theme.pulsar.size.house)};
  }
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

export const BrowserFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Filter = styled(Icon.Filter)`
  color: ${({ theme }) => theme.pulsar.color.text.masked};
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
`;

export const NoResultsFound = styled.div`
  display: grid;
  grid-row-gap: ${({ theme }) => rem(theme.pulsar.size.house)};
  margin-top: ${rem(50)};
  margin-bottom: ${rem(50)};
  text-align: center;
  @media (min-width: ${rem(media.md)}) {
    margin-top: ${rem(150)};
    margin-bottom: 0;
  }
`;
