import { createToast } from '@swingby-protocol/pulsar';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { ethers } from 'ethers';

import abi from '../../swap-rewards/abi/trade-mining.json'; // eslint-disable-line

import { ExplorerToast } from '../../../components/Toast';
import { logger } from '../../logger';
import { useOnboard } from '../../onboard';
import { SWINGBY_DECIMALS, tradeMiningContract } from '../../swap-rewards';
import { calculateGasMargin, generateSendParams, generateWeb3ErrorToast } from '../../web3';
import { fetchFloatBalances } from '../../explorer';

const initialUserState = {
  pending: '0',
  claimed: '0',
};

const initialCoinState = {
  swapFrom: 'BTC',
  swapTo: 'WBTC',
};

export const useGetSwapRewards = () => {
  const [user, setUser] = useState<typeof initialUserState>(initialUserState);
  const [rewards, setRewards] = useState<typeof initialCoinState>(initialCoinState);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const usdBtc = useSelector((state) => state.explorer.usd.BTC);
  const { network, wallet, onboard, address } = useOnboard();
  const bridge = network === 56 || network === 97 ? 'btc_bep20' : 'btc_erc';
  const isValidCondition = network === 5;

  useEffect(() => {
    if (bridge === 'btc_bep20') {
      createToast({
        content: (
          <FormattedMessage
            id="swap-rewards.bridge-coming-soon"
            values={{ bridge: 'BSC network' }}
          />
        ),
        type: 'warning',
      });
    }
  }, [bridge]);

  const claimRewards = useCallback(async () => {
    try {
      const web3 = new Web3(wallet.provider);
      const contract = new web3.eth.Contract(abi as AbiItem[], tradeMiningContract[network]);
      const estimatedGas = await contract.methods.claim().estimateGas({ from: address });
      const gasLimit = calculateGasMargin(estimatedGas);
      const sendParams = await generateSendParams({ from: address, network, gasLimit });

      if (!(await onboard.walletCheck())) {
        throw Error('Wallet check result is invalid');
      }

      return await contract.methods
        .claim()
        .send(sendParams)
        .on('transactionHash', (hash: string) => {
          createToast({
            content: <ExplorerToast network={network} hash={hash} isPending={true} />,
            type: 'success',
            toastId: `${hash}`,
            autoClose: true,
          });
        });
    } catch (e) {
      generateWeb3ErrorToast({ e, toastId: 'claimRewards' });
    }
  }, [network, onboard, wallet, address]);

  const getCurrency = useCallback(async () => {
    try {
      setIsLoading(true);
      const { floats } = await fetchFloatBalances(usdBtc, bridge);
      if (bridge === 'btc_bep20') {
        setRewards({
          swapFrom: floats.btcBsc > floats.btcb ? 'BTCB' : 'BTC',
          swapTo: floats.btcBsc > floats.btcb ? 'BTC' : 'BTCB',
        });
        return;
      }
      setRewards({
        swapFrom: floats.btcEth > floats.wbtc ? 'WBTC' : 'BTC',
        swapTo: floats.btcEth > floats.wbtc ? 'BTC' : 'WBTC',
      });
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [bridge, usdBtc]);

  const getUserData = useCallback(async () => {
    try {
      if (isValidCondition) {
        const web3 = new Web3(wallet.provider);
        const contract = new web3.eth.Contract(abi as AbiItem[], tradeMiningContract[network]);
        const results = await Promise.all([
          contract.methods.getPendings(address).call(),
          contract.methods.getClaimed(address).call(),
        ]);
        setUser({
          pending: ethers.utils.formatUnits(results[0], SWINGBY_DECIMALS),
          claimed: ethers.utils.formatUnits(results[1], SWINGBY_DECIMALS),
        });
        return;
      }
      setUser(initialUserState);
    } catch (error) {
      logger.error(error);
      setUser(initialUserState);
    }
  }, [wallet, network, isValidCondition, address]);

  useEffect(() => {
    getUserData();
    getCurrency();
  }, [getUserData, getCurrency]);

  return useMemo(() => ({ rewards, user, isLoading, claimRewards, network }), [
    rewards,
    user,
    isLoading,
    claimRewards,
    network,
  ]);
};
