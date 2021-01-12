import { CoinIcon } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../modules/styles';

const { media } = StylingConstants;

export const AssetTitleContainer = styled.div`
  display: flex;
  align-items: center;
`;
export const Coin = styled(CoinIcon)`
  margin-right: ${({ theme }) => rem(theme.pulsar.size.house)};
  font-size: ${({ theme }) => rem(theme.pulsar.size.state)};
  @media (min-width: ${rem(media.lg)}) {
    font-size: ${rem(74)};
    margin-right: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
`;
