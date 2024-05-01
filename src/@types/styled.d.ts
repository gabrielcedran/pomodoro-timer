// The import makes the declaration part to work as an extension rather then a redefinition.
import 'styled-components'
import { defaultTheme } from '../styles/themes/default'

type ThemeType = typeof defaultTheme; // Kinda storing the inferred type of the defaultTheme into ThemeType to then extend styled components types with them

// Each lib has its own way of supporting extensions (some may not even support at all) therefore it's necessary to check the documentation for further information.
declare module 'styled-components' {
    export interface DefaultTheme extends ThemeType { }
}