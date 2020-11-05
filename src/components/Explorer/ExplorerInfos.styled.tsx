import styled from 'styled-components';
import { rem } from 'polished';

export const ExplorerInfosContainerContainer = styled.div`
  border-right: 1px solid #cecddc;
  border-left: 1px solid #cecddc;
  padding-right: ${rem(10)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.city)};
  .infos-container {
    padding-top: ${rem(60)};
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: ${({ theme }) => rem(theme.pulsar.size.street)};
  }

  .info-container {
    min-width: ${({ theme }) => rem(theme.pulsar.size.house)};
    display: grid;
    grid-template-columns: ${rem(42)} auto;
    align-items: center;
    .icon-image {
      font-size: ${({ theme }) => rem(theme.pulsar.size.street)};
      color: ${({ theme }) => theme.pulsar.color.text.masked};
    }
    .data {
      display: grid;
      grid-row-gap: ${({ theme }) => rem(theme.pulsar.size.box)};
      .row {
        display: grid;
        grid-template-columns: ${rem(50)} auto;
        white-space: nowrap;
        .value-text {
          font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
          font-weight: bold;
        }
      }
      .row-validator {
        display: flex;
        .validator-link {
          font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
          margin-left: ${({ theme }) => rem(theme.pulsar.size.closet)};
          color: ${({ theme }) => theme.pulsar.color.primary.normal};
          border-bottom: 1px solid ${({ theme }) => theme.pulsar.color.primary.normal};
          margin-bottom: ${-rem(10)};
          :hover {
            cursor: pointer;
          }
        }
      }
    }
  }
`;
