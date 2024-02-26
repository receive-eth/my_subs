import { FC } from 'react'
import styles from './ThemeSwitcher.module.scss'
import { useTheme } from '@hooks/useTheme'

interface IThemeSwitcher {
    className?: string
    onToggle?: () => void
}

const ThemeSwitcher: FC<IThemeSwitcher> = ({ onToggle, className }) => {
    const { theme, toggleTheme } = useTheme()

    const toggle = () => {
        toggleTheme()

        if (onToggle) onToggle()
    }

    return (
        <label className={`${styles.switch} ${className}`}>
            <input
                type="checkbox"
                checked={theme === 'dark'}
                onChange={toggle}
                className={styles.hidden_input}
            />
            <span className={styles.switch_slider} />
        </label>
    )
}

export default ThemeSwitcher
