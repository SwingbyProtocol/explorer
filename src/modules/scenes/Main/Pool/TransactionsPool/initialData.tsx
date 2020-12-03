const currentTime = Date.now() / 1000;
export const initialTxsData = {
  data: {
    1: [
      {
        value: '1000',
        timeStamp: currentTime - 60,
        hash: '0xf8c3f7b71ee69ffff3c8d124239abd1cab7e7e428a2f023ab07c09f488141413',
      },
      {
        value: '-1000',
        timeStamp: currentTime - 3559,
        hash: '0xf8c3f7b71ee69ffff3c8d124239abd1cab7e7e428a2f023ab07c09f488141413',
      },
      {
        value: '2000',
        timeStamp: currentTime - 30000,
        hash: '0xf8c3f7b71ee69ffff3c8d124239abd1cab7e7e428a2f023ab07c09f488141413',
      },
      {
        value: '-2000',
        timeStamp: currentTime - 200000,
        hash: '0xf8c3f7b71ee69ffff3c8d124239abd1cab7e7e428a2f023ab07c09f488141413',
      },
      {
        value: '3000',
        timeStamp: currentTime - 250000,
        hash: '0xf8c3f7b71ee69ffff3c8d124239abd1cab7e7e428a2f023ab07c09f488141413',
      },
    ],
  },
  total: 5,
};
