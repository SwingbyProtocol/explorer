import styled from 'styled-components';

export const NetworkBridgesContainer = styled.div`
  .coin-container {
    margin-top: 4rem;
    padding-right: 4rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2.4rem;
    /* padding-left: 6%;
    padding-right: 6%; */
  }

  .coin-info {
    min-width: 16rem;
    display: grid;
    grid-template-columns: 5rem auto;
    align-items: center;
    .coin-image {
      width: 4rem;
    }
    .data {
      display: grid;
      grid-row-gap: 0.4rem;
      .row {
        display: grid;
        grid-template-columns: 5rem auto;
      }
    }
  }
  .amount-text {
    font-size: 1.4rem;
  }
`;
