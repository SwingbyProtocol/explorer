import { CONTRACTS, SkybridgeBridge } from '@swingby-protocol/sdk';
import { AbiItem } from 'web3-utils';

import { CoinSymbol } from '../../../coins';
import {
  mode,
  ENDPOINT_BSCSCAN,
  ENDPOINT_ETHERSCAN,
  etherscanApiKey,
  bscscanApiKey,
  CONTRACT_SB_BTC,
  CONTRACT_BEP20_SB_BTC,
  URL_ETHERSCAN,
  URL_BSCSCAN,
} from '../../../env';
import { createWeb3Instance, getUserBal } from '../../../web3';

export const getScanApiBaseEndpoint = (bridge: SkybridgeBridge) => {
  switch (bridge) {
    case 'btc_erc':
      return ENDPOINT_ETHERSCAN;

    case 'btc_bep20':
      return ENDPOINT_BSCSCAN;

    default:
      return ENDPOINT_ETHERSCAN;
  }
};

export const getScanDetailBaseEndpoint = (bridge: SkybridgeBridge) => {
  switch (bridge) {
    case 'btc_erc':
      return URL_ETHERSCAN;

    case 'btc_bep20':
      return URL_BSCSCAN;

    default:
      return URL_ETHERSCAN;
  }
};

export const getScanApiKey = (bridge: SkybridgeBridge) => {
  switch (bridge) {
    case 'btc_erc':
      return etherscanApiKey;

    case 'btc_bep20':
      return bscscanApiKey;

    default:
      return etherscanApiKey;
  }
};

export const getSbBtcContract = (bridge: SkybridgeBridge) => {
  switch (bridge) {
    case 'btc_erc':
      return CONTRACT_SB_BTC;

    case 'btc_bep20':
      return CONTRACT_BEP20_SB_BTC;

    default:
      return CONTRACT_SB_BTC;
  }
};

export const getSbBTCBalance = async (
  userAddress: string,
  bridge: SkybridgeBridge,
): Promise<number> => {
  try {
    const web3 = createWeb3Instance({ mode, bridge });
    const currency = bridge === 'btc_erc' ? CoinSymbol.ERC20_SB_BTC : CoinSymbol.BEP20_SB_BTC;
    const contract = new web3.eth.Contract(
      CONTRACTS.coins[currency].production.abi as AbiItem[],
      CONTRACTS.coins[currency][mode].address,
    );
    const bal = await getUserBal({ address: userAddress, contract });
    return Number(bal);
  } catch (error) {
    return 0;
  }
};
