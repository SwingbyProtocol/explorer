import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';

export const copyToClipboard = (copy: () => void, toast: () => void) => {
  copy();
  toast();
};

export const toastWrongAddress = () => {
  toast.error(<FormattedMessage id="toast.invalidWalletAddress" />, {
    autoClose: 3000,
    draggable: true,
    hideProgressBar: true,
  });
};

export const toastCopyAddress = () => {
  toast.info(<FormattedMessage id="toast.copiedAddress" />, {
    autoClose: 3000,
    draggable: true,
    hideProgressBar: true,
  });
};

export const toastCopyURL = () => {
  toast.info(<FormattedMessage id="toast.copiedLinkURL" />, {
    autoClose: 3000,
    draggable: true,
    hideProgressBar: true,
  });
};
