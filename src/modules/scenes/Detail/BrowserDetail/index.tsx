import { ActionButtons } from '../ActionButtons';
import { DetailCard } from '../DetailCard';
import { FeeDistribution } from '../FeeDistribution';
import { SwapFees } from '../SwapFees';

import { BrowserDetailContainer, BrowserDetailDiv } from './styled';

export const BrowserDetail = () => {
  // Memo: Mock data
  const data = {
    addressIn: '0xb680c8F33f058163185AB6121F7582BAb57Ef8a7',
    addressOut: 'tb1qar59aek2j4q8k8g9908ltelphjlls0nemw8czq',
    amountIn: '0.07999848',
    amountOut: '0.07961848',
    currencyIn: 'BTCE',
    currencyOut: 'BTC',
    fee: '0.00038',
    feeCurrency: 'BTC',
    rewards: [
      {
        address: '1N8hwP1WmJrFF5QWABn38y63uYLhnJYJYTF',
        amount: '4.76e-05',
        txId: '2b738d3115f25ac53d305e8d8c9688ed46702c23d09fa4431473740590d41864',
      },
      {
        address: '2N8hwP1WmJrFF5QWABn38y63uYLhnJYJYTF',
        amount: '4.76e-05',
        txId: '2b738d3115f25ac53d305e8d8c9688ed46702c23d09fa4431473740590d41864',
      },
      {
        address: '3N8hwP1WmJrFF5QWABn38y63uYLhnJYJYTF',
        amount: '4.76e-05',
        txId: '2b738d3115f25ac53d305e8d8c9688ed46702c23d09fa4431473740590d41864',
      },
    ],
    status: 'COMPLETED',
    timestamp: 1605698930,
    txIdIn: '0x443828ff1acbcdb5e6667ad54fd0efa55f9b73fb4796479922055ee8eb3b8afc',
    txIdOut: '58a5db2b30ddf9fd7f957c096f7a2ba4aabcd0d4017da946a521f2fcbfb51239',
  };
  return (
    <BrowserDetailContainer>
      <BrowserDetailDiv size="bare">
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
        <FeeDistribution rewards={data.rewards} currency={data.currencyOut} />
      </BrowserDetailDiv>
    </BrowserDetailContainer>
  );
};
