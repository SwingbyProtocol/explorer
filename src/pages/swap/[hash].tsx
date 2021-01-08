import { getIpInfoFromRequest, IpInfoFromRequest } from '@swingby-protocol/ip-check';
import { GetServerSideProps } from 'next';
import { useState } from 'react';

import { Main } from '../../modules/scenes';
import { NoServiceToUSModal } from '../../components/NoServiceToUSModal';
import { ipApiKey } from '../../modules/env';

type Props = { ipInfo: IpInfoFromRequest };

export default function SwapDetail({ ipInfo }: Props) {
  const [isNoServiceToUSModalOpen, setIsNoServiceToUSModalOpen] = useState(
    ipInfo?.shouldBlockRegion,
  );

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
  return { props: { ipInfo: await getIpInfoFromRequest({ req, ipApiKey }) } };
};
