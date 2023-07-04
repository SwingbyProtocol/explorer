import { Card, Dropdown } from '@swingby-protocol/pulsar';
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
