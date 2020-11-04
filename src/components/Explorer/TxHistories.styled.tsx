import styled from 'styled-components';
import { rem } from 'polished';

export const TxHistoriesContainer = styled.div`
  .title-row {
    display: flex;
    justify-content: space-between;
  }
  .right {
    padding-right: ${rem(20)};
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.city)};
    .filter {
      color: ${({ theme }) => theme.pulsar.color.text.masked};
      font-size: ${rem(18)};
    }
  }
  .tx-history-row {
    height: ${rem(92)};
    background: rgba(43, 55, 74, 0.02);
    padding-top: ${rem(20)};
    padding-bottom: ${rem(20)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.house)};
    padding-left: ${({ theme }) => rem(theme.pulsar.size.house)};
    display: grid;
    grid-template-columns: 10% 4% 30% 18% 6% 18% auto 8% 4%;
    .column {
      height: ${rem(50)};
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
    }
    .top {
      margin-bottom: ${({ theme }) => theme.pulsar.size.box};
      height: ${rem(20)};
    }
    .bottom {
    }
    .status {
      align-items: center;
      display: flex;
      width: ${rem(100)};
      .circle {
        margin-top: ${-rem(8)};
        color: #a8b3c3;
        font-size: ${({ theme }) => rem(theme.pulsar.size.drawer)};
      }
    }
    .column-amount {
      display: grid;
      grid-template-columns: ${rem(46)} ${rem(150)};
      align-items: center;
    }
  }
  .ellipsis-icon {
    font-size: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
  .swap-icon {
    font-size: ${({ theme }) => rem(theme.pulsar.size.street)};
    color: ${({ theme }) => theme.pulsar.color.text.masked};
  }
  .address-text {
    color: #3799da;
    font-weight: bold;
    max-width: ${rem(320)};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
  }
  .amount-text {
    font-weight: bold;
    font-size: ${rem(18)};
  }
  .status-text {
    font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
    margin-left: ${({ theme }) => theme.pulsar.size.box};
    font-weight: bold;
  }
  .time-past-text {
    color: ${({ theme }) => theme.pulsar.color.text.masked};
    font-size: ${({ theme }) => rem(theme.pulsar.size.closet)};
  }
`;
