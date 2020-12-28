import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';

export const copyToClipboard = (copy: () => void, toast: (arg?) => void, role?: string) => {
  copy();
  if (role) {
    toast(role);
  } else {
    toast();
  }
};

export const toastWrongAddress = () => {
  toast.error(<FormattedMessage id="toast.invalidWalletAddress" />, {
    autoClose: 3000,
    draggable: true,
    hideProgressBar: true,
    // Memo: To prevent duplicated toast
    toastId: 'wrongAddressToastID',
  });
};

export const toastCopyAddress = (role?: string) => {
  toast.info(
    role ? (
      role === 'From' ? (
        <FormattedMessage id="toast.copiedFromAddress" />
      ) : (
        <FormattedMessage id="toast.copiedToAddress" />
      )
    ) : (
      <FormattedMessage id="toast.copiedAddress" />
    ),
    {
      autoClose: 3000,
      draggable: true,
      hideProgressBar: true,
    },
  );
};

export const toastCopyURL = () => {
  toast.info(<FormattedMessage id="toast.copiedLinkURL" />, {
    autoClose: 3000,
    draggable: true,
    hideProgressBar: true,
  });
};

export const toastCopyTxId = () => {
  toast.info(<FormattedMessage id="toast.copiedTxId" />, {
    autoClose: 3000,
    draggable: true,
    hideProgressBar: true,
  });
};
