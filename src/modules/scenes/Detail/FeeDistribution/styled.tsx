import { CoinIcon, Icon, Text } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../styles';

const { media } = StylingConstants;

export const FeeDistributionContainer = styled.div`
  margin-top: ${({ theme }) => rem(-theme.pulsar.size.box)};
  padding-top: ${({ theme }) => rem(theme.pulsar.size.street)};
`;
export const TitleText = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
`;

export const RewardsContainer = styled.div`
  margin-top: ${({ theme }) => rem(theme.pulsar.size.box * 5)};
  background-color: ${({ theme }) => theme.pulsar.color.bg.hover};
`;

export const Row = styled.div`
  padding: ${({ theme }) => rem(theme.pulsar.size.house)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.pulsar.color.border.normal};
  ${({ theme }) => theme.pulsar.color.bg.hover};
  @media (min-width: ${rem(media.xs)}) {
    padding: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
  @media (min-width: ${rem(media.lg)}) {
    justify-content: flex-start;
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
  @media (min-width: ${rem(media.lg)}) {
    justify-content: flex-start;
    width: ${rem(200)};
  }
`;

export const IconRightArrow = styled(Icon.CaretRight)`
  display: none;
  @media (min-width: ${rem(media.lg)}) {
    display: block;
    color: ${({ theme }) => theme.pulsar.color.text.masked};
    font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
    margin-top: ${({ theme }) => rem(theme.pulsar.size.box / 2)};
    justify-self: start;
    margin-right: ${({ theme }) => rem(theme.pulsar.size.country)};
  }
`;

export const AddressP = styled.p`
  color: #3799da;
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
  margin: 0;
  max-width: ${rem(142)};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media (min-width: ${rem(media.lg)}) {
    max-width: 100%;
  }
`;

export const SeeMoreRow = styled.div`
  padding: ${({ theme }) => rem(theme.pulsar.size.closet)};
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const SeeMore = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${rem(100)};
  cursor: pointer;
`;

export const IconLinkArrow = styled(Icon.CaretRight)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  margin-top: ${({ theme }) => rem(theme.pulsar.size.box / 2)};
  color: ${({ theme }) => theme.pulsar.color.primary.normal};
`;
