import { Icon, TextInput } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../modules/styles';

const { media } = StylingConstants;

export const SearchInput = styled(TextInput)`
  width: 100%;
  padding-top: ${({ theme }) => rem(theme.pulsar.size.street)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.closet)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.closet)};
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
  @media (min-width: ${rem(media.sm)}) {
    width: ${rem(250)};
    font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
    padding-left: 0;
    padding-right: 0;
    /* Memo: To fix the prefix margin/padding by Pulsar */
    margin-top: ${({ theme }) => rem(-10)};
  }
  @media (min-width: ${rem(media.md)}) {
    width: ${rem(300)};
    font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
  }
  @media (min-width: ${rem(media.lg)}) {
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
