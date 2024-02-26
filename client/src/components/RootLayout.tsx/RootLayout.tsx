import { Outlet } from 'react-router-dom'
import styles from './RootLayout.module.scss'
import { useTheme } from '@hooks/useTheme'

const RootLayout = () => {
    const { theme } = useTheme()

    return (
        <div
            className={`${
                theme === 'light'
                    ? styles.root_layout_light
                    : styles.root_layout_dark
            }`}
        >
            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    )
}

export default RootLayout
