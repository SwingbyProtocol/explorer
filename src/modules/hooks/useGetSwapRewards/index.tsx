import { createToast } from '@swingby-protocol/pulsar';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

import { ExplorerToast } from '../../../components/ExplorerToast';
import { logger } from '../../logger';
import { useOnboard } from '../../onboard';

const initialState = {
  pending: 0,
  claimed: 0,
  swapFrom: 'WBTC',
  swapTo: 'BTC',
};

export const useGetSwapRewards = () => {
  const [rewards, setRewards] = useState<typeof initialState>(initialState);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const floatBalances = useSelector((state) => state.explorer.networkInfos.floatBalances);
  const { address, network } = useOnboard();
  const bridge = network === 56 || network === 97 ? 'btc_bep20' : 'btc_erc';

  const claimRewards = useCallback(async () => {
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
      return;
    }
    try {
      const hash = '0xcfdc127c9759498040e0c631c0bcf09dd4375422c4ffacea1518f1e43e328b1f';
      createToast({
        content: <ExplorerToast network={network} hash={hash} isPending={true} />,
        type: 'success',
        toastId: `${hash}`,
        autoClose: true,
      });
    } catch (e) {
      createToast({ content: e?.message || 'Failed to send transaction', type: 'danger' });
    }
  }, [bridge, network]);

  const getCurrency = useCallback(() => {
    if (bridge === 'btc_bep20') {
      setRewards({
        ...rewards,
        swapFrom: floatBalances.btcBsc > floatBalances.btcb ? 'BTCB' : 'BTC',
        swapTo: floatBalances.btcBsc > floatBalances.btcb ? 'BTC' : 'BTCB',
      });
      return;
    }
    setRewards({
      ...rewards,
      swapFrom: floatBalances.btcEth > floatBalances.wbtc ? 'WBTC' : 'BTC',
      swapTo: floatBalances.btcEth > floatBalances.wbtc ? 'BTC' : 'WBTC',
    });
    return;
  }, [bridge, floatBalances, rewards]);

  const getData = useCallback(async () => {
    try {
      setIsLoading(true);

      // Todo
    } catch (error) {
      logger.error(error);
      // setApr(initialState);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getData();
    getCurrency();
  }, [getData, getCurrency]);

  return useMemo(() => ({ rewards, isLoading, claimRewards, network }), [
    rewards,
    isLoading,
    claimRewards,
    network,
  ]);
};
