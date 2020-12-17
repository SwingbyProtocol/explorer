import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Developers, Links, Media, Terms, URL } from '../../modules/links';
import { Atag } from '../../modules/scenes/Common';

import {
  ALink,
  ALinkIcon,
  FooterContainer,
  LiLink,
  LogoBox,
  MediaRow,
  SwingbyLogo,
  UlLink,
  TextTitle,
  ColumnTerm,
  ColumnLink,
  FooterBox,
} from './styled';

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterBox>
        <Atag href={URL.Swingby} rel="noopener noreferrer" target="_blank">
          <SwingbyLogo />
        </Atag>
        <ColumnLink>
          <UlLink>
            <TextTitle variant="accent">
              <FormattedMessage id="footer.links" />
            </TextTitle>
            {Links.map((link) => (
              <LiLink key={link.description}>
                <ALink href={link.link} rel="noopener noreferrer" target="_blank">
                  <FormattedMessage id={link.description} />
                </ALink>
              </LiLink>
            ))}
          </UlLink>
        </ColumnLink>
        <ColumnLink>
          <UlLink>
            <TextTitle variant="accent">
              <FormattedMessage id="footer.developers" />
            </TextTitle>
            {Developers.map((link) => (
              <LiLink key={link.description}>
                <ALink href={link.link} rel="noopener noreferrer" target="_blank">
                  <FormattedMessage id={link.description} />
                </ALink>
              </LiLink>
            ))}
          </UlLink>
        </ColumnLink>

        <ColumnTerm>
          <UlLink>
            {Terms.map((link) => (
              <LiLink key={link.description}>
                <ALink href={link.link} rel="noopener noreferrer" target="_blank">
                  <FormattedMessage id={link.description} />
                </ALink>
              </LiLink>
            ))}
          </UlLink>
        </ColumnTerm>
      </FooterBox>
      <LogoBox>
        <MediaRow>
          {Media.map((media) => (
            <ALinkIcon href={media.link} rel="noopener noreferrer" target="_blank" key={media.link}>
              {media.icon}
            </ALinkIcon>
          ))}
        </MediaRow>
      </LogoBox>
    </FooterContainer>
  );
};
