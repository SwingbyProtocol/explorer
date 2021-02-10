import { GetServerSideProps } from 'next';
import { useState } from 'react';

import { Main } from '../../modules/scenes';
import { NoServiceToUSModal } from '../../components/NoServiceToUSModal';
import { getIpInfoFromRequest } from '../../modules/ip-info';

type Props = { shouldBlockIp: boolean };

export default function FloatDetail({ shouldBlockIp }: Props) {
  const [isNoServiceToUSModalOpen, setIsNoServiceToUSModalOpen] = useState(shouldBlockIp);

  return (
    <>
      <NoServiceToUSModal
        isWidgetModalOpen={isNoServiceToUSModalOpen}
        setIsWidgetModalOpen={setIsNoServiceToUSModalOpen}
      />
      <Main />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
  return { props: await getIpInfoFromRequest({ req }) };
};
