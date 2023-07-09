import useCopy from '@react-hook/copy';
import React from 'react';

import { copyToClipboard, toastCopyTxId } from '../../../../../components/Toast';

import { AddressP } from './styled';

interface Props {
  txId: string;
}

export const TxIdElement = (props: Props) => {
  const { txId } = props;
  const { copy } = useCopy(txId);

  return <AddressP onClick={() => copyToClipboard(copy, toastCopyTxId)}>{txId}</AddressP>;
};
