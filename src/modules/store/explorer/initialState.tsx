import { NetworkInfo } from '../types';

const intialVolume = { at: '1-Jan', amount: '1' };
export const initialVolumes = [
  intialVolume,
  intialVolume,
  intialVolume,
  intialVolume,
  intialVolume,
  intialVolume,
  intialVolume,
];
export const networkInfos: NetworkInfo = {
  capacity: 0,
  floatBalances: { btcSkypool: 0, wbtcSkypool: 0 },
  stats: {
    volume1wksWBTC_Skypool: 0,
    volume1wksBTC: 0,
    rewards1wksUSD: 0,
    volumes: initialVolumes,
    volumes1mWBTC_Skypool: 0,
    volumes1mBTC: 0,
    volumes1m: initialVolumes,
    volumes1yWBTC_Skypool: 0,
    volumes1yBTC: 0,
    volumes1y: initialVolumes,
    metanodes: 0,
  },
};

export const usd = { BTC: 0, SWINGBY: 0 };

export const floatHistoryObjectInitialValue = [
  {
    at: '2021-01-01T00:00:00.474Z',
    data: [
      {
        amount: '0',
        bridge: 'btc_bep20',
        currency: 'BTC',
        amountUsd: '0',
      },
      {
        amount: '0',
        bridge: 'btc_bep20',
        currency: 'BTCB',
        amountUsd: '0',
      },
    ],
    totalUsd: '0',
  },
];
