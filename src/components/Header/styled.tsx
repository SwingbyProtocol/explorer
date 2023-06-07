import styled from 'styled-components';
import { rem } from 'polished';
import { Button } from '@swingby-protocol/pulsar';

import { StylingConstants } from '../../modules/styles';

const { media } = StylingConstants;

export const HeaderContainer = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding: ${({ theme }) => rem(theme.pulsar.size.street)};
  background-color: var(--theme-card-color);
  box-shadow: var(--theme-card-shadow);
  border-bottom: 1px solid ${({ theme }) => theme.pulsar.color.border.normal};
  transition: all 0.2s linear;
  z-index: 20;

  @media (min-width: ${rem(media.md)}) {
    left: ${({ open }) => (open ? '216px' : '72px')};
  }
`;

export const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => rem(theme.pulsar.size.closet)};
`;

export const HeaderAction = styled.div``;

export const SidebarToggleMobile = styled.label`
  cursor: pointer;

  @media (min-width: ${rem(media.md)}) {
    display: none;
  }
`;

export const AppLogoLink = styled.a`
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;

  > svg {
    height: 1.5em;
  }
`;
export const ButtonConnect = styled(Button)`
  width: ${rem(176)};
  z-index: 10;
  background-color: var(--theme-blue-color);
  :hover {
    background-color: var(--theme-blue400-color);
  }
`;
