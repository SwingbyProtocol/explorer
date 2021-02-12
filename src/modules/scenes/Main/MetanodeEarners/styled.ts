import { Text, AbstractAvatar } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled, { createGlobalStyle as css } from 'styled-components';

import { StylingConstants } from './../../../styles';

const { media } = StylingConstants;

export const GlobalStyles = css`
  body {
    width: 100vw;
    min-height: 100vh;
  }
`;

export const Table = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: min-content auto;
  grid-template-rows: 1fr repeat(5, min-content min-content min-content 1fr);
  padding: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  align-items: center;
  justify-items: left;

  @media (min-width: ${rem(media.md)}) {
    grid-template-columns: min-content auto auto auto auto;
    grid-template-rows: repeat(6, 1fr 1px);
    justify-items: center;
    grid-gap: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  }
`;

export const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-row: span 3;
  margin-right: ${({ theme }) => rem(theme.pulsar.size.drawer)};

  @media (min-width: ${rem(media.md)}) {
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

export const Space = styled.div`
  grid-column: 1 / -1;
`;

export const Divider = styled.div`
  grid-column: 1 / -1;
  width: calc(100% + ${({ theme }) => rem(theme.pulsar.size.drawer * 2)});
  border-bottom: 1px solid ${(props) => props.theme.pulsar.color.border.normal};
  margin: ${({ theme }) => rem(theme.pulsar.size.drawer)}
    ${({ theme }) => rem(-theme.pulsar.size.drawer)};

  @media (min-width: ${rem(media.md)}) {
    margin-top: 0;
    margin-bottom: 0;
  }
`;

export const Cell = styled.div``;

export const TextValue = styled(Text)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
`;
