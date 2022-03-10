import { IFee } from '../modules/explorer';

export type Volume = { at: string; amount: string };

export type NetworkStats = {
  volume1wksWBTC: number;
  volume1wksBTC: number;
  volumes: Volume[];
  volume1yrWBTC: number;
  volume1yrBTC: number;
  volumesYear: Volume[];
  metanodes: number;
};

export type NetworkInfo = {
  capacity: number;
  floatBalances: {
    btcEth: number;
    wbtc: number;
  };
  stats: NetworkStats;
};

export type USDPrices = {
  BTC: number;
  SWINGBY: number;
};

export type NodeEndpoint = {
  btc_erc: string;
};

export type ExplorerState = {
  isLoading: boolean;
  usd: USDPrices;
  networkInfos: NetworkInfo;
  nodeEndpoint: NodeEndpoint;
  transactionFees: IFee[];
  isExistPreviousPage: boolean;
};
