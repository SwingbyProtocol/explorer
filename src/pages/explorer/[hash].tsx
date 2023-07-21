import { GetServerSideProps } from 'next';
import { useState } from 'react';

import { Main } from '../../modules/scenes';
import { NoServiceToUSModal } from '../../components/NoServiceToUSModal';
import { getIpInfoFromRequest } from '../../modules/ip-info';
import { Layout } from '../../components/Layout';

type Props = { shouldBlockIp: boolean };

export default function SwapDetail({ shouldBlockIp }: Props) {
  const [isNoServiceToUSModalOpen, setIsNoServiceToUSModalOpen] = useState(shouldBlockIp);

  return (
    <Layout>
      <NoServiceToUSModal
        isWidgetModalOpen={isNoServiceToUSModalOpen}
        setIsWidgetModalOpen={setIsNoServiceToUSModalOpen}
      />
      <Main />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
  return { props: await getIpInfoFromRequest({ req }) };
};
