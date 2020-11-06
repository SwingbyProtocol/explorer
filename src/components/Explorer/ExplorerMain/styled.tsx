import styled from 'styled-components';
import { rem } from 'polished';
import { Icon, TextInput } from '@swingby-protocol/pulsar';

export const ExplorerMainContainer = styled.div`
  background: ${({ theme }) => theme.pulsar.color.bg.normal};
  height: ${rem(280)};
  padding-top: ${({ theme }) => rem(theme.pulsar.size.state)};
  padding-left: ${rem(140)};
  padding-right: ${rem(140)};
  display: grid;
  justify-content: center;
`;
export const HeadLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${({ theme }) => rem(theme.pulsar.size.country)};
  max-width: ${rem(1400)};
`;
export const TitleH1 = styled.h1`
  color: ${({ theme }) => theme.pulsar.color.primary.text};
  font-weight: 800;
  font-size: ${({ theme }) => rem(theme.pulsar.size.town)};
  margin: 0;
`;

export const SearchInput = styled(TextInput)`
  width: ${rem(400)};
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
  ::placeholder {
    opacity: 0.8;
  }
`;

export const SearchIcon = styled(Icon.Search)`
  color: ${({ theme }) => theme.pulsar.color.primary.normal};
  font-size: ${({ theme }) => rem(theme.pulsar.size.street)};
`;
