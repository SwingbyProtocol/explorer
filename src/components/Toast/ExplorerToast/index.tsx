import { Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Atag } from '../../../modules/scenes/Common';

import { ColumnLink, ExplorerToastContainer, IconLink } from './styled';

export const ExplorerToast = ({
  hash,
  network,
  isPending,
}: {
  hash: string;
  network: number;
  isPending: boolean;
}) => {
  const getExplorerData = (network: number, hash: string) => {
    if (network === 5) {
      return {
        scan: 'Etherscan',
        url: `https://goerli.etherscan.io/tx/${hash}`,
      };
    }
    if (network === 56) {
      return {
        scan: 'BscScan',
        url: `https://bscscan.com/tx/${hash}`,
      };
    }
    if (network === 97) {
      return {
        scan: 'BscScan',
        url: `https://testnet.bscscan.com/tx/${hash}`,
      };
    }

    return {
      scan: 'Etherscan',
      url: `https://etherscan.io/tx/${hash}`,
    };
  };

  const { url, scan } = getExplorerData(network, hash);

  return (
    <ExplorerToastContainer>
      <Text variant="accent">
        {isPending ? (
          <FormattedMessage id="toast.transaction-submitted" />
        ) : (
          <FormattedMessage id="toast.transaction-confirmed" />
        )}
      </Text>
      <ColumnLink>
        <Atag target="_blank" rel="noreferrer" href={url}>
          <Text variant="normal">
            <FormattedMessage id="toast.view-on-scan" values={{ value: scan }} />
          </Text>
        </Atag>
        <IconLink />
      </ColumnLink>
    </ExplorerToastContainer>
  );
};
