import React from 'react';

import { Links, Media, URL } from '../../modules/links';

import {
  ALink,
  ALinkIcon,
  FooterBottom,
  FooterBottomRow,
  FooterContainer,
  LiLink,
  LogoBox,
  MediaRow,
  SwingbyLogo,
  UlLink,
} from './styled';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <FooterContainer>
      <UlLink>
        {Links.map((link) => (
          <LiLink key={link.description}>
            <ALink href={link.link} rel="noopener noreferrer" target="_blank">
              {link.description}
            </ALink>
          </LiLink>
        ))}
        <LiLink>
          <ALink href={`mailto:${URL.Support}`} rel="noopener noreferrer" target="_blank">
            Support
          </ALink>
        </LiLink>
      </UlLink>

      <LogoBox>
        <SwingbyLogo />
        <MediaRow>
          {Media.map((media) => (
            <ALinkIcon href={media.link} rel="noopener noreferrer" target="_blank" key={media.link}>
              {media.icon}
            </ALinkIcon>
          ))}
        </MediaRow>
      </LogoBox>
      <FooterBottomRow>
        <FooterBottom>© 2018-{currentYear} Swingby Labs. All Rights Reserved.</FooterBottom>
        <div />
      </FooterBottomRow>
    </FooterContainer>
  );
};
