import styled from 'styled-components';
import { rem } from 'polished';
import { Card } from '@swingby-protocol/pulsar';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

export const BrowserContainer = styled.div`
  display: grid;
  padding-top: ${({ theme }) => rem(theme.pulsar.size.room)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.room)};
  padding-left: ${({ theme }) => rem(theme.pulsar.size.house)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.house)};
  @media (min-width: ${rem(media.sm)}) {
    justify-content: center;
    padding-left: 0;
    padding-right: 0;
  }
`;

export const BrowserDiv = styled(Card)`
  @media (min-width: ${rem(media.sm)}) {
    max-width: ${rem(1400)};
    min-width: ${rem(1220)};
    margin-top: ${({ theme }) => rem(theme.pulsar.size.state)};
    margin-bottom: ${({ theme }) => rem(theme.pulsar.size.state)};
    padding-top: ${({ theme }) => rem(theme.pulsar.size.city)};
    padding-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};
    padding-left: ${({ theme }) => rem(theme.pulsar.size.city)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
`;

export const Top = styled.div`
  @media (min-width: ${rem(media.sm)}) {
    height: ${rem(200)};
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: space-between;
    align-items: start;
    margin-bottom: ${({ theme }) => rem(theme.pulsar.size.city)};
  }
`;

export const Bottom = styled.div``;
