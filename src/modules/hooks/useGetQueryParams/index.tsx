import { useRouter } from 'next/router';

export const useGetQueryParams = () => {
  const router = useRouter();

  return { ...router.query };
};
