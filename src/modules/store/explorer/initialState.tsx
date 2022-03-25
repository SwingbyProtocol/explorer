import { NetworkInfo, USDPrices, Volume } from '../../../store/types';

const initialVolume = { at: '1-Jan', amount: '1' };
const initialVolumeYear = { at: 'Jan 2022', amount: '1' };

export const initialVolumes: Volume[] = [
  initialVolume,
  initialVolume,
  initialVolume,
  initialVolume,
  initialVolume,
  initialVolume,
  initialVolume,
];

export const initialVolumesYear: Volume[] = [
  initialVolumeYear,
  initialVolumeYear,
  initialVolumeYear,
  initialVolumeYear,
  initialVolumeYear,
  initialVolumeYear,
  initialVolumeYear,
  initialVolumeYear,
  initialVolumeYear,
  initialVolumeYear,
  initialVolumeYear,
  initialVolumeYear,
];

export const networkInfos: NetworkInfo = {
  capacity: 0,
  floatBalances: { btcEth: 0, btcBsc: 0, wbtc: 0, btcb: 0 },
  stats: {
    volume1wksWBTC: 0,
    volume1wksBTCB: 0,
    volume1wksBTC: 0,
    volumes: initialVolumes,
    volume1yrWBTC: 0,
    volume1yrBTCB: 0,
    volume1yrBTC: 0,
    volumesYear: initialVolumesYear,
    metanodes: 0,
  },
};

export const usd: USDPrices = { BTC: 0, SWINGBY: 0 };

export const floatHistoryObjectInitialValue = [
  {
    at: '2021-01-01T00:00:00.474Z',
    data: [
      {
        amount: '0',
        bridge: 'btc_erc',
        currency: 'BTC',
        amountUsd: '0',
      },
      {
        amount: '0',
        bridge: 'btc_erc',
        currency: 'WBTC',
        amountUsd: '0',
      },
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
