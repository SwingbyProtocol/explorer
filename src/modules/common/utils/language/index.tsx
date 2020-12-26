export const getInitialLanguage = (locale: string): string => {
  if (locale === 'en') {
    return 'EN';
  }
  if (locale === 'zh') {
    return 'Chinese (Simplified)';
  }
  if (locale === 'zh-TW') {
    return 'Chinese (Traditional)';
  }
};
