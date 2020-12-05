import { toast } from 'react-toastify';

export const toastWrongAddress = () => {
  toast.error('Invalid wallet address, please check the transaction again', {
    autoClose: 3000,
    draggable: true,
    hideProgressBar: true,
  });
};

export const toastCopyAddress = () => {
  toast.info('Copied your address!', {
    autoClose: 3000,
    draggable: true,
    hideProgressBar: true,
  });
};
