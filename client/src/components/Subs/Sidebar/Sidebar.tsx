import { FC } from 'react'
import styles from './Sidebar.module.scss'
import ThemeSwitcher from '@ui/Inputs/ThemeSwitcher/ThemeSwitcher'
import darkUserRounded from '@/assets/icons/dark/dark_user_rounded.svg'
import darkCard from '@/assets/icons/dark/dark_card.svg'
import darkPhone from '@/assets/icons/dark/dark_phone.svg'
import darkSettings from '@/assets/icons/dark/dark_settings.svg'
import darkLogout from '@/assets/icons/dark/dark_logout.svg'
import { useTheme } from '@hooks/useTheme'

const Sidebar: FC = () => {
    const { theme } = useTheme()

    const THEME_CLASSES = styles[`sidebar_${theme}`]

    return (
        <div className={THEME_CLASSES}>
            <a href="#">
                <img src={darkUserRounded} alt="dark user rounded"></img>
            </a>
            <ThemeSwitcher className={styles.theme_switcher} />
            <div className={styles.action_links}>
                <a href="#">
                    <img src={darkSettings} alt="dark settings"></img>
                </a>
                <a href="#">
                    <img src={darkCard} alt="dark card"></img>
                </a>
                <a href="#">
                    <img src={darkPhone} alt="dark phone"></img>
                </a>
                <a href="#">
                    <img
                        src={darkLogout}
                        alt="dark logout"
                        className={styles.logout_icon}
                    ></img>
                </a>
            </div>
        </div>
    )
}

export default Sidebar
