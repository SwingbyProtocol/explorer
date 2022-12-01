import { CoinIcon, Icon, Text } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../styles';
import { ButtonScale } from '../../../Common';

const { media } = StylingConstants;

interface isMultiButtonProps {
  isMultiButton: boolean;
}

export const FarmCardContainer = styled.div`
  background-color: ${({ theme }) => theme.pulsar.color.bg.hover};
  padding: ${({ theme }) => rem(theme.pulsar.size.house)};
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
  display: flex;
  flex-direction: column;
  @media (min-width: ${rem(media.xs)}) {
    padding: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
  @media (min-width: ${rem(media.md)}) {
    width: ${rem(400)};
  }
  @media (min-width: ${rem((media.md + media.lg) / 2)}) {
    width: ${rem(400 * 1.3)};
  }
  @media (min-width: ${rem(media.lg)}) {
    margin-bottom: 0;
    width: ${rem(280)};
    height: ${rem(286)};
    padding-top: ${({ theme }) => rem(theme.pulsar.size.street)};
    padding-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};
    padding-left: ${({ theme }) => rem(theme.pulsar.size.street)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
  @media (min-width: ${rem(media.xl)}) {
    width: ${rem(280)};
  }
`;

export const Box = styled.div`
  align-self: center;
  width: ${rem(280)};
  @media (min-width: ${rem(media.lg)}) {
    width: 100%;
  }
`;

export const Coin = styled(CoinIcon)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.state)};
  align-self: center;
`;

export const RowTitle = styled.div`
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.drawer)};
`;

export const AprBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TextTitle = styled(Text)`
  font-weight: bold;
  font-size: ${({ theme }) => rem(theme.pulsar.size.closet)};
`;

export const TextTvl = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
`;

export const FeaturesBox = styled.div`
  margin-top: ${({ theme }) => rem(theme.pulsar.size.street)};
  padding-top: ${({ theme }) => rem(theme.pulsar.size.house)};
  border-top: 1px solid ${({ theme }) => theme.pulsar.color.text.placeholder};
`;

export const RowFeatures = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${({ theme }) => rem(theme.pulsar.size.box)};
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => rem(theme.pulsar.size.box * 5)};
`;

//  Todo: remove condition once published sbBTC pool on BSC
export const ButtonLink = styled(ButtonScale)<isMultiButtonProps>`
  /* width: rem(108); */
  width: ${(props) => (props.isMultiButton ? rem(108) : '100%')};
  margin-top: ${(props) => !props.isMultiButton && rem(14)};
`;

export const IconTick = styled(Icon.TickCircle)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
  margin-right: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  color: ${({ theme }) => theme.pulsar.color.primary.normal};
`;
