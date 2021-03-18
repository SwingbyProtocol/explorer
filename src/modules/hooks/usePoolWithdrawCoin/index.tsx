import { SkybridgeBridge } from '@swingby-protocol/sdk';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { CoinSymbol } from '../../coins';
import { checkIsValidAddress, checkIsValidAmount } from '../../explorer';

export const usePoolWithdrawCoin = (userAddress, role: 'pool' | 'withdrawal') => {
  const router = useRouter();
  const params = router.query;
  const bridge: SkybridgeBridge = params.bridge as SkybridgeBridge;

  const [receivingAddress, setReceivingAddress] = useState(userAddress);
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState(CoinSymbol.BTC);
  const [isValidAddress, setIsValidAddress] = useState(null);
  const [isValidAmount, setIsValidAmount] = useState(null);

  useEffect(() => {
    const coin = role === 'pool' ? CoinSymbol.ETH_SB_BTC : currency;
    checkIsValidAddress(receivingAddress, coin, setIsValidAddress);
  }, [receivingAddress, currency, role]);

  useEffect(() => {
    checkIsValidAmount(amount, setIsValidAmount);
  }, [amount]);

  // Memo: Reset state when change the bridge
  useEffect(() => {
    setAmount('');
    setCurrency(CoinSymbol.BTC);
    setIsValidAmount(null);
    setReceivingAddress(userAddress);
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
  };
};
