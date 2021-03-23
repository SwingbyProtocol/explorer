import { useRouter } from 'next/router';

import { Loader } from '../../../../../components/Loader';
import { useLoadTransaction } from '../../../../hooks';
import { ActionButtons } from '../ActionButtonsSwap';
import { DetailCard } from '../DetailCard';
import { StatusCard } from '../StatusCard';
import { SwapFees } from '../SwapFees';

import { BrowserDetailContainer, BrowserDetailDiv, IconSwap, Row } from './styled';

export const BrowserDetail = () => {
  const router = useRouter();
  const params = router.query;
  const hash = String(params.hash);
  const { tx, loading } = useLoadTransaction(hash);

  return (
    <BrowserDetailContainer>
      <StatusCard tx={tx} />
      <BrowserDetailDiv size="bare">
        {!loading ? (
          <>
            <ActionButtons tx={tx} />
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
          </>
        ) : (
          <Loader minHeight={686} />
        )}
      </BrowserDetailDiv>
    </BrowserDetailContainer>
  );
};
