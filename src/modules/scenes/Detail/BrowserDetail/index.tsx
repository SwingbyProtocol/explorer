import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScaleLoader } from 'react-spinners';

import { ILoadHistory, loadHistory } from '../../../explorer';
import { useInterval } from '../../../hooks';
import { selectSwapDetails } from '../../../store';
import { ActionButtons } from '../ActionButtons';
import { DetailCard } from '../DetailCard';
import { FeeDistribution } from '../FeeDistribution';
import { SwapFees } from '../SwapFees';

import { BrowserDetailContainer, BrowserDetailDiv, LoadContainer } from './styled';

export const BrowserDetail = () => {
  const explorer = useSelector((state) => state.explorer);
  const { swapDetails } = explorer;
  const dispatch = useDispatch();
  const router = useRouter();
  const params = router.query;
  const hash = String(params.hash);

  const dispatchSelectSwapDetails = useCallback(
    async (hash: string) => {
      if (hash !== 'undefined') {
        const data: ILoadHistory = await loadHistory({
          page: 0,
          query: '',
          hash,
          isHideWaiting: false,
          bridge: '',
          prevTxsWithPage: null,
          swapHistoryTemp: null,
        });
        if (data) {
          dispatch(selectSwapDetails(data.txsWithPage.data[0][0]));
        }
      }
    },
    [dispatch],
  );

  useEffect(() => {
    !swapDetails && hash && dispatchSelectSwapDetails(hash);
  }, [dispatchSelectSwapDetails, hash, swapDetails]);

  useInterval(() => {
    dispatchSelectSwapDetails(hash);
  }, [10000]);

  const data = swapDetails && swapDetails;

  const loader = (
    <LoadContainer>
      <ScaleLoader margin={3} color="#36D7B7" />
    </LoadContainer>
  );

  return (
    <BrowserDetailContainer>
      <BrowserDetailDiv size="bare">
        {data && router.pathname !== undefined ? (
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
