import { GetServerSideProps } from 'next';
import { useState } from 'react';

import { Layout } from '../components/Layout';
import { NoServiceToUSModal } from '../components/NoServiceToUSModal';
import { getIpInfoFromRequest } from '../modules/ip-info';
import { Main } from '../modules/scenes';

type Props = { shouldBlockIp: boolean };

export default function Fees({ shouldBlockIp }: Props) {
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
