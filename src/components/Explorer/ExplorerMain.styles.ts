import styled from 'styled-components';

export const ExplorerMainContainer = styled.div`
  background: #2b374a;
  height: 28rem;
  padding-top: 5rem;
  padding-left: 14rem;
  padding-right: 14rem;
  display: grid;
  justify-content: center;
  .head-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 6rem;
    max-width: 140rem;
  }
  .left-head-line {
    .title-text {
      color: ${({ theme }) => theme.pulsar.color.primary.text};
      font-weight: 800;
      font-size: 3.2rem;
      margin: 0;
    }
  }
  .right-head-line {
    .search-input {
      input {
        height: 5.6rem;
        border-radius: 0.6rem;
        width: 40rem;
        font-size: 1.4rem;
        ::placeholder {
          opacity: 0.8;
        }
      }
      .search-icon {
        color: ${({ theme }) => theme.pulsar.color.primary.normal};
        font-size: 2rem;
      }
    }
  }
`;
