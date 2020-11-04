import styled from 'styled-components';
import { rem } from 'polished';

export const SwapVolumeContainer = styled.div`
  min-width: ${rem(160)};
  padding-left: ${rem(20)};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .title {
    align-self: flex-start;
    margin-bottom: ${rem(10)};
  }
  .chart {
    height: ${rem(140)};
    .chartjs-render-monitor {
      height: ${rem(146)} !important;
      width: ${rem(330)} !important;
    }
  }
`;
