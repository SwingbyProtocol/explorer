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
  .left {
    .title-text {
      color: ${({ theme }) => theme.pulsar.color.primary.text};
      font-weight: 800;
      font-size: 3.2rem;
      margin-bottom: 0;
    }
  }
  .right {
    .search-input {
      input {
        border-radius: 0.6rem;
        height: 4.6rem;
        width: 40rem;
        ::placeholder {
          font-weight: 800;
        }
      }
      .icon {
        color: #31d5b8;
        font-size: 2rem;
      }
    }
  }
`;
