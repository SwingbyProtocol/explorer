import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

export const MetanodeInfoContainer = styled.div``;

export const Top = styled.div`
  @media (min-width: ${rem(media.lg)}) {
    display: grid;
    grid-template-columns: ${rem(300)} auto;
  }
`;
export const Bottom = styled.div``;
export const Left = styled.div``;
export const Right = styled.div``;
