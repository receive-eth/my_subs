import { useContext } from 'react'
import {
    ThemeContext,
    IThemeContext,
} from '../../src/providers/ThemeContext/ThemeContext'

export const useTheme = () => useContext<IThemeContext>(ThemeContext)
