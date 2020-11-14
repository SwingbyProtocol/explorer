import styled from 'styled-components';
import { rem } from 'polished';
import { Icon, TextInput } from '@swingby-protocol/pulsar';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;
export const ExplorerMainContainer = styled.div`
  background: ${({ theme }) => theme.pulsar.color.bg.normal};
  height: ${rem(250)};

  @media (min-width: ${rem(media.sm)}) {
    height: ${rem(280)};
    display: grid;
    padding-top: ${({ theme }) => rem(theme.pulsar.size.state)};
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
  }
`;

export const TitleH1 = styled.h1`
  display: none;
  @media (min-width: ${rem(media.sm)}) {
    display: block;
    color: ${({ theme }) => theme.pulsar.color.primary.text};
    font-weight: 800;
    font-size: ${({ theme }) => rem(theme.pulsar.size.town)};
    margin: 0;
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
    width: ${rem(400)};
  }
`;

export const SearchIcon = styled(Icon.Search)`
  color: ${({ theme }) => theme.pulsar.color.primary.normal};
  font-size: ${({ theme }) => rem(theme.pulsar.size.street)};
`;
