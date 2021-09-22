import { CoinIcon } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

export const SummaryContentContainer = styled.div`
  display: grid;
  height: ${rem(210)};
  grid-row-gap: ${({ theme }) => rem(theme.pulsar.size.town)};
  margin-top: ${({ theme }) => rem(theme.pulsar.size.street)};
  justify-content: center;
`;

export const Row = styled.div``;

export const RowFarm = styled.div`
  display: grid;
  align-items: end;
  grid-template-columns: auto auto;
`;

export const Left = styled.div`
  display: grid;
  position: relative;
`;

export const Right = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.drawer)};
`;

export const RowEarning = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  justify-content: space-between;
`;

export const CoinMini = styled(CoinIcon)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.street)};
`;

export const RowFarmName = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: ${({ theme }) => rem(theme.pulsar.size.town)} auto;
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.box)};
`;

export const RowFarmNameMulti = styled(RowFarmName)`
  grid-template-columns: auto auto;
  grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.drawer)};
`;

export const ColumMultiIcons = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.box)};
`;

export const UnitSwingby = styled.div`
  position: absolute;
  bottom: ${({ theme }) => rem(-theme.pulsar.size.box * 5)};
`;

export const TitleFarm = styled.div`
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.box)};
`;

export const ColumnFarm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ColumnMultiFarm = styled(ColumnFarm)`
  width: ${rem(124)};
`;

export const IconCoinLogo = styled.img`
  width: ${({ theme }) => rem(theme.pulsar.size.street)};
`;

export const IconCoinLogoMini = styled(IconCoinLogo)`
  width: ${({ theme }) => rem(theme.pulsar.size.street)};
`;

export const ColumnTotal = styled(RowFarm)`
  width: ${rem(130)};
  align-self: center;
  text-align: center;
`;
