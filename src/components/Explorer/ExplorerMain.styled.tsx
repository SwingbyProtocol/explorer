import styled from 'styled-components';
import { rem } from 'polished';

export const ExplorerMainContainer = styled.div`
  /* Request: Add #2b374a into bg in pulsar */
  background: ${({ theme }) => theme.pulsar.color.text.accent};
  height: ${rem(280)};
  padding-top: ${rem(50)};
  padding-left: ${rem(140)};
  padding-right: ${rem(140)};
  display: grid;
  justify-content: center;
  .head-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: ${rem(60)};
    max-width: ${rem(1400)};
  }
  .left-head-line {
    .title-text {
      color: ${({ theme }) => theme.pulsar.color.primary.text};
      font-weight: 800;
      font-size: ${({ theme }) => rem(theme.pulsar.size.town)};
      margin: 0;
    }
  }
  .right-head-line {
    .search-input {
      input {
        width: ${rem(400)};
        font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
        ::placeholder {
          opacity: 0.8;
        }
      }
      .search-icon {
        color: ${({ theme }) => theme.pulsar.color.primary.normal};
        font-size: ${rem(20)};
      }
    }
  }
`;
