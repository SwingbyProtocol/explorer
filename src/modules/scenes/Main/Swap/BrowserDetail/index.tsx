import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Loader } from '../../../../../components/Loader';
import { ILoadHistory, loadHistory, TSwapWidget, TTxRawObject } from '../../../../explorer';
import { selectSwapDetails } from '../../../../store';
import { ActionButtons } from '../ActionButtonsSwap';
import { DetailCard } from '../DetailCard';
import { FeeDistribution } from '../FeeDistribution';
import { StatusCard } from '../StatusCard';
import { SwapFees } from '../SwapFees';

import { BrowserDetailContainer, BrowserDetailDiv, IconSwap, Row } from './styled';

interface Props {
  linkToSwapWidget: (tx: TTxRawObject, action: TSwapWidget) => void;
  runOnboard: () => void;
}

export const BrowserDetail = (props: Props) => {
  const { runOnboard } = props;
  const explorer = useSelector((state) => state.explorer);
  const { swapDetails } = explorer;
  const dispatch = useDispatch();
  const router = useRouter();
  const params = router.query;
  const hash = String(params.hash);
  const tx = swapDetails && (swapDetails as TTxRawObject);

  const dispatchSelectSwapDetails = useCallback(
    async (hash: string) => {
      if (hash !== 'undefined') {
        const data: ILoadHistory = await loadHistory({
          page: 0,
          query: '',
          hash,
          isRejectedTx: false,
          bridge: router.pathname.includes('swap') ? '' : 'floats', //Todo: Change to 'multiple-bridges' future
          prevTxsWithPage: null,
          swapHistoryTemp: null,
        });
        if (data) {
          dispatch(selectSwapDetails(data.txsWithPage.data[0][0]));
        }
      }
    },
    [dispatch, router.pathname],
  );

  useEffect(() => {
    !swapDetails && hash && dispatchSelectSwapDetails(hash);
  }, [dispatchSelectSwapDetails, hash, swapDetails]);

  // Memo: Cannot run at `ExplorerMain.tsx` due to avoid conflict with `Pool page`
  useEffect(() => {
    runOnboard();
  }, [runOnboard]);

  return (
    <BrowserDetailContainer>
      <StatusCard tx={tx} />
      <BrowserDetailDiv size="bare">
        {tx && router.pathname !== undefined ? (
          <>
            <ActionButtons tx={tx} linkToSwapWidget={props.linkToSwapWidget} />
            <Row isTxId={tx.txIdIn !== undefined}>
              <DetailCard
                role="From"
                currency={tx.currencyIn}
                amount={tx.amountIn}
                address={tx.addressIn}
                txId={tx.txIdIn}
              />
              <IconSwap />
              <DetailCard
                role="To"
                currency={tx.currencyOut}
                amount={tx.amountOut}
                address={tx.addressOut}
                txId={tx.txIdOut}
              />
            </Row>
            <SwapFees tx={tx} />
            {tx.rewards && tx.rewards.length > 0 && <FeeDistribution tx={tx} />}
          </>
        ) : (
          <Loader minHeight={686} />
        )}
      </BrowserDetailDiv>
    </BrowserDetailContainer>
  );
};
