import { Card, Icon } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../styles';

const { media } = StylingConstants;

// Memo: make browser width size same as explorer page
const browserDetailWidthXl = 806;

export const BrowserDetailContainer = styled.div`
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
    grid-template-columns: auto auto;
    justify-content: center;
    grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.town)};
  }
  @media (min-width: ${rem(media.xl)}) {
    grid-template-columns: auto ${rem(browserDetailWidthXl)};
  }
`;

export const BrowserDetailDiv = styled(Card)`
  padding-top: ${({ theme }) => rem(theme.pulsar.size.street)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  @media (min-width: ${rem(media.xs)}) {
    padding-left: ${({ theme }) => rem(theme.pulsar.size.street)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
  @media (min-width: ${rem(media.lg)}) {
    margin-bottom: ${({ theme }) => rem(theme.pulsar.size.state)};
    padding-top: ${({ theme }) => rem(theme.pulsar.size.town)};
    padding-left: ${({ theme }) => rem(theme.pulsar.size.town)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.town)};
    padding-bottom: ${({ theme }) => rem(theme.pulsar.size.town)};
  }
  @media (min-width: ${rem(media.xl)}) {
    padding-left: ${({ theme }) => rem(theme.pulsar.size.box * 10)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.box * 10)};
    width: ${rem(browserDetailWidthXl)};
  }
`;

export const IconSwap = styled(Icon.SwapHorizontal)`
  display: none;
  @media (min-width: ${rem(media.lg)}) {
    display: block;
    font-size: ${({ theme }) => rem(theme.pulsar.size.street)};
    color: ${({ theme }) => theme.pulsar.color.text.masked};
    justify-self: center;
  }
`;

export const Row = styled.div`
  @media (min-width: ${rem(media.lg)}) {
    display: grid;
    grid-template-columns: auto ${rem(70)} auto;
    align-items: center;
  }
`;
