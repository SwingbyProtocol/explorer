import styled from 'styled-components';
import { rem } from 'polished';
import { Icon, logos, TextInput } from '@swingby-protocol/pulsar';

import { StylingConstants } from '../../../styles';

const { media } = StylingConstants;
export const ExplorerMainContainer = styled.div`
  height: ${rem(250)};
  background: ${({ theme }) => theme.pulsar.color.bg.normal};
  background-image: url(${logos.StarsBg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  @media (min-width: ${rem(media.xs)}) {
    height: ${rem(240)};
    display: grid;
    width: 100%;
  }
  @media (min-width: ${rem(media.sm)}) {
    padding-top: ${({ theme }) => rem(theme.pulsar.size.street)};
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
  padding-left: ${({ theme }) => rem(theme.pulsar.size.closet)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.closet)};
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
