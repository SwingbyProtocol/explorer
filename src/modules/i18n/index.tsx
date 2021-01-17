/* eslint-disable import/no-internal-modules */

import en from './files/en.json';
import zh from './files/zh.json';
import zh_TW from './files/zh-TW.json';
import ja from './files/ja.json';

export const languages = {
  en,
  zh,
  'zh-TW': zh_TW,
  ja,
};

export const languagesSelector = [
  {
    text: 'EN',
    code: 'en',
  },
  {
    text: 'Chinese (Simplified)',
    code: 'zh',
  },
  {
    text: 'Chinese (Traditional)',
    code: 'zh-TW',
  },
  {
    text: 'Japanese',
    code: 'ja',
  },
];
