import { SkybridgeBridge, SkybridgeContext } from '@swingby-protocol/sdk';
import { BigNumber } from 'bignumber.js';

import { fetch } from '../../../fetch';
import { IFee } from '../../index';

export const getTransactionFees = async ({
  context,
}: {
  context: SkybridgeContext;
}): Promise<IFee[]> => {
  const urlSkypool = context.servers.swapNode.btc_skypool;
  try {
    const result = await fetch<IFee[]>(urlSkypool + '/api/v1/swaps/fees');
    return result.ok && result.response;
  } catch (err) {
    console.log(err);
    return [
      {
        bridgeFeePercent: '0',
        currency: 'sbBTC',
        minerFee: '0',
      },
      {
        bridgeFeePercent: '0',
        currency: 'BTC',
        minerFee: '0',
      },
      {
        bridgeFeePercent: '0',
        currency: 'WBTC',
        minerFee: '0',
      },
      {
        bridgeFeePercent: '0',
        currency: 'BTCB',
        minerFee: '0',
      },
    ];
  }
};

export const getTransactionFee = async ({
  bridge,
  context,
}: {
  bridge: SkybridgeBridge;
  context: SkybridgeContext;
}): Promise<IFee> => {
  const getTargetCurrency = (bridge: SkybridgeBridge) => {
    switch (bridge) {
      case 'btc_skypool':
        return 'WBTC';

      default:
        return 'WBTC';
    }
  };

  try {
    const fees = await getTransactionFees({ context });
    const fee = fees.find((it: IFee) => it.currency === getTargetCurrency(bridge));
    return fee;
  } catch (err) {
    console.log(err);
  }
};

export const toBTC = (satoshiValue: string): number => {
  return Number(new BigNumber(satoshiValue).div(100000000, 10));
};

export const toSatoshi = (btcValue: string): number => {
  return Number(new BigNumber(btcValue).times(100000000));
};

// Ref: https://skybridge-docs.swingby.network/fees
export const calculateFixedFee = (
  currency: string,
  feeInfos: IFee[],
): { fixedFee: number; feePercent: string } => {
  let fixedFee: number;
  let feePercent: string;

  try {
    feeInfos.forEach((feeInfo) => {
      if (feeInfo.currency === currency) {
        fixedFee = toBTC(feeInfo.minerFee);
        feePercent = feeInfo.bridgeFeePercent;
      }
    });
  } catch (err) {
    console.error(err);
  }
  return { fixedFee, feePercent };
};

// Ref: https://bl.ocks.org/sounisi5011/a5039aedd1c378971d966fa55a61f473
// Memo: Convert small number(exponential) such as`5e-7` to normal number
export const exponentialToNumber = (number: string | number): string => {
  const numStr = String(number);

  const match = numStr.match(
    /^([+-]?)0*([1-9][0-9]*|)(?:\.([0-9]*[1-9]|)0*)?(?:[eE]([+-]?[0-9]+))?$/,
  );

  if (!match) {
    if (typeof number == 'number') {
      return numStr;
    } else {
      throw new Error(`Invalid Number: "${numStr}"`);
    }
  }

  const sign = match[1] === '-' ? '-' : '';
  const mantissa_int = match[2];
  const mantissa_frac = match[3] ? match[3] : '';
  const exponent = Number(match[4]);

  let returnValue = '';

  if (exponent) {
    const mantissa_str = mantissa_int + mantissa_frac;
    const mantissa_len = mantissa_str.length;

    if (0 < mantissa_len) {
      const mantissa_int_len = mantissa_int.length + exponent;

      if (mantissa_len <= mantissa_int_len) {
        returnValue = mantissa_str.padEnd(mantissa_int_len, '0');
      } else if (0 < mantissa_int_len) {
        returnValue =
          mantissa_str.slice(0, mantissa_int_len) + '.' + mantissa_str.slice(mantissa_int_len);
      } else {
        returnValue = '0.' + '0'.repeat(-mantissa_int_len) + mantissa_str;
      }
    }
  } else if (mantissa_frac) {
    returnValue = (mantissa_int || '0') + '.' + mantissa_frac;
  } else if (mantissa_int) {
    returnValue = mantissa_int;
  }

  return returnValue
    ? sign + returnValue.replace(/^(?:0(?!\.|$))+/, '').replace(/(?:\.0+|(\.[0-9]*[1-9])0+)$/, '$1')
    : '0';
};
