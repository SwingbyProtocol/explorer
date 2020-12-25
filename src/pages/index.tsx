import { getIpInfo, shouldBlockRegion } from '@swingby-protocol/ip-check';
import { useEffect, useState } from 'react';

import { NoServiceToUSModal } from '../components/NoServiceToUSModal';
import { IPSTACK_API_KEY } from '../modules/env';
import { Main } from '../modules/scenes';

export default function Home({ blockRegion, clientIp }) {
  const [isNoServiceToUSModalOpen, setIsNoServiceToUSModalOpen] = useState(blockRegion);
  const [location, setLocation] = useState(null);
  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then((response) => response.json())
      .then((data) => setLocation(data));
  }, []);

  console.log('location', location);
  console.log('blockRegion', blockRegion);
  console.log('clientIp', clientIp);

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
  const calilfolniaIp = '192.119.164.87';

  const ipInfo = await (async () => {
    try {
      return await getIpInfo({
        // ip: clientIp,
        ip: calilfolniaIp,
        ipstackApiKey: IPSTACK_API_KEY,
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
    props: { blockRegion, clientIp },
  };
}
