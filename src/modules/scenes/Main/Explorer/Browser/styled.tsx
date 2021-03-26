import styled from 'styled-components';
import { rem } from 'polished';
import { Card, Icon } from '@swingby-protocol/pulsar';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

export const BrowserContainer = styled.div`
  display: grid;
  padding-top: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.room)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.closet)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.closet)};
  @media (min-width: ${rem(media.sm)}) {
    padding-top: 0;
    padding-left: 0;
    padding-right: 0;
  }
  @media (min-width: ${rem(media.lg)}) {
    padding-bottom: ${({ theme }) => rem(theme.pulsar.size.state)};
  }
  @media (min-width: ${rem(media.xl)}) {
    justify-self: center;
  }
`;

export const BrowserDiv = styled(Card)`
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  @media (min-width: ${rem(media.lg)}) {
    padding-top: ${({ theme }) => rem(theme.pulsar.size.town)};
    padding-left: ${({ theme }) => rem(theme.pulsar.size.box)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.box)};
    padding-bottom: ${({ theme }) => rem(theme.pulsar.size.closet)};
  }
  @media (min-width: ${rem(media.xl)}) {
    width: ${rem(1188)};
    padding-left: ${({ theme }) => rem(theme.pulsar.size.town)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.town)};
    padding-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};
  }
`;

export const Top = styled.div`
  @media (min-width: ${rem(media.md)}) {
    display: grid;
    margin-bottom: 0;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      'network network infos infos'
      'volume volume volume volume';
  }
  @media (min-width: ${rem(media.lg)}) {
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
  }
  @media (min-width: ${rem(media.lg)}) {
    margin-top: ${({ theme }) => rem(theme.pulsar.size.town)};
  }
  @media (min-width: ${rem(media.xl)}) {
    margin-top: ${({ theme }) => rem(theme.pulsar.size.state)};
  }
`;

export const Filter = styled(Icon.Filter)`
  color: ${({ theme }) => theme.pulsar.color.text.masked};
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
`;

export const NoResultsFound = styled.div`
  display: grid;
  grid-row-gap: ${({ theme }) => rem(theme.pulsar.size.house)};
  margin-top: ${rem(50)};
  margin-bottom: ${rem(50)};
  text-align: center;
  @media (min-width: ${rem(media.md)}) {
    margin-top: ${rem(150)};
    margin-bottom: 0;
  }
`;
