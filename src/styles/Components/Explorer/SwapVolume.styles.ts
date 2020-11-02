import styled from 'styled-components';

export const SwapVolumeContainer = styled.div`
  .wrapper-swap-volume {
    min-width: 16rem;
    padding-left: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .title {
    align-self: flex-start;
    margin-bottom: 1rem;
  }
  .chart {
    height: 14rem;
    .chartjs-render-monitor {
      height: 14.6rem !important;
      width: 33rem !important;
    }
  }
  /* .test {
    color: ${({ theme }) => theme.pulsar.color.text.masked};
  } */
`;
