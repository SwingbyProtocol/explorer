import { useRouter } from 'next/router';

export const useAffiliateCode = () => {
  const {
    query: { aff: affiliateCode },
  } = useRouter();
  return typeof affiliateCode === 'string' ? affiliateCode : undefined;
};
