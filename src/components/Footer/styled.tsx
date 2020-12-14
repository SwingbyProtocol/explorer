import { Icon } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../modules/styles';

const { media } = StylingConstants;

export const FooterContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  justify-items: center;
  margin-top: ${({ theme }) => rem(theme.pulsar.size.street)};
  @media (min-width: ${rem(media.md)}) {
    height: ${rem(190)};
    padding-top: ${({ theme }) => rem(theme.pulsar.size.box)};
    padding-bottom: ${({ theme }) => rem(theme.pulsar.size.box / 2)};
    padding-right: ${({ theme }) => rem(theme.pulsar.size.drawer)};
    padding-left: ${({ theme }) => rem(theme.pulsar.size.drawer)};
    justify-content: space-between;
    justify-items: start;
  }
  @media (min-width: ${rem(media.xl + 160)}) {
    padding-right: ${rem(80)};
    padding-left: ${rem(80)};
  }
`;

export const UlLink = styled.ul`
  display: grid;
  width: ${rem(334)};
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  padding-left: 0px;
  margin: 0px;
  list-style: none;
  @media (min-width: ${rem(media.md)}) {
    padding: 0;
    display: flex;
    justify-content: space-between;
    width: ${rem(550)};
  }
`;
export const LiLink = styled.li`
  justify-items: center;
  justify-self: center;
  line-height: ${({ theme }) => rem(theme.pulsar.size.town)};
`;

export const ALink = styled.a`
  color: ${({ theme }) => theme.pulsar.color.text.normal};
  text-decoration: none;
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
`;
export const ALinkIcon = styled(ALink)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.street)};
`;

export const LogoBox = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  @media (min-width: ${rem(media.md)}) {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
  }
`;
export const MediaRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, ${rem(32)});
  align-items: center;
  grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.town)};
  margin-top: ${({ theme }) => rem(theme.pulsar.size.house)};
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: ${({ theme }) => rem(theme.pulsar.size.town)};
  justify-items: center;
  justify-self: center;
  @media (min-width: ${rem(media.md)}) {
    align-self: center;
  }
`;

export const SwingbyLogo = styled(Icon.SwingbyWithName)`
  margin-top: ${({ theme }) => rem(theme.pulsar.size.room)};
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.room)};
  height: ${({ theme }) => rem(theme.pulsar.size.town)};
  text-align: center;
  justify-self: center;
  font-size: ${({ theme }) => rem(theme.pulsar.size.town)};
  @media (min-width: ${rem(media.md)}) {
    margin-top: ${({ theme }) => rem(theme.pulsar.size.box)};
    margin-bottom: 0;
  }
`;

export const FooterBottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${rem(10)};
  justify-content: center;
  flex-direction: column-reverse;
  @media (min-width: ${rem(media.md)}) {
    justify-content: flex-start;
    flex-direction: column;
  }
`;
export const FooterBottom = styled.footer`
  margin-top: ${({ theme }) => rem(theme.pulsar.size.street)};
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.room)};
  font-weight: 300;
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
`;
