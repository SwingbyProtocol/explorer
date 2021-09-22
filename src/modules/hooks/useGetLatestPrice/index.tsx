import { useCallback, useEffect, useMemo, useState } from 'react';

import { getUsdPrice } from '../../explorer';

export const useGetLatestPrice = (currency: string) => {
  const [price, setPrice] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const getPrice = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await getUsdPrice(currency);
      setPrice(result);
    } catch (error) {
      console.log('error:', error);
      setPrice(0);
    } finally {
      setIsLoading(false);
    }
  }, [currency]);

  useEffect(() => {
    getPrice();
  }, [getPrice]);

  return useMemo(() => ({ price, isLoading }), [price, isLoading]);
};
