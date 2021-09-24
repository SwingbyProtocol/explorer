import { FormattedMessage } from 'react-intl';
import { createToast } from '@swingby-protocol/pulsar';

export { ExplorerToast } from './ExplorerToast';

export const copyToClipboard = (copy: () => void, toast: (arg?) => void, role?: string) => {
  copy();
  if (role) {
    toast(role);
  } else {
    toast();
  }
};

export const toastWrongAddress = () => {
  createToast({
    type: 'danger',
    content: <FormattedMessage id="toast.invalid-wallet-address" />,
    autoClose: true,
    toastId: 'wrongAddressToastID',
  });
};

export const toastCopyAddress = (role?: string) => {
  createToast({
    type: 'info',
    content: role ? (
      role === 'From' ? (
        <FormattedMessage id="toast.copied-from-address" />
      ) : (
        <FormattedMessage id="toast.copied-to-address" />
      )
    ) : (
      <FormattedMessage id="toast.copied-address" />
    ),
    autoClose: true,
  });
};

export const toastCopyURL = () => {
  createToast({
    type: 'info',
    content: <FormattedMessage id="toast.copied-link-URL" />,
    autoClose: true,
  });
};

export const toastCopyTxId = () => {
  createToast({
    type: 'info',
    content: <FormattedMessage id="toast.copied-tx-id" />,
    autoClose: true,
  });
};
