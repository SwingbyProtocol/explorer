import { createToast } from '@swingby-protocol/pulsar';
import { SkybridgeBridge } from '@swingby-protocol/sdk';
import { ethers } from 'ethers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

import { ExplorerToast } from '../../../components/Toast';
import { fetchFloatBalances } from '../../explorer';
import { logger } from '../../logger';
import { useOnboard } from '../../onboard';
import { SWINGBY_DECIMALS, tradeMiningContract } from '../../swap-rewards';
import abi from '../../swap-rewards/abi/trade-mining.json'; // eslint-disable-line
import { calculateGasMargin, generateSendParams, generateWeb3ErrorToast } from '../../web3';
import { btcUSDPriceSelector } from '../../store';
import { useSdkContext } from '../../sdk-context';

const initialUserState = {
  pending: '0',
  claimed: '0',
};

const initialCoinState = {
  swapFrom: 'BTC',
  swapTo: 'WBTC',
};

export const useGetSwapRewards = ({ bridge }: { bridge: SkybridgeBridge }) => {
  const [user, setUser] = useState<typeof initialUserState>(initialUserState);
  const [rewards, setRewards] = useState<typeof initialCoinState>(initialCoinState);
  const [rewardsPercent, setRewardsPercent] = useState<Number>(0);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const usdBtc = useSelector(btcUSDPriceSelector);
  const { network, wallet, onboard, address } = useOnboard();
  const isValidCondition = network === 1 || network === 3;
  const context = useSdkContext();

  const getRewardsPercentage = ({
    btcFloat,
    peggedBtcFloat,
  }: {
    btcFloat: number;
    peggedBtcFloat: number;
  }): number => {
    const difference = Math.abs(btcFloat - peggedBtcFloat);
    const ttlFloat = btcFloat + peggedBtcFloat;
    const differenceRatio = difference / ttlFloat;

    // Ref: 20% is the line for judgement whether float difference is bigger or smaller
    const isBiggerRewards = differenceRatio > 0.2;
    if (isBiggerRewards) {
      return 0.4;
    }
    return 0.2;
  };

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
      const { floats } = await fetchFloatBalances({ usdBtc, bridge, context });

      if (bridge === 'btc_skypool') {
        setRewards({
          swapFrom: floats.btcSkypool > floats.wbtcSkypool ? 'WBTC' : 'BTC',
          swapTo: floats.btcSkypool > floats.wbtcSkypool ? 'BTC' : 'WBTC',
        });
        const rewardsPercentage = getRewardsPercentage({
          btcFloat: floats.btcSkypool,
          peggedBtcFloat: floats.wbtcSkypool,
        });
        setRewardsPercent(rewardsPercentage);
        return;
      }

      setRewards({
        swapFrom: floats.btcSkypool > floats.wbtcSkypool ? 'WBTC' : 'BTC',
        swapTo: floats.btcSkypool > floats.wbtcSkypool ? 'BTC' : 'WBTC',
      });
      const rewardsPercentage = getRewardsPercentage({
        btcFloat: floats.btcSkypool,
        peggedBtcFloat: floats.wbtcSkypool,
      });
      setRewardsPercent(rewardsPercentage);
      return;
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

  return useMemo(
    () => ({ rewards, user, isLoading, claimRewards, bridge, network, rewardsPercent }),
    [rewards, network, user, isLoading, claimRewards, bridge, rewardsPercent],
  );
};
