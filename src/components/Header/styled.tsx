import styled from 'styled-components';
import { rem } from 'polished';
import { Text } from '@swingby-protocol/pulsar';

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
export const Left = styled.div`
  display: flex;
  align-items: center;
`;
export const Logo = styled.img`
  width: ${rem(220)};
  :hover {
    cursor: pointer;
  }
`;
export const Menu = styled.div`
  margin-left: ${({ theme }) => rem(theme.pulsar.size.country)};
  width: ${rem(200)};
  display: flex;
  justify-content: space-between;
`;
export const MenuSpan = styled(Text)`
  :hover {
    cursor: pointer;
  }
`;
