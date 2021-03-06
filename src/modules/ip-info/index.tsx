import { GetServerSideProps } from 'next';
import { shouldBlockRegion } from '@swingby-protocol/ip-check';

export const getIpInfoFromRequest = async ({
  req,
}: {
  req: Parameters<GetServerSideProps>[0]['req'];
}) => {
  return {
    ip: typeof req.headers['x-real-ip'] === 'string' ? req.headers['x-real-ip'] : null,
    shouldBlockIp: (() => {
      try {
        return shouldBlockRegion({
          regionCode: `${req.headers['x-vercel-ip-country']}`,
          innerRegionCode: `${req.headers['x-vercel-ip-country-region']}`,
        });
      } catch (e) {
        console.error('Error checking whether region should be blocked', e);
        return false;
      }
    })(),
  };
};
