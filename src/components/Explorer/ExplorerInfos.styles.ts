import styled from 'styled-components';
export const ExplorerInfosContainerContainer = styled.div`
  border-right: 0.1rem solid #cecddc;
  border-left: 0.1rem solid #cecddc;
  padding-right: 1rem;
  padding-left: 4rem;
  .infos-container {
    padding-top: 6rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2.4rem;
    /* padding-left: 6%; */
    /* padding-right: 6%; */
  }

  .info-container {
    min-width: 16rem;
    display: grid;
    grid-template-columns: 4.2rem auto;
    align-items: center;
    .icon-image {
      font-size: 2.4rem;
      opacity: 0.4;
    }
    .data {
      display: grid;
      grid-row-gap: 0.4rem;
      .row {
        display: grid;
        grid-template-columns: 5rem auto;
        white-space: nowrap;
        .value-text {
          font-size: 1.8rem;
          font-weight: bold;
        }
      }
      .row-validator {
        display: flex;
        .validator-link {
          font-size: 1.4rem;
          margin-left: 1.2rem;
          color: ${({ theme }) => theme.pulsar.color.primary.normal};
          border-bottom: 0.1rem solid #31d5b8;
          margin-bottom: -0.1rem;
          :hover {
            cursor: pointer;
          }
        }
      }
    }
  }
`;
