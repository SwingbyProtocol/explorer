import { Icon } from '@swingby-protocol/pulsar';
import Head from 'next/head';
import Image from 'next/image';
import { FormattedMessage } from 'react-intl';

import {
  MigrateContainer,
  MigrateChainContainer,
  MigrateChain,
  MigrateDiv,
  MigratePanelContainer,
  MigratePanel,
  MigrateAddressContainer,
  MigrateAddress,
  MigrateQrCode,
  MigrateQrCodeDescription,
  MigrateAddressAnchor,
} from './styled';

export const Migrate = () => {
  return (
    <>
      <Head>
        <title>Swingby Skybridge | Migrate SWINGBY BEP20 to ERC20</title>
      </Head>
      <MigrateContainer>
        <MigrateDiv size="bare">
          <MigratePanelContainer>
            <MigratePanel>
              <MigrateChainContainer>
                <Image src="/migrate-erc20.svg" width={222} height={55} />

                <MigrateChain variant="secondary" size="city">
                  BEP20
                </MigrateChain>
                <MigrateChain variant="secondary" size="city">
                  ERC20
                </MigrateChain>
              </MigrateChainContainer>

              <MigrateQrCode value="ALSDJLAKSJDLAKSJFKLASFJL" size={200}></MigrateQrCode>
              <MigrateQrCodeDescription>
                <FormattedMessage id="migrate.description" />
              </MigrateQrCodeDescription>

              <MigrateAddressContainer>
                <MigrateAddress variant="secondary" size="city">
                  ALSDJLAKSJDLAKSJFKLASFJL
                </MigrateAddress>

                <MigrateAddressAnchor>
                  IN
                  <Icon.ExternalLink />
                </MigrateAddressAnchor>
                <MigrateAddressAnchor>
                  OUT
                  <Icon.ExternalLink />
                </MigrateAddressAnchor>
              </MigrateAddressContainer>
            </MigratePanel>
          </MigratePanelContainer>
        </MigrateDiv>
      </MigrateContainer>
    </>
  );
};
