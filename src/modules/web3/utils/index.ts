import { ethers } from 'ethers';
import { Contract } from 'web3-eth-contract';

export const getUserBal = async ({
  address,
  contract,
}: {
  address: string;
  contract: Contract;
}): Promise<string> => {
  try {
    const decimals = await contract.methods.decimals().call();
    const peggedBtcUserBal = (await contract.methods.balanceOf(address).call()) ?? '0';
    const bal = ethers.utils.formatUnits(peggedBtcUserBal, decimals);
    return bal;
  } catch (error) {
    console.log(error);
    return '0';
  }
};
