import { Icon } from '@swingby-protocol/pulsar';
import Head from 'next/head';
import Image from 'next/image';
import { FormattedMessage } from 'react-intl';
import useCopy from '@react-hook/copy';

import { ButtonScale } from '../../../Common';
import { BRIDGE_ADDRESS } from '../../../../../modules/env';
import { URL } from '../../../../../modules/links';
import { copyToClipboard, toastCopyAddress } from '../../../../../components/Toast';

import {
  MigrateContainer,
  MigrateChainContainer,
  MigrateChain,
  MigrateChainAnchor,
  MigrateDiv,
  MigratePanelContainer,
  MigratePanel,
  MigrateAddressContainer,
  MigrateAddress,
  MigrateAddressText,
  MigrateQrCode,
  MigrateQrCodeDescription,
  MigrateAddressAnchor,
} from './styled';

export const Migrate = () => {
  const { copy } = useCopy(BRIDGE_ADDRESS);

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

                <MigrateChainAnchor href={URL.MigrateBep20} target="_blank">
                  <MigrateChain variant="secondary" size="city">
                    BEP20
                  </MigrateChain>
                </MigrateChainAnchor>
                <MigrateChainAnchor href={URL.MigrateErc20} target="_blank">
                  <MigrateChain variant="secondary" size="city">
                    ERC20
                  </MigrateChain>
                </MigrateChainAnchor>
              </MigrateChainContainer>

              <MigrateQrCode value={BRIDGE_ADDRESS} size={200}></MigrateQrCode>
              <MigrateQrCodeDescription>
                <FormattedMessage id="migrate.description" />
              </MigrateQrCodeDescription>

              <MigrateAddressContainer>
                <ButtonScale
                  variant="secondary"
                  size="city"
                  onClick={() => copyToClipboard(copy, toastCopyAddress)}
                >
                  <MigrateAddress>
                    <Image src="/coin.svg" width={20} height={20} />
                    <MigrateAddressText>{BRIDGE_ADDRESS}</MigrateAddressText>
                  </MigrateAddress>
                </ButtonScale>

                <MigrateAddressAnchor href={URL.MigrateIn} target="_blank">
                  IN
                  <Icon.ExternalLink />
                </MigrateAddressAnchor>
                <MigrateAddressAnchor href={URL.MigrateOut} target="_blank">
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
