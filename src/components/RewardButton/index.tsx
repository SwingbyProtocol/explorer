import { Button, useMatchMedia } from '@swingby-protocol/pulsar';
import { CONTRACTS } from '@swingby-protocol/sdk';
import { rem } from 'polished';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Web3 from 'web3';

import { mode } from '../../modules/env';
import { initOnboard } from '../../modules/onboard';
import { StylingConstants } from '../../modules/styles';

import { RewardButtonContainer } from './styled';

export const RewardButton = () => {
  const { media } = StylingConstants;
  const lg = useMatchMedia({ query: `(min-width: ${rem(media.lg)})` });
  const md = useMatchMedia({ query: `(min-width: ${rem(media.md)})` });
  const sm = useMatchMedia({ query: `(min-width: ${rem(media.sm)})` });

  const [address, setAddress] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [onboard, setOnboard] = useState(null);

  const login = async () => {
    await onboard.walletSelect();
    await onboard.walletCheck();
  };

  useEffect(() => {
    const updateUserAddress = (address: string): void => {
      const formattedAddress = address ? address.toLowerCase() : address;
      setAddress(formattedAddress);
    };
    setOnboard(
      initOnboard({
        subscriptions: { address: updateUserAddress, wallet: setWallet },
      }),
    );
  }, []);

  useEffect(() => {
    wallet &&
      address &&
      (async () => {
        const web3 = new Web3(wallet.provider);
        const contract = new web3.eth.Contract(
          CONTRACTS['skybridge'][mode].abi,
          CONTRACTS['skybridge'][mode].address,
          wallet.provider,
        );
        const gasPrice = await web3.eth.getGasPrice();

        const rawTx = {
          chain: mode === 'production' ? 'mainnet' : 'goerli',
          nonce: await web3.eth.getTransactionCount(address),
          gasPrice: web3.utils.toHex(gasPrice),
          from: address,
          to: CONTRACTS['skybridge'][mode].address,
          value: '0x0',
          data: contract.methods.distributeNodeRewards().encodeABI(),
        };

        web3.eth.sendTransaction({ ...rawTx });
      })();
  }, [wallet, address]);

  return (
    <RewardButtonContainer>
      <Button
        size={lg ? 'country' : md ? 'state' : 'country'}
        shape={sm ? 'fit' : 'fill'}
        variant="tertiary"
        onClick={async () => {
          await login();
        }}
      >
        <FormattedMessage id="metanodes.distribute-rewards" />
      </Button>
    </RewardButtonContainer>
  );
};
