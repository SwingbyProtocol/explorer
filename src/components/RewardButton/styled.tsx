import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../modules/styles';

const { media } = StylingConstants;

export const RewardButtonContainer = styled.div`
  width: 100%;
  @media (min-width: ${rem(media.sm)}) {
    width: auto;
  }
`;
