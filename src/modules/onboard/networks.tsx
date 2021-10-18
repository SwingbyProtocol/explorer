export const NETWORK_IDS = [1, 3, 56, 97] as const;
export type NetworkId = typeof NETWORK_IDS[number];

export const isValidNetworkId = (value: any): value is NetworkId =>
  !!NETWORK_IDS.find((it) => `${it}` === `${value}`);
