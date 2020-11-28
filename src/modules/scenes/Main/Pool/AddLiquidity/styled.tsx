import { Dropdown, TextInput, Text, CoinIcon } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

export const AddLiquidityContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: ${rem(media.md)}) {
    height: ${({ theme }) => rem(300)};
  }
`;

export const ColumnForm = styled.div`
  width: 100%;
  @media (min-width: ${rem(media.sm)}) {
    width: ${rem(460)};
  }
`;

export const Top = styled.div`
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
  width: 100%;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const InputAmount = styled(TextInput)`
  padding-left: ${({ theme }) => rem(theme.pulsar.size.street)};
  align-self: flex-end;
  @media (min-width: ${rem(media.sm)}) {
    width: ${({ theme }) => rem(360)};
    padding-left: ${({ theme }) => rem(theme.pulsar.size.town)};
  }
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
export const DropdownCurrency = styled(Dropdown)`
  border: 2px solid ${({ theme }) => theme.pulsar.color.border.normal};
  border-radius: 0.25em;
`;

export const DefaultTarget = styled(Dropdown.DefaultTarget)`
  padding-left: ${({ theme }) => rem(theme.pulsar.size.room)};
  margin-top: ${({ theme }) => rem(theme.pulsar.size.box / 2)};
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.box / 2)};
`;

export const TextLabel = styled(Text)`
  padding-left: ${({ theme }) => rem(theme.pulsar.size.box)};
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
  font-weight: 500;
`;

export const ColumnDropdown = styled.div`
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
