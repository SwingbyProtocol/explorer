import { ethers } from 'ethers';

export const getUserBal = async ({
  address,
  contract,
}: {
  address: string;
  contract: any;
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
