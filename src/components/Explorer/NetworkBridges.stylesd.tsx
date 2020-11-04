import styled from 'styled-components';
import { rem } from 'polished';

export const NetworkBridgesContainer = styled.div`
  .coin-container {
    margin-top: ${({ theme }) => rem(theme.pulsar.size.city)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.city)};
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: ${({ theme }) => rem(theme.pulsar.size.street)};
    /* padding-left: 6%;
    padding-right: 6%; */
  }

  .coin-info {
    min-width: ${rem(160)};
    display: grid;
    grid-template-columns: ${rem(50)} auto;
    align-items: center;
    .coin-image {
      width: ${({ theme }) => rem(theme.pulsar.size.city)};
    }
    .data {
      display: grid;
      grid-row-gap: ${({ theme }) => rem(theme.pulsar.size.box)};
      .row {
        display: grid;
        grid-template-columns: ${rem(50)} auto;
      }
    }
  }
  .amount-text {
    font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
  }
`;
