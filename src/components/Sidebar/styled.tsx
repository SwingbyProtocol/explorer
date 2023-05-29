import styled from 'styled-components';
import { rem } from 'polished';

export const SidebarInput = styled.input`
  position: fixed;
  visibility: hidden;
  opacity: 0;
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
