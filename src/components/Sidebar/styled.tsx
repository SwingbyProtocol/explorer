import styled, { css } from 'styled-components';
import { rem, transitions } from 'polished';

import { StylingConstants } from '../../modules/styles';

const { media } = StylingConstants;

export const SidebarInput = styled.input<{ open: boolean }>`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  visibility: hidden;
  opacity: 0;
  z-index: 10;

  @media (max-width: ${rem(media.md - 1)}) {
    visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  }
`;

export const SidebarToggle = styled.label`
  position: absolute;
  top: 24px;
  right: -12px;
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.pulsar.color.border.normal};
  cursor: pointer;

  svg {
    width: 0.7em;
    height: 0.7em;
  }

  @media (max-width: ${rem(media.md - 1)}) {
    display: none;
  }
`;

export const SidebarToggleMobile = styled.label`
  position: absolute;
  top: 24px;
  left: 12px;
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  cursor: pointer;

  @media (min-width: ${rem(media.md)}) {
    display: none;
  }
`;

export const SidebarContainer = styled.aside<{ open: boolean }>`
  background-color: ${({ theme }) => theme.pulsar.color.bg.accent};
  width: ${({ open }) => (open ? '216px' : '72px')};
  border-right: 1px solid ${({ theme }) => theme.pulsar.color.border.normal};
  padding: ${({ theme }) => `${rem(theme.pulsar.size.street)} ${rem(theme.pulsar.size.closet)}`};
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  transition: all 0.2s linear;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 20;

  @media (max-width: ${rem(media.md - 1)}) {
    width: 275px;
    left: ${({ open }) => (open ? '0' : '-100%')};

    &:before {
      ${({ open }) =>
        open &&
        `
        content: '';
        position: fixed;
        inset: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        background-color: rgba(0,0,0,0.3);
        z-index: -1;
      `}
    }
  }
`;

export const SidebarActionContainer = styled.div`
  display: flex;
  flex-direction: row;

  > * + * {
    margin-left: ${({ theme }) => rem(theme.pulsar.size.closet)};
  }
`;

export const AppLogoLink = styled.a`
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: ${({ theme }) => rem(theme.pulsar.size.closet)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.closet)};

  > svg {
    height: 1.5em;
  }
`;

export const MenuContainer = styled.ol`
  flex: 1;
  width: 100%;
  padding: 0;
  list-style: none;
`;

export const MenuItemContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: ${({ theme }) => rem(theme.pulsar.size.house)} 0;
`;

const activeAnchor = css`
  color: ${({ theme }) => theme.pulsar.color.primary.normal};
`;

export const MenuItemAnchor = styled.a<{ isActive: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: ${({ theme }) => rem(-theme.pulsar.size.house)} 0;
  padding-top: ${({ theme }) => rem(theme.pulsar.size.house)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.closet)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.closet)};
  font-size: ${({ theme }) => rem(theme.pulsar.size.closet)};
  font-weight: 500;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${({ theme }) => transitions(['background'], theme.pulsar.duration.normal)};
  ${({ isActive }) => isActive && activeAnchor};

  :hover {
    background: ${({ theme }) => theme.pulsar.color.bg.hover};
  }

  :has(span) {
    > svg {
      margin-right: ${({ theme }) => rem(theme.pulsar.size.house)};
    }
  }

  > svg {
    font-size: 20px;
    flex-shrink: 0;
  }
`;
