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

export const nodeEndpoint = {
  btc_erc: 'https://btc-wbtc-mainnet.quantexe.com',
  btc_bep20: 'https://ra-cailum.zoo.farm',
};

export const networkInfos = {
  capacity: 0,
  floatBalances: { btcEth: 0, btcBsc: 0, wbtc: 0, btcb: 0 },
  stats: {
    volume1wksWBTC: 0,
    volume1wksBTCB: 0,
    volume1wksBTC: 0,
    rewards1wksUSD: 0,
    volumes: initialVolumes,
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
