import { CoinIcon, Icon, Text, Modal, logos } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

export const RewardModal = styled(Modal)`
  max-width: ${rem(350)};
`;

export const ModalContent = styled(Modal.Content)`
  border-radius: ${({ theme }) => rem(theme.pulsar.size.closet)};
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 0;
  background: ${(props) =>
    props.theme.pulsar.id === 'PulsarLight'
      ? props.theme.pulsar.color.bg.normal
      : props.theme.pulsar.color.bg.hover};
`;

export const BgContainer = styled.div`
  background-image: url(${logos.StarsBgAnimated});
  background-size: 100%;
  background-repeat: repeat;
`;

export const SwapRewardsModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
`;

export const Bottom = styled.div`
  width: 100%;
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};
  background: ${({ theme }) => theme.pulsar.color.bg.masked};
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom-left-radius: ${({ theme }) => rem(theme.pulsar.size.closet)};
  border-bottom-right-radius: ${({ theme }) => rem(theme.pulsar.size.closet)};
`;

export const RowConnectWallet = styled.div`
  padding-right: ${({ theme }) => rem(theme.pulsar.size.house)};
`;

export const RowCoins = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.house)};
  margin-top: ${({ theme }) => rem(theme.pulsar.size.city)};
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
  align-items: center;
`;

export const IconCoin = styled(CoinIcon)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.city)};
`;

export const IconArrow = styled(Icon.ArrowRight)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.town)};
`;

export const RowFeatures = styled.div`
  display: flex;
  align-items: center;
`;

export const RowTitle = styled.div`
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.room)};
`;

export const IconTick = styled(Icon.TickCircle)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
  margin-right: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  color: ${({ theme }) => theme.pulsar.color.primary.normal};
`;

export const TextFeature = styled(Text)`
  font-weight: bold;
  font-size: ${({ theme }) => rem(theme.pulsar.size.closet)};
`;

export const RowAmounts = styled.div`
  margin-top: ${({ theme }) => rem(theme.pulsar.size.street)};
  width: 100%;
  display: grid;
  grid-row-gap: ${({ theme }) => rem(theme.pulsar.size.drawer)};
`;

export const RowAmount = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

export const RowClaim = styled.div`
  margin-top: ${({ theme }) => rem(theme.pulsar.size.street)};
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
  width: ${rem(160)};
`;
