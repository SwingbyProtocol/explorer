import styled from 'styled-components';
export const ExplorerInfosContainerContainer = styled.div`
  border-right: 0.1rem solid #cecddc;
  border-left: 0.1rem solid #cecddc;
  padding-right: 2rem;
  padding-left: 3rem;
  .infos-container {
    padding-top: 6rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2.4rem;
    /* ${customMedia.greaterThan('macBook13')`
      padding-left: 6%;
      padding-right: 6%;
    `} */
  }

  .info-container {
    min-width: 16rem;
    display: grid;
    grid-template-columns: 5rem auto;
    align-items: center;
    .icon-image {
      width: 3rem;
      opacity: 0.3;
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
          margin-left: 1.2rem;
          color: #31d5b8;
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
