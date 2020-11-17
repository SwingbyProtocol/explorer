import styled from 'styled-components';
import { rem } from 'polished';
import { Icon, TextInput } from '@swingby-protocol/pulsar';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;
export const ExplorerMainContainer = styled.div`
  background: ${({ theme }) => theme.pulsar.color.bg.normal};
  height: ${rem(250)};

  @media (min-width: ${rem(media.xs)}) {
    height: ${rem(240)};
    display: grid;
    padding-top: ${({ theme }) => rem(theme.pulsar.size.street)};
    width: 100%;
  }
  @media (min-width: ${rem(media.sm)}) {
    padding-left: ${({ theme }) => rem(theme.pulsar.size.town)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.town)};
  }
  @media (min-width: ${rem(media.md)}) {
    padding-left: ${({ theme }) => rem(theme.pulsar.size.street)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
  @media (min-width: ${rem(media.lg)}) {
    height: ${rem(274)};
    padding-left: ${({ theme }) => rem(theme.pulsar.size.closet)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.closet)};
    padding-top: ${({ theme }) => rem(theme.pulsar.size.country)};
  }
  @media (min-width: ${rem(media.xl)}) {
    display: grid;
    justify-content: center;
    padding-left: ${rem(140)};
    padding-right: ${rem(140)};
    width: 100%;
  }
`;

export const HeadLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  @media (min-width: ${rem(media.sm)}) {
    height: ${({ theme }) => rem(theme.pulsar.size.country)};
    max-width: ${rem(1400)};
    justify-content: space-between;
    margin-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
  @media (min-width: ${rem(media.lg)}) {
    margin-bottom: ${({ theme }) => rem(theme.pulsar.size.country)};
  }
`;

export const TitleH1 = styled.h1`
  display: none;
  @media (min-width: ${rem(media.sm)}) {
    display: block;
    color: ${({ theme }) => theme.pulsar.color.primary.text};
    font-weight: 800;
    font-size: ${({ theme }) => rem(theme.pulsar.size.street)};
    margin: 0;
  }
  @media (min-width: ${rem(media.md)}) {
    font-size: ${({ theme }) => rem(theme.pulsar.size.town)};
  }
`;

export const SearchInput = styled(TextInput)`
  width: 100%;
  padding-top: ${({ theme }) => rem(theme.pulsar.size.street)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.house)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.house)};
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
  ::placeholder {
    opacity: 0.8;
  }
  @media (min-width: ${rem(media.sm)}) {
    width: ${rem(250)};
    font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
    padding-left: 0;
    padding-right: 0;
  }
  @media (min-width: ${rem(media.md)}) {
    width: ${rem(300)};
    font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
  }
  @media (min-width: ${rem(media.lg)}) {
    padding-top: ${({ theme }) => rem(theme.pulsar.size.room)};
    width: ${rem(350)};
  }
  @media (min-width: ${rem(media.xl)}) {
    width: ${rem(400)};
  }
`;

export const SearchIcon = styled(Icon.Search)`
  color: ${({ theme }) => theme.pulsar.color.primary.normal};
  font-size: ${({ theme }) => rem(theme.pulsar.size.street)};
`;
