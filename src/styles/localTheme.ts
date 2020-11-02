const colors = {
  teal: '#31D5B8',
  spaceGrey: '#2b374a',
  rat: '#cecddc',
  transparent: 'rgba(0, 0, 0, 0)',
  white: '#ffffff',
  greyBlack: '#48556A',
  blue: '#2179ee',
};

export interface StyleClosetTheme {
  colors: { [key in keyof typeof colors]: string };
}

export const localTheme: StyleClosetTheme = {
  colors,
};
