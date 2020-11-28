import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

export const AddLiquidityContainer = styled.div`
  width: 100%;
  @media (min-width: ${rem(media.md)}) {
    height: ${({ theme }) => rem(732 - (theme.pulsar.size.city + theme.pulsar.size.street))};
  }
`;
