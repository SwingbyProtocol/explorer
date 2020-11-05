import styled from 'styled-components';
import { rem } from 'polished';

export const SwapVolumeContainer = styled.div`
  min-width: ${rem(160)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.closet)};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const TitleDiv = styled.div`
  align-self: flex-start;
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.closet)};
`;
