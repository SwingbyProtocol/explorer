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
} = TxStatus;

export const message = {
  waiting:
    'Waiting for your deposit transactions. Once this has been confirmed, your swap will be processed.',
  pending: 'Waiting for your deposit transaction to confirm. Soon your swap will be processed.',
  signing: 'The Skyrbidge network has detected your deposit transaction and processing your swap.',
  sending:
    'Your swap has been successfully processed and the Skybridge network has broadcasted the outbound transaction to your destination address.',
  completed: 'Your swap has been completed successfully and your funds have been delivered.',
  refunded:
    'Uh oh, the Skybridge network has encountered an error. Your funds will be sent back to your original address.',
  expired: 'The swap is too old and has been invalidated. No funds were received or sent.',
};

export const generateMessage = (status: string): string => {
  switch (status) {
    case WAITING:
      return message.waiting;
    case COMPLETED:
      return message.completed;
    case PENDING:
      return message.pending;
    case SIGNING:
      return message.signing;
    case SENDING:
      return message.sending;
    case BROADCASTED:
      return message.sending;
    case REFUNDED:
      return message.refunded;
    case REFUNDING:
      return message.refunded;
    case SIGNING_REFUND:
      return message.refunded;
    case REJECTED:
      return message.refunded;
    case EXPIRED:
      return message.expired;
    default:
      return status;
  }
};
