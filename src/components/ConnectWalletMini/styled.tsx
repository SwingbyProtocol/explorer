import { rem } from 'polished';
import styled from 'styled-components';

import { NetworkTag } from '../NetworkTag';

export const WalletWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

export const StyledNetworkTag = styled(NetworkTag)`
  margin-right: ${({ theme }) => rem(theme.pulsar.size.closet)};
`;
