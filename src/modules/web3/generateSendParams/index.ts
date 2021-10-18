import { ethers } from 'ethers';

import { blocknativeApiKey } from '../../env';
import { fetcher } from '../../fetch';

interface IBlockPrices {
  blockPrices: BlockPrice[];
}

interface BlockPrice {
  estimatedPrices: {
    confidence: number;
    maxPriorityFeePerGas: number;
  }[];
}

// Memo: Add `maxPriorityFeePerGas` for EIP-1559
export const generateSendParams = async ({
  from,
  gasLimit,
  network,
}: {
  from: string;
  gasLimit: number;
  network: number;
}) => {
  const params = {
    from,
    gasLimit,
  };

  if (network === 1) {
    try {
      // Ref: https://docs.blocknative.com/gas-platform
      const url = 'https://api.blocknative.com/gasprices/blockprices';
      const result = await fetcher<IBlockPrices>(url, {
        headers: {
          Authorization: blocknativeApiKey,
        },
      });

      const gweiDecimals = 9;
      const maxPriorityFeePerGasGwei =
        result.blockPrices[0].estimatedPrices.find((it) => it.confidence === 80)
          .maxPriorityFeePerGas ?? 5;
      const maxPriorityFeePerGas = Number(
        ethers.utils.parseUnits(maxPriorityFeePerGasGwei.toString(), gweiDecimals),
      );
      return { ...params, maxPriorityFeePerGas };
    } catch (error) {
      console.log(error);
      return { ...params, maxPriorityFeePerGas: 5000000000 };
    }
  }

  if (network === 3) {
    return { ...params, maxPriorityFeePerGas: 5000000000 };
  }

  return params;
};
