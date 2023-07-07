import { Card, Dropdown, CoinIcon, Text } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

export const BrowserSwapContainer = styled.div`
  display: grid;
  padding-top: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.room)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.closet)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.closet)};
  @media (min-width: ${rem(media.sm)}) {
    padding-top: 0;
    padding-left: 0;
    padding-right: 0;
  }
  @media (min-width: ${rem(media.md)}) {
    padding-bottom: ${({ theme }) => rem(theme.pulsar.size.state)};
  }
`;

export const BrowserSwapDiv = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-color: ${({ theme }) => (theme.pulsar.id === 'PulsarLight' ? '#FFF' : '#2A3039')};

  @media (min-width: ${rem(media.sm)}) {
    padding-top: ${({ theme }) => rem(theme.pulsar.size.city)};
    padding-bottom: ${({ theme }) => rem(theme.pulsar.size.city)};
  }
  @media (min-width: ${rem(media.md)}) {
    min-height: ${rem(500)};
  }
  @media (min-width: ${rem(media.lg)}) {
    width: ${rem(980)};
    margin: 0 auto;
  }
  @media (min-width: ${rem(media.xl)}) {
    width: ${rem(1100)};
  }
`;

export const NetworkDropdownContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: -1rem;
  margin-bottom: 1rem;
  color: ${({ theme }) =>
    theme.pulsar.id === 'PulsarLight' ? '#FFF' : theme.pulsar.color.text.normal};
  @media (min-width: ${rem(media.lg)}) {
    width: ${rem(980)};
    margin-left: auto;
    margin-right: auto;
  }
  @media (min-width: ${rem(media.xl)}) {
    width: ${rem(1100)};
  }
`;

export const SwapBridgeDropdownTarget = styled(Dropdown.DefaultTarget)`
  margin-left: 1rem;
  background-color: transparent;
  color: ${({ theme }) => theme.pulsar.color.success.normal};
  font-weight: bold;
`;

export const SwapContainer = styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.pulsar.color.border.normal};
  border-radius: ${({ theme }) => rem(theme.pulsar.size.closet)};
  background-color: ${({ theme }) => theme.pulsar.color.bg.normal};
  overflow: hidden;
  padding-bottom: 65px;
  margin-bottom: -65px;

  @media (min-width: ${rem(media.sm)}) {
    width: ${rem(445)};
  }
`;

export const SwapExtendedFooter = styled.div`
  width: 100%;
  padding: ${({ theme }) => rem(theme.pulsar.size.street)};
  border-bottom-left-radius: ${({ theme }) => rem(theme.pulsar.size.closet)};
  border-bottom-right-radius: ${({ theme }) => rem(theme.pulsar.size.closet)};
  overflow: hidden;

  @media (min-width: ${rem(media.sm)}) {
    width: ${rem(445)};
  }
`;

export const ExplorerLinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
`;

export const ExplorerIconContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
  margin-left: ${({ theme }) => rem(theme.pulsar.size.closet)};
  color: ${({ theme }) => theme.pulsar.color.primary.normal};
`;

export const SwapLiquidityInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};

  @media (min-width: ${rem(media.sm)}) {
    width: ${rem(445)};
  }
`;

export const SwapLiquidityInfo = styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.pulsar.color.border.normal};
  border-radius: ${({ theme }) => rem(theme.pulsar.size.closet)};
  background-color: ${({ theme }) => theme.pulsar.color.bg.masked};
  padding: ${({ theme }) => rem(theme.pulsar.size.street)};
  overflow: hidden;
`;

export const SwapLiquidityInfoDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const SwapStatInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 5px;
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
  color: ${({ theme }) => theme.pulsar.color.text.masked};
`;

export const SwapStatValue = styled(Text)`
  color: ${({ theme }) => theme.pulsar.color.primary.normal};
  font-weight: bold;
`;

export const CoinContainer = styled.div`
  display: grid;
  grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.street)};
  grid-template-columns: 1fr 1fr;
  height: ${rem(60)};
  padding: 0 ${({ theme }) => rem(theme.pulsar.size.street)};
`;

export const CoinInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => rem(theme.pulsar.size.room)};
  @media (min-width: ${rem(media.xs)}) {
    width: ${rem(160)};
  }
  @media (min-width: ${rem(media.sm)}) {
    grid-template-columns: ${rem(46)} auto;
  }
`;

export const CoinName = styled(Text)`
  color: ${({ theme }) => theme.pulsar.color.text.masked};
`;

export const Coin = styled(CoinIcon)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.town)};
`;
