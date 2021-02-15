import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../modules/styles';

const { media } = StylingConstants;

export const RewardButtonContainer = styled.div`
  width: 100%;
  padding-left: ${({ theme }) => rem(theme.pulsar.size.closet)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.closet)};
  @media (min-width: ${rem(media.sm)}) {
    width: auto;
    padding-left: 0;
    padding-right: 0;
  }
`;
