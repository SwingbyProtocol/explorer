import { AppLogo, Dropdown, Icon, Text } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../modules/styles';

const { media } = StylingConstants;

interface MenuProps {
  isActive: boolean;
}

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: ${({ theme }) => rem(theme.pulsar.size.room)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.room)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.house)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.house)};
  border-bottom: 1px solid ${({ theme }) => theme.pulsar.color.border.normal};
  width: 100%;
  position: fixed;
  z-index: 20;
  background-color: ${({ theme }) => theme.pulsar.color.bg.normal};
  @media (min-width: ${rem(media.sm)}) {
    padding-right: ${({ theme }) => rem(theme.pulsar.size.town)};
    padding-left: ${({ theme }) => rem(theme.pulsar.size.town)};
  }
`;

export const Atag = styled.a`
  text-decoration: none;
  color: inherit;
`;

export const Logo = styled(AppLogo)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.street)};
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
`;

export const Menu = styled.div`
  display: none;
  @media (min-width: ${rem(media.sm)}) {
    width: ${rem(206)};
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: ${({ theme }) => rem(theme.pulsar.size.room)};
  }
  @media (min-width: ${rem(media.md)}) {
    width: ${rem(220)};
    margin-right: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
`;

export const ThemeToggle = styled.div`
  margin-top: ${({ theme }) => rem(theme.pulsar.size.box)};
  margin-right: ${({ theme }) => rem(theme.pulsar.size.house)};
  @media (min-width: ${rem(media.sm)}) {
    margin-right: ${({ theme }) => rem(theme.pulsar.size.room)};
  }
  @media (min-width: ${rem(media.md)}) {
    margin-right: ${({ theme }) => rem(theme.pulsar.size.city)};
  }
`;

export const MenuSpan = styled(Text)<MenuProps>`
  cursor: pointer;
  color: ${(props) => props.isActive && props.theme.pulsar.color.primary.normal};
  font-weight: 500;
`;

export const LinkA = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.pulsar.color.primary.normal}; ;
`;

export const LanguageDropDown = styled(Dropdown)`
  display: none;
  @media (min-width: ${rem(media.sm)}) {
    display: block;
    max-width: ${rem(120)};
  }
`;

export const MobileMenu = styled(Dropdown)`
  @media (min-width: ${rem(media.sm)}) {
    display: none;
  }
`;

export const RoutineTitle = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
  text-align: center;
  padding-top: ${({ theme }) => rem(theme.pulsar.size.closet)};
`;

export const LanguageTitle = styled(Dropdown.DefaultTarget)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
  background-color: transparent;
`;

export const LanguageDropTarget = styled(Dropdown.DefaultTarget)`
  padding-left: ${({ theme }) => rem(theme.pulsar.size.house)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.closet)};
`;

export const Hamburger = styled(Icon.Hamburger)`
  font-weight: bold;
  font-size: ${({ theme }) => rem(theme.pulsar.size.box * 5)};
`;

export const DropDownItemMobile = styled(Dropdown.Item)<MenuProps>`
  cursor: pointer;
  color: ${(props) => props.isActive && props.theme.pulsar.color.primary.normal};
`;

export const ColumnPool = styled.div`
  display: flex;
`;

export const IconLive = styled.div`
  font-size: ${({ theme }) => rem(theme.pulsar.size.box)};
  width: 1em;
  height: 1em;
  margin-left: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  border-radius: 50%;
  background: ${({ theme }) => theme.pulsar.color.primary.normal};
`;

export const TextLang = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.closet)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.box)};
`;

export const TextLink = styled(Text)`
  text-decoration: none;
  color: ${({ theme }) => theme.pulsar.color.text.normal};
`;
