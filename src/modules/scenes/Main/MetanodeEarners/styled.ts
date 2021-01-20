import { Text, AbstractAvatar } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from './../../../styles';

const { media } = StylingConstants;

interface RowProps {
  isLastItem: boolean;
}

export const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: ${rem(730)};
  padding: ${({ theme }) => rem(theme.pulsar.size.house)};
`;

export const MetanodeEarnersContainer = styled.div`
  min-width: ${rem(328)};
  width: 100%;
  height: 100%;
  @media (min-width: ${rem(media.sm)}) {
    min-width: ${rem(350)};
  }
`;

export const AvatarContainer = styled.div`
  height: ${({ theme }) => rem(theme.pulsar.size.town)};
  display: flex;
  justify-content: center;
  align-items: center;
  grid-row: span 3;
  margin-right: ${({ theme }) => rem(theme.pulsar.size.house)};

  @media (min-width: ${rem(media.md)}) {
    font-size: ${({ theme }) => rem(theme.pulsar.size.state)};
    grid-row: auto;
    margin-right: 0;
  }
`;

export const Rank = styled.div<{ rank: number }>`
  height: ${({ theme }) => rem(theme.pulsar.size.town)};
  width: ${({ theme }) => rem(theme.pulsar.size.town)};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  z-index: 10;
  color: ${({ theme }) => theme.pulsar.color.bg.normal};
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
  background: ${({ rank, theme }) =>
    rank === 1
      ? '#ffcf47'
      : rank === 2
      ? '#90b7cc'
      : rank === 3
      ? '#9a674e'
      : theme.pulsar.color.primary.normal};
`;

export const Avatar = styled(AbstractAvatar)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.town)};
  margin-left: ${({ theme }) => rem(-theme.pulsar.size.room)};

  @media (min-width: ${rem(media.md)}) {
    font-size: ${({ theme }) => rem(theme.pulsar.size.state)};
  }
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
  @media (min-width: ${rem(media.md)}) {
    grid-template-columns: min-content auto;
  }
`;

export const RowLeft = styled.div`
  @media (min-width: ${rem(media.md)}) {
    margin-right: ${({ theme }) => rem(theme.pulsar.size.town)};
  }
`;

export const ColumnPlaceholder = styled.div`
  @media (min-width: ${rem(media.md)}) {
    width: ${rem(72)};
  }
`;

export const RowRight = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-row-gap: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  @media (min-width: ${rem(media.md)}) {
    grid-template-rows: 1fr;
    grid-template-columns: 40% 20% 20% auto;
  }
`;
export const RowRightLabel = styled.div`
  display: grid;
  grid-template-columns: 40.5% 16% 20% auto;
`;

export const TextValue = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
`;
