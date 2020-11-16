import { AppLogo, Dropdown, Icon, Text } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../modules/styles';

const { media } = StylingConstants;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: ${({ theme }) => rem(theme.pulsar.size.street)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.house)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.house)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
  border-bottom: 1px solid ${({ theme }) => theme.pulsar.color.border.normal};
  width: 100%;
  position: fixed;
  z-index: 10;
  background-color: ${({ theme }) => theme.pulsar.color.bg.normal};
  @media (min-width: ${rem(media.sm)}) {
    padding-right: ${({ theme }) => rem(theme.pulsar.size.town)};
    padding-left: ${({ theme }) => rem(theme.pulsar.size.town)};
  }
`;

export const Logo = styled(AppLogo)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.street)};
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
`;

export const Right = styled.div``;

export const Menu = styled.div`
  display: none;
  @media (min-width: ${rem(media.sm)}) {
    margin-left: ${({ theme }) => rem(theme.pulsar.size.town)};
    width: ${rem(180)};
    display: flex;
    justify-content: space-between;
  }
  @media (min-width: ${rem(media.md)}) {
    margin-left: ${({ theme }) => rem(theme.pulsar.size.country)};
    width: ${rem(200)};
  }
`;

export const MenuSpan = styled(Text)`
  cursor: pointer;
`;

export const LinkA = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.pulsar.color.primary.normal}; ;
`;

export const LanguageDropDown = styled(Dropdown)`
  display: none;
  @media (min-width: ${rem(media.sm)}) {
    display: block;
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
`;
export const Hamburger = styled(Icon.Hamburger)`
  font-weight: bold;
  font-size: ${({ theme }) => rem(theme.pulsar.size.box * 5)};
`;
