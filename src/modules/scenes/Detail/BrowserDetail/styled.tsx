import { Card } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../styles';

const { media } = StylingConstants;

export const BrowserDetailContainer = styled.div`
  display: grid;
  padding-top: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.room)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.closet)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.closet)};

  @media (min-width: ${rem(media.lg)}) {
    padding-top: 0;
  }
`;

export const BrowserDetailDiv = styled(Card)`
  padding-top: ${({ theme }) => rem(theme.pulsar.size.room)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.room)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.drawer)};
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

export const LoadContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: ${rem(686)};
`;
