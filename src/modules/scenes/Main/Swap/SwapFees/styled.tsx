import { CoinIcon, Icon, Text } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

export const SwapFeesContainer = styled.div`
  margin-top: ${({ theme }) => rem(-theme.pulsar.size.box)};
  padding-top: ${({ theme }) => rem(theme.pulsar.size.street)};
`;

export const TitleText = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
`;

export const Row = styled.div`
  background-color: ${({ theme }) => theme.pulsar.color.bg.hover};
  margin-top: ${({ theme }) => rem(theme.pulsar.size.box * 5)};
  padding: ${({ theme }) => rem(theme.pulsar.size.house)};
  padding-top: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
  @media (min-width: ${rem(media.xs)}) {
    padding: ${({ theme }) => rem(theme.pulsar.size.street)};
    padding-top: ${({ theme }) => rem(theme.pulsar.size.drawer)};
    padding-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
`;

export const Coin = styled(CoinIcon)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.town)};
  margin-right: ${({ theme }) => rem(theme.pulsar.size.closet)};
  filter: saturate(0);
`;

export const CoinContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FeeBox = styled.div`
  max-width: ${rem(150)};
  @media (min-width: ${rem(media.sm)}) {
    max-width: 100%;
  }
`;

export const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const IconInfo = styled(Icon.InfoCircle)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
  color: ${({ theme }) => theme.pulsar.color.text.masked};
  cursor: pointer;
`;

export const Center = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
