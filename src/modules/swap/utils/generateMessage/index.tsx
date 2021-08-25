import { FormattedMessage } from 'react-intl';

import { TxStatus } from '../../../explorer';

const {
  COMPLETED,
  REJECTED,
  BROADCASTED,
  SENDING,
  PENDING,
  SIGNING,
  REFUNDING,
  SIGNING_REFUND,
  REFUNDED,
  WAITING,
  EXPIRED,
  SENDING_REFUND,
} = TxStatus;

export const generateMessage = (status: string) => {
  switch (status) {
    case WAITING:
      return <FormattedMessage id="swap.message.waiting" />;
    case COMPLETED:
      return <FormattedMessage id="swap.message.completed" />;
    case PENDING:
      return <FormattedMessage id="swap.message.pending" />;
    case SIGNING:
      return <FormattedMessage id="swap.message.signing" />;
    case SENDING:
      return <FormattedMessage id="swap.message.sending" />;
    case BROADCASTED:
      return <FormattedMessage id="swap.message.sending" />;
    case REFUNDED:
      return <FormattedMessage id="swap.message.refunded" />;
    case REFUNDING:
      return <FormattedMessage id="swap.message.refunded" />;
    case SIGNING_REFUND:
      return <FormattedMessage id="swap.message.refunded" />;
    case SENDING_REFUND:
      return <FormattedMessage id="swap.message.refunded" />;
    case REJECTED:
      return <FormattedMessage id="swap.message.refunded" />;
    case EXPIRED:
      return <FormattedMessage id="swap.message.expired" />;
    default:
      return <FormattedMessage id="swap.message.waiting" />;
  }
};
