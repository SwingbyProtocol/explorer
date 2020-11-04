import styled from 'styled-components';
import { rem } from 'polished';

export const HeaderContainer = styled.div`
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: ${({ theme }) => rem(theme.pulsar.size.street)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.town)};
    padding-left: ${({ theme }) => rem(theme.pulsar.size.town)};
    padding-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
    border-bottom: 1px solid ${({ theme }) => theme.pulsar.color.border.normal};
  }
  .left {
    display: flex;
    align-items: center;
    .logo {
      width: ${rem(220)};
      :hover {
        cursor: pointer;
      }
    }
    .menu {
      margin-left: ${({ theme }) => rem(theme.pulsar.size.country)};
      width: ${rem(200)};
      display: flex;
      justify-content: space-between;
      span {
        font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
        :hover {
          cursor: pointer;
        }
      }
    }
  }
`;
