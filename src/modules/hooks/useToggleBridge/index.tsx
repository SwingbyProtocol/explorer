import { SkybridgeBridge, SKYBRIDGE_BRIDGES } from '@swingby-protocol/sdk';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { CoinSymbol, getBridgeBtc } from '../../coins';
import { PATH } from '../../env';

export const useToggleBridge = (path: PATH) => {
  const router = useRouter();
  const params = router.query;
  const bridge: SkybridgeBridge = params.bridge as SkybridgeBridge;

  const btcErc = SKYBRIDGE_BRIDGES.find((bridge) => bridge === 'btc_erc');
  const poolCurrencies = [CoinSymbol.BTC, getBridgeBtc(bridge)];

  const setBridge = (bridge: SkybridgeBridge): void => {
    router.push({
      pathname: path,
      query: { bridge },
    });
  };

  // Memo: Redirect to btc_erc bridge
  useEffect(() => {
    // Memo: Multiple-bridge as default path for Root
    if (path !== PATH.ROOT) {
      if (params.bridge === '' || !SKYBRIDGE_BRIDGES.includes(params.bridge as SkybridgeBridge)) {
        router.push({
          pathname: path,
          query: { bridge: btcErc },
        });
      }
    }
  }, [path, bridge, btcErc, router, params.bridge]);

  return { setBridge, bridge, poolCurrencies };
};
