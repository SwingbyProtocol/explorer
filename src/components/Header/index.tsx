import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Icon } from '@swingby-protocol/pulsar';

import { Sidebar } from '../Sidebar';
import { NavHandlerProps } from '../Layout';
import { useOnboard } from '../../modules/onboard';
import { AccountId } from '../../components/AccountId';

import {
  HeaderContainer,
  SidebarToggleMobile,
  HeaderAction,
  HeaderLogo,
  ButtonConnect,
} from './styled';

type Props = NavHandlerProps;

const ConnectWallet = () => {
  const { address, onboard } = useOnboard();

  if (address) {
    return <AccountId />;
  }

  return (
    <ButtonConnect
      variant="primary"
      size="state"
      onClick={async () => await onboard?.walletSelect()}
    >
      <FormattedMessage id="pool.connectWallet" />
    </ButtonConnect>
  );
};

export const Header = ({ navOpen, toggleNav }: Props) => {
  return (
    <HeaderContainer open={navOpen}>
      <Sidebar navOpen={navOpen} toggleNav={toggleNav} />

      <HeaderLogo>
        <SidebarToggleMobile onClick={toggleNav}>
          <Icon.Hamburger />
        </SidebarToggleMobile>
      </HeaderLogo>

      <HeaderAction>
        <ConnectWallet />
      </HeaderAction>
    </HeaderContainer>
  );
};
