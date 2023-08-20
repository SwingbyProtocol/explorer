import { SkybridgeBridge, SKYBRIDGE_BRIDGES } from '@swingby-protocol/sdk';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { CoinSymbol, getBridgeBtc } from '../../coins';
import { PATH } from '../../env';

export const useToggleBridge = (path: PATH) => {
  const router = useRouter();
  const params = router.query;
  const bridge: SkybridgeBridge = params.bridge as SkybridgeBridge;

  const btcSkypool = SKYBRIDGE_BRIDGES.find((bridge) => bridge === 'btc_skypool');
  const poolCurrencies = [CoinSymbol.BTC, getBridgeBtc(bridge)];

  const setBridge = (bridge: SkybridgeBridge): void => {
    router.push({
      pathname: path,
      query: { bridge },
    });
  };

  // Memo: Redirect to btc_skypool bridge
  useEffect(() => {
    // Memo: Multiple-bridge as default path for Root and Explorer
    if (path !== PATH.ROOT && path !== PATH.EXPLORER && path !== PATH.MIGRATE) {
      if (params.bridge === '' || !SKYBRIDGE_BRIDGES.includes(params.bridge as SkybridgeBridge)) {
        router.push({
          pathname: path,
          query: { bridge: btcSkypool },
        });
      }
    }
  }, [path, bridge, btcSkypool, router, params.bridge]);

  return { setBridge, bridge, defaultBridge: btcSkypool, poolCurrencies };
};
