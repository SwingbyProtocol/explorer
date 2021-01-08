import { logos } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../styles';

const { media } = StylingConstants;
export const ExplorerMainContainer = styled.div`
  position: relative;
  height: ${rem(250)};
  background: ${({ theme }) => theme.pulsar.color.bg.normal};
  background-image: url(${logos.StarsBgAnimated});
  z-index: 0;
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
