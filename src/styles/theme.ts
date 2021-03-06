// ref: https://shopify.engineering/5-ways-to-improve-your-react-native-styling-workflow
const palette = {
  lightyellow: '#faf5e1',
  yellow: '#fdf6b9',
  blue: '#92c0ea',
  pink: '#f3cfdb',
  deepyellow: '#fdd400',
  white: '#ffffff',
  black: '#000000',
  gray: '#333333',
  lightgray: '#E0E0E0',
}

export const defaultTheme = {
  color: {
    background: palette.lightyellow,
    foreground: palette.white,
    mainFont: palette.black,
    ...palette,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  typography: {
    h1: {
      fontWeight: 'bold',
      fontSize: 24,
    },
    h2: {
      fontWeight: 'bold',
      fontSize: 20,
    },
    h3: {
      fontSize: 20,
    },
    body1: {
      fontSize: 16,
    },
    body2: {
      fontSize: 14,
      fontWeight: 400,
    },
  },
}

export const theme = {
  ...defaultTheme,
  color: {
    ...defaultTheme.color,
    background: palette.gray,
    foreground: palette.white,
    mainFont: palette.white,
  },
}
