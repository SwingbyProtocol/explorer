import { Loader } from '../../../../../components/Loader';
import { useTxsQuery } from '../../../../hooks';
import { ActionButtons } from '../ActionButtonsSwap';
import { DetailCard } from '../DetailCard';
import { StatusCard } from '../StatusCard';
import { SwapFees } from '../SwapFees';

import { BrowserDetailContainer, BrowserDetailDiv, IconSwap, Row } from './styled';

export const BrowserDetail = () => {
  const { tx } = useTxsQuery();

  return (
    <BrowserDetailContainer>
      <StatusCard tx={tx} />
      <BrowserDetailDiv size="bare">
        {!tx && <Loader minHeight={686} />}
        {tx && (
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
        )}
      </BrowserDetailDiv>
    </BrowserDetailContainer>
  );
};
