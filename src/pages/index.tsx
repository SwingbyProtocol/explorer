import { getIpInfo, shouldBlockRegion } from '@swingby-protocol/ip-check';
import { useEffect, useState } from 'react';

import { NoServiceToUSModal } from '../components/NoServiceToUSModal';
import { IPSTACK_API_KEY } from '../modules/env';
import { Main } from '../modules/scenes';

export default function Home() {
  const [isShouldBlockRegion, setIsShouldBlockRegion] = useState(null);
  const [isNoServiceToUSModalOpen, setIsNoServiceToUSModalOpen] = useState(null);
  const [location, setLocation] = useState(null);
  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then((response) => response.json())
      .then((data) => setLocation(data));
  }, []);

  useEffect(() => {
    (async () => {
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
      setIsNoServiceToUSModalOpen(shouldBlockRegion(ipInfo as any));
    })();
  }, []);

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
