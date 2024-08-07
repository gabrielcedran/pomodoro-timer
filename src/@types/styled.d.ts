import 'styled-components'
import { defaultTheme } from '../styles/themes/default'

type ThemeType = typeof defaultTheme

// this is redeclaring the styled components type module - overriding due to the import above
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
