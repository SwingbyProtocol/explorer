import { Icon } from '@swingby-protocol/pulsar';
import { useIntl } from 'react-intl';

import { NavHandlerProps } from '../Layout';

import { SidebarInput, SidebarToggle, SidebarContainer, AppLogoLink } from './styled';

const TOGGLE_ID = 'sidebar-menu-toggle';

type Props = NavHandlerProps;

export const Sidebar = ({ navOpen, setNavOpen }: Props) => {
  const { locale } = useIntl();

  return (
    <>
      <SidebarInput type="checkbox" id={TOGGLE_ID} />

      <SidebarContainer open={navOpen}>
        <SidebarToggle htmlFor={TOGGLE_ID} onClick={() => setNavOpen(!navOpen)}>
          {navOpen ? <Icon.ArrowLeft /> : <Icon.ArrowRight />}
        </SidebarToggle>

        <AppLogoLink href={`/${locale}`}>
          {navOpen ? (
            <Icon.SwingbyWithName data-testid="sb.header.logo" />
          ) : (
            <Icon.Swingby data-testid="sb.header.logo" />
          )}
        </AppLogoLink>
      </SidebarContainer>
    </>
  );
};
