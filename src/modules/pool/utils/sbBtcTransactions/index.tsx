import { SkybridgeBridge } from '@swingby-protocol/sdk';

export const getSbBtcContract = (bridge: SkybridgeBridge) => {
  // @todo (agustin) CHECK
  // switch (bridge) {
  //   case 'btc_erc':
  //     return CONTRACT_SB_BTC;
  //
  //   default:
  //     return CONTRACT_SB_BTC;
  // }
  return null;
};

export const getSbBTCBalance = async (
  userAddress: string,
  bridge: SkybridgeBridge,
): Promise<number> => {
  // @todo (agustin) check
  // try {
  //   const web3 = createWeb3Instance({ mode, bridge });
  //   const currency = CoinSymbol.ERC20_SB_BTC;
  //   const contract = new web3.eth.Contract(
  //     CONTRACTS.coins[currency].production.abi as AbiItem[],
  //     CONTRACTS.coins[currency][mode].address,
  //   );
  //   const bal = await getUserBal({ address: userAddress, contract });
  //   return Number(bal);
  // } catch (error) {
  //   return 0;
  // }

  return 0;
};
