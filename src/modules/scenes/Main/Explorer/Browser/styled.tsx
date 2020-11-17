import styled from 'styled-components';
import { rem } from 'polished';
import { Card, Icon } from '@swingby-protocol/pulsar';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

export const BrowserContainer = styled.div`
  display: grid;
  padding-top: ${({ theme }) => rem(theme.pulsar.size.room)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.room)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.house)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.house)};
  @media (min-width: ${rem(media.xs)}) {
    padding-left: ${({ theme }) => rem(theme.pulsar.size.closet)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.closet)};
  }
  @media (min-width: ${rem(media.lg)}) {
    padding-top: 0;
  }
`;

export const BrowserDiv = styled(Card)`
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  @media (min-width: ${rem(media.lg)}) {
    margin-bottom: ${({ theme }) => rem(theme.pulsar.size.state)};
    padding-top: ${({ theme }) => rem(theme.pulsar.size.town)};
    padding-left: ${({ theme }) => rem(theme.pulsar.size.box)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.box)};
    padding-bottom: ${({ theme }) => rem(theme.pulsar.size.closet)};
  }
  @media (min-width: ${rem(media.xl)}) {
    max-width: ${rem(1188)};
    padding-left: ${({ theme }) => rem(theme.pulsar.size.town)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.town)};
    padding-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};
  }
`;

export const Top = styled.div`
  @media (min-width: ${rem(media.md)}) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      'network network infos infos'
      'auto volume volume volume';
  }
  @media (min-width: ${rem(media.lg)}) {
    margin-bottom: ${({ theme }) => rem(theme.pulsar.size.city)};
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    align-items: start;
  }
  padding-top: 0;
  @media (min-width: ${rem(media.xl)}) {
  }
`;

export const Bottom = styled.div`
  display: none;
  @media (min-width: ${rem(media.md)}) {
    display: block;
    margin-top: ${({ theme }) => rem(-theme.pulsar.size.street)};
  }
`;

export const Filter = styled(Icon.Filter)`
  color: ${({ theme }) => theme.pulsar.color.text.masked};
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
`;

export const LoadContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: ${rem(368)};
`;
