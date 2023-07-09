import { CoinIcon, Dropdown, Text, TextInput } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

interface DropDownProps {
  isDarkMode: boolean;
}

export const WithdrawContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (min-width: ${rem(media.sm)}) {
    width: ${rem(445)};
  }
`;

export const Box = styled.div`
  width: 100%;
  border-radius: 0.75em;
  border: 1px solid ${({ theme }) => theme.pulsar.color.border.normal};
  margin-top: ${({ theme }) => rem(theme.pulsar.size.room)};
  background-color: ${({ theme }) => theme.pulsar.color.bg.normal};
  @media (min-width: ${rem(media.md)}) {
    margin-top: 0;
  }
`;

export const ColumnForm = styled.div`
  margin-top: ${({ theme }) => rem(theme.pulsar.size.town)};
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.town)};
  margin-left: ${({ theme }) => rem(theme.pulsar.size.closet)};
  margin-right: ${({ theme }) => rem(theme.pulsar.size.closet)};

  @media (min-width: ${rem(media.sm)}) {
    margin-left: ${({ theme }) => rem(theme.pulsar.size.street)};
    margin-right: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
`;

export const Top = styled.div`
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
  width: 100%;
`;

export const RowTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
`;

export const InputAmount = styled(TextInput)`
  align-self: flex-end;
  flex: 2;
`;

export const Bottom = styled.div`
  width: 100%;
`;

export const InputReceivingAddress = styled(TextInput)`
  width: 100%;
  label {
    color: ${({ theme }) => theme.pulsar.color.text.masked};
  }
`;

// Request: Please add border props into Pulsar
export const DropdownCurrency = styled(Dropdown)<DropDownProps>`
  border: ${(props) =>
    props.isDarkMode ? `2px solid #1c232f` : `2px solid ${props.theme.pulsar.color.border.normal}`};
  background: ${(props) => props.isDarkMode && `#1c232f`};
  border-radius: 0.25em;
  transition: all ${({ theme }) => theme.pulsar.duration.normal} ease-in-out;
  :focus-within {
    border: 2px solid ${({ theme }) => theme.pulsar.color.primary.active};
    transition: all ${({ theme }) => theme.pulsar.duration.normal} ease-in-out;
  }
`;

export const DefaultTarget = styled(Dropdown.DefaultTarget)`
  margin-top: ${({ theme }) => rem(theme.pulsar.size.box / 2)};
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.box / 2)};
`;

export const TextLabel = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
  font-weight: 500;
  white-space: nowrap;
`;

export const ColumnDropdown = styled.div`
  flex: 1;
  display: grid;
  grid-template-rows: ${({ theme }) => rem(theme.pulsar.size.town)} auto;
`;

export const Coin = styled(CoinIcon)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.street)};
`;

export const TargetCoin = styled(Coin)`
  margin-right: ${({ theme }) => rem(theme.pulsar.size.drawer)};
`;

export const CoinDropDown = styled(CoinIcon)`
  margin-bottom: ${({ theme }) => rem(-theme.pulsar.size.box / 2)};
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
  margin-right: ${({ theme }) => rem(theme.pulsar.size.box)};
`;

export const ButtonRow = styled.div`
  margin-top: ${({ theme }) => rem(theme.pulsar.size.town)};
`;

export const AmountValidation = styled.div`
  margin-top: ${({ theme }) => rem(theme.pulsar.size.box / 2)};
  display: grid;
  justify-content: end;
`;

export const AllButtonDiv = styled.div``;

export const TextAll = styled(Text)`
  cursor: pointer;
  color: ${({ theme }) => theme.pulsar.color.primary.active};
  text-decoration: underline;
`;

export const RowBottom = styled(RowTop)`
  margin-top: ${({ theme }) => rem(theme.pulsar.size.street)};
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
`;

export const TextDescription = styled(Text)`
  display: flex;
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
  font-weight: 500;
`;

export const TextFee = styled(TextDescription)`
  text-align: right;
`;

export const BackDropMobile = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background-color: ${({ theme }) =>
    theme.pulsar.id === 'PulsarLight' ? 'rgba(255,255,255,0.75)' : 'rgba(15,22,34,0.85)'};
  border-radius: ${({ theme }) => rem(theme.pulsar.size.closet)};
  @media (min-width: ${rem(media.md)}) {
    display: none;
  }
`;

export const LiquidityInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};

  @media (min-width: ${rem(media.sm)}) {
    width: ${rem(445)};
  }
`;

export const LiquidityInfo = styled.div`
  position: relative;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.pulsar.color.border.normal};
  border-radius: ${({ theme }) => rem(theme.pulsar.size.closet)};
  background-color: ${({ theme }) => theme.pulsar.color.bg.masked};
  padding: ${({ theme }) => rem(theme.pulsar.size.street)};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => rem(theme.pulsar.size.room)};
`;

export const CoinInfoContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: ${rem(media.sm - 1)}) {
    font-size ${({ theme }) => rem(theme.pulsar.size.room)};
  }
`;

export const CoinInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => rem(theme.pulsar.size.room)};
`;

export const CoinInfoIcon = styled(CoinIcon)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.city)};
`;

export const CoinName = styled(Text)`
  color: ${({ theme }) => theme.pulsar.color.text.masked};
  white-space: nowrap;
`;

export const LiquidityStatInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 5px;
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
  color: ${({ theme }) => theme.pulsar.color.text.masked};
`;

export const LiquidityHelpLink = styled.a`
  color: ${({ theme }) => theme.pulsar.color.text.normal};
  text-decoration: none;
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
  opacity: 0.8;
  transition: all 0.2s ease-in-out;
  text-decoration: underline;
  :hover {
    opacity: 1;
    transition: all 0.2s ease-in-out;
  }
`;
