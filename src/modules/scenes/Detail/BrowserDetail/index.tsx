import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScaleLoader } from 'react-spinners';

import { ILoadHistory, loadHistory } from '../../../explorer';
import { useInterval } from '../../../hooks';
import { getHistory } from '../../../store';
import { ActionButtons } from '../ActionButtons';
import { DetailCard } from '../DetailCard';
import { FeeDistribution } from '../FeeDistribution';
import { SwapFees } from '../SwapFees';

import { BrowserDetailContainer, BrowserDetailDiv, LoadContainer } from './styled';

export const BrowserDetail = () => {
  const explorer = useSelector((state) => state.explorer);
  const { swapHistory } = explorer;
  const dispatch = useDispatch();
  const router = useRouter();
  const params = router.query;
  const txid = String(params.txid);

  const dispatchLoadHistory = useCallback(async () => {
    const data: ILoadHistory = await loadHistory(0, txid, false, '', null, null);
    if (data) {
      dispatch(getHistory(data.txsWithPage));
    }
  }, [dispatch, txid]);

  useEffect(() => {
    dispatchLoadHistory();
  }, [dispatchLoadHistory]);

  useInterval(() => {
    dispatchLoadHistory();
  }, [10000]);

  const data = swapHistory && swapHistory.data[0][0];

  const loader = (
    <LoadContainer>
      <ScaleLoader margin={3} color="#36D7B7" />
    </LoadContainer>
  );

  return (
    <BrowserDetailContainer>
      <BrowserDetailDiv size="bare">
        {data ? (
          <>
            <ActionButtons />
            <DetailCard
              role="From"
              currency={data.currencyIn}
              amount={data.amountIn}
              address={data.addressIn}
              txId={data.txIdIn}
            />
            <DetailCard
              role="To"
              currency={data.currencyOut}
              amount={data.amountOut}
              address={data.addressOut}
              txId={data.txIdOut}
            />
            <SwapFees fee={data.fee} currency={data.feeCurrency} />
            {data.rewards.length > 0 && (
              <FeeDistribution rewards={data.rewards} currency={data.currencyOut} />
            )}
          </>
        ) : (
          loader
        )}
      </BrowserDetailDiv>
    </BrowserDetailContainer>
  );
};
