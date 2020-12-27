import { Icon, Text } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../modules/styles';

const { media } = StylingConstants;

export const FooterContainer = styled.div`
  height: 100%;
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.box * 7)};
`;
export const FooterBox = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  justify-items: center;
  margin-top: ${({ theme }) => rem(theme.pulsar.size.street)};
  @media (min-width: ${rem(media.sm)}) {
    grid-template-columns: auto;
    grid-template-columns: repeat(4, 1fr);
    justify-items: start;
    padding-top: ${({ theme }) => rem(theme.pulsar.size.box)};
  }
`;

export const TextTitle = styled(Text)`
  display: block;
  text-align: center;
  color: ${({ theme }) => theme.pulsar.color.text.accent};
  line-height: ${({ theme }) => rem(theme.pulsar.size.city)};
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
  @media (min-width: ${rem(media.sm)}) {
    text-align: left;
  }
`;

export const ColumnLink = styled.div`
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.drawer)};
`;

export const ColumnTerm = styled.div`
  margin-top: ${({ theme }) => rem(theme.pulsar.size.room)};
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.box)};
  @media (min-width: ${rem(media.sm)}) {
    margin-bottom: 0;
    padding-bottom: ${({ theme }) => rem(theme.pulsar.size.drawer)};
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
`;

export const UlLink = styled.ul`
  display: grid;
  padding-left: 0;
  margin: 0;
  list-style: none;
`;

export const LiLink = styled.li`
  justify-self: center;
  line-height: ${({ theme }) => rem(theme.pulsar.size.box * 7)};
  @media (min-width: ${rem(media.sm)}) {
    justify-self: start;
  }
`;

export const ALink = styled.a`
  color: ${({ theme }) => theme.pulsar.color.text.normal};
  text-decoration: none;
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
  opacity: 0.8;
  transition: all 0.2s ease-in-out;
  :hover {
    opacity: 1;
    transition: all 0.2s ease-in-out;
  }
`;

export const TextLink = styled(Text)`
  cursor: pointer;
  color: ${({ theme }) => theme.pulsar.color.text.normal};
  text-decoration: none;
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
  opacity: 0.8;
  transition: all 0.2s ease-in-out;
  :hover {
    opacity: 1;
    transition: all 0.2s ease-in-out;
  }
`;

export const ALinkIcon = styled.a`
  color: ${({ theme }) => theme.pulsar.color.text.normal};
  text-decoration: none;
  font-size: ${({ theme }) => rem(theme.pulsar.size.street)};
  opacity: 0.5;
`;

export const LogoBox = styled.div`
  display: grid;
  justify-content: end;
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};
  margin-top: ${({ theme }) => rem(theme.pulsar.size.house)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.closet)};
`;

export const MediaRow = styled.div`
  display: grid;
  grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.closet)};
  grid-template-columns: repeat(6, 1fr);
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.room)};
  @media (min-width: ${rem(media.sm)}) {
    padding-right: 0;
    align-self: center;
    margin-bottom: 0;
  }
`;

export const SwingbyLogo = styled(Icon.SwingbyWithName)`
  margin-top: ${({ theme }) => rem(theme.pulsar.size.room)};
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  text-align: center;
  justify-self: center;
  font-size: ${({ theme }) => rem(theme.pulsar.size.street)};
  color: ${({ theme }) => theme.pulsar.color.text.accent};
  @media (min-width: ${rem(media.sm)}) {
    margin-top: ${({ theme }) => rem(theme.pulsar.size.box)};
    margin-bottom: 0;
    justify-self: start;
    font-size: ${rem(28)};
  }
`;
