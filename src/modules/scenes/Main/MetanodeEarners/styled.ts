import { Text } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from './../../../styles';

const { media } = StylingConstants;

interface RowProps {
  isLastItem: boolean;
}

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
`;

export const MetanodeEarnersContainer = styled.div`
  min-width: ${rem(328)};
  width: 100%;
  height: 100%;
  @media (min-width: ${rem(media.sm)}) {
    min-width: ${rem(350)};
  }
  @media (min-width: ${rem(media.md)}) {
    display: none;
  }
`;

export const RankCircle = styled.div`
  height: ${({ theme }) => rem(theme.pulsar.size.town)};
  width: ${({ theme }) => rem(theme.pulsar.size.town)};
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.pulsar.color.primary.normal};
  border-radius: 50%;
  z-index: 10;
  /* Fixme: Please advise if better color variable can be chosen */
  color: ${({ theme }) => theme.pulsar.color.bg.normal};
`;

export const RankFirst = styled(RankCircle)`
  background: #ffcf47;
`;

export const RankSecond = styled(RankCircle)`
  background: #90b7cc;
`;

export const RankThird = styled(RankCircle)`
  background: #9a674e;
`;

export const Rank = styled.div`
  height: ${({ theme }) => rem(theme.pulsar.size.state)};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Avatar = styled.div`
  height: ${({ theme }) => rem(theme.pulsar.size.town)};
  width: ${({ theme }) => rem(theme.pulsar.size.town)};
  margin-left: ${({ theme }) => rem(-theme.pulsar.size.room)};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: red;
`;

export const Row = styled.div`
  padding-left: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.drawer)};
`;

export const RowUser = styled.div<RowProps>`
  display: grid;
  grid-template-columns: 30% auto;
  border-bottom: ${(props) =>
    props.isLastItem
      ? '0px solid transparent'
      : `1px solid ${props.theme.pulsar.color.border.normal}`};

  align-items: center;
  padding-top: ${({ theme }) => rem(theme.pulsar.size.house)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};
`;

export const RowLeft = styled.div``;

export const RowRight = styled.div``;

export const ColumnInfo = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-row-gap: ${({ theme }) => rem(theme.pulsar.size.drawer)};
`;

export const TextValue = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
`;
