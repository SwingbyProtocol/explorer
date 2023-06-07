import { useMatchMedia } from './useMatchMedia';

export const useSystemTheme = ({
  defaultTheme = 'light',
}: { defaultTheme?: 'light' | 'dark' } = {}) => {
  const perfersDark = useMatchMedia({
    query: '(prefers-color-scheme: dark)',
    defaultValue: defaultTheme === 'dark',
  });

  return perfersDark ? 'dark' : 'light';
};
