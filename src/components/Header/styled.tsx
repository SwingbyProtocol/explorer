import { AppLogo, Text } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: ${({ theme }) => rem(theme.pulsar.size.street)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.town)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.town)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
  border-bottom: 1px solid ${({ theme }) => theme.pulsar.color.border.normal};
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
  margin-left: ${({ theme }) => rem(theme.pulsar.size.country)};
  width: ${rem(200)};
  display: flex;
  justify-content: space-between;
`;

export const MenuSpan = styled(Text)`
  cursor: pointer;
`;

export const LinkA = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.pulsar.color.primary.normal}; ;
`;
