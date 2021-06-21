interface ITheme {
  color: {
    white: string
    black: string
  }
  typography: {
    normal: string
  }
}
declare module '*.svg' {
  const content: any
  export default content
}

