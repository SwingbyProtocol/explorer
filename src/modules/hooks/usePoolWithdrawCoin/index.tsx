import { CONTRACTS, SkybridgeBridge } from '@swingby-protocol/sdk';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

import { mode } from '../../env';
import { CoinSymbol } from '../../coins';
import { checkIsValidAddress, checkIsValidAmount } from '../../explorer';
import { useOnboard } from '../../onboard';
import { getUserBal } from '../../web3';

export const usePoolWithdrawCoin = (userAddress, role: 'pool' | 'withdrawal') => {
  const router = useRouter();
  const params = router.query;
  const bridge: SkybridgeBridge = params.bridge as SkybridgeBridge;

  const [receivingAddress, setReceivingAddress] = useState(userAddress);
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState(CoinSymbol.BTC);
  const [isValidAddress, setIsValidAddress] = useState(null);
  const [isValidAmount, setIsValidAmount] = useState(null);
  const [peggedBtcUserBal, setPeggedBtcUserBal] = useState<number>(0);

  const { address, wallet } = useOnboard();

  useEffect(() => {
    const coin = role === 'pool' ? CoinSymbol.ERC20_SB_BTC : currency;
    checkIsValidAddress(receivingAddress, coin, setIsValidAddress);
  }, [receivingAddress, currency, role]);

  useEffect(() => {
    checkIsValidAmount(amount, setIsValidAmount);
  }, [amount]);

  useEffect(() => {
    (async () => {
      if (currency === CoinSymbol.SKYPOOL_WBTC) {
        try {
          const web3 = new Web3(wallet.provider);
          const peggedBtcAddress = CONTRACTS.coins[currency][mode].address;

          const contract = new web3.eth.Contract(
            CONTRACTS.coins[currency].production.abi as AbiItem[],
            peggedBtcAddress,
          );
          const maxAmount = await getUserBal({ address, contract });
          setPeggedBtcUserBal(Number(maxAmount));
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [address, currency, wallet, bridge]);

  // Memo: Reset state when change the bridge
  useEffect(() => {
    setAmount('');
    setCurrency(CoinSymbol.BTC);
    setIsValidAmount(null);
    setReceivingAddress(userAddress);
    setPeggedBtcUserBal(0);
  }, [bridge, userAddress]);

  return {
    receivingAddress,
    setReceivingAddress,
    amount,
    setAmount,
    currency,
    setCurrency,
    isValidAddress,
    setIsValidAddress,
    isValidAmount,
    setIsValidAmount,
    peggedBtcUserBal,
  };
};
