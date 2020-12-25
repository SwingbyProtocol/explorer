import { getIpInfo, shouldBlockRegion } from '@swingby-protocol/ip-check';
import { useState } from 'react';

import { NoServiceToUSModal } from '../components/NoServiceToUSModal';
import { IPSTACK_API_KEY } from '../modules/env';
import { Main } from '../modules/scenes';

export default function Home({ blockRegion }) {
  const [isNoServiceToUSModalOpen, setIsNoServiceToUSModalOpen] = useState(blockRegion);
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

export async function getServerSideProps({ req }) {
  const clientIp =
    (typeof req.headers['x-real-ip'] === 'string' ? req.headers['x-real-ip'] : undefined) ??
    req.connection.remoteAddress ??
    '';

  const ipInfo = await (async () => {
    try {
      return await getIpInfo({
        ip: clientIp,
        ipstackApiKey: 'b74a888cf8d2112ef1a0a72367e4c696',
      });
    } catch (e) {
      return e.message;
    }
  })();

  const blockRegion = (() => {
    try {
      return shouldBlockRegion(ipInfo as any);
    } catch (e) {
      return false;
    }
  })();

  return {
    props: { blockRegion },
  };
}
