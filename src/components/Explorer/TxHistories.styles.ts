import styled from 'styled-components';

export const TxHistoriesContainer = styled.div`
  .address-text {
    color: #3799da;
    font-weight: bold;
    max-width: 32rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .title-row {
    display: flex;
    justify-content: space-between;
  }
  .right {
    padding-right: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 4rem;
  }
  .tx-history-row {
    height: 9.2rem;
    background: rgba(43, 55, 74, 0.02);
    padding-top: 2rem;
    padding-bottom: 2rem;
    padding-right: 1.6rem;
    padding-left: 1.6rem;
    display: grid;
    grid-template-columns: 10% 4% 30% 18% 6% 18% auto 8% 4%;
    .column {
      height: 5rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
    }
    .top {
      margin-bottom: 0.4rem;
      height: 2rem;
    }
    .bottom {
    }
    .status {
      align-items: center;
      display: flex;
      width: 10rem;
      .circle {
        margin-top: -0.8rem;
        color: #a8b3c3;
        font-size: 0.8rem;
      }
      .status-text {
        font-size: 1.4rem;
        margin-left: 0.4rem;
        font-weight: bold;
      }
    }
    .column-amount {
      display: grid;
      grid-template-columns: 4.6rem 15rem;
      align-items: center;
      .amount-text {
        font-weight: bold;
        font-size: 1.8rem;
      }
    }
  }
`;
