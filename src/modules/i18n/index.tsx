/* eslint-disable import/no-internal-modules */

import en from './files/en.json';
import zh from './files/zh.json';
import zh_TW from './files/zh-TW.json';

export const languages = {
  en,
  zh,
  'zh-TW': zh_TW,
};

export const languagesSelector = [
  {
    text: 'EN',
    code: 'en',
  },
  {
    text: '中文',
    code: 'zh',
  },
];
