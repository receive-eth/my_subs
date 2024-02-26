import { FC, ReactNode } from 'react'
import { useState, useEffect, createContext } from 'react'

type Theme = 'light' | 'dark'

export interface IThemeContext {
    theme: Theme
    toggleTheme: () => void
}

export const ThemeContext = createContext<IThemeContext>({
    theme: 'light',
    toggleTheme: () => {},
})

const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>('light')

    const toggleTheme = () => {
        setTheme(prev => {
            const newTheme = prev === 'light' ? 'dark' : 'light'
            localStorage.setItem('theme', newTheme)
            return newTheme
        })
    }

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme')
        if (storedTheme && storedTheme !== theme) {
            setTheme(storedTheme as Theme)
        }
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
