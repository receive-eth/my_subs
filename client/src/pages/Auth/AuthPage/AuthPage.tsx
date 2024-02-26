import { FC, useEffect } from 'react'
import styles from './AuthPage.module.scss'
import subLogo from '@/assets/logos/sub_logo.svg'
import darkSubLogo from '@/assets/logos/dark/dark_sub_logo.svg'
import telegramLogo from '@/assets/logos/telegram_logo.svg'
import darkTelegramLogo from '@/assets/logos/dark/dark_telegram.svg'
import vkLogo from '@/assets/logos/vk_logo.svg'
import darkVkLogo from '@/assets/logos/dark/dark_vk.svg'
import phoneImg from '@/assets/pink_phone.svg'
import darkPhoneImg from '@/assets/dark_phone.svg'
import BackgroundWords from '@/components/Authentification/BackgroundWords/BackgroundWords'
import ActionButtons from '@/components/Authentification/ActionButtons/ActionButtons'
import { useTheme } from '@hooks/useTheme'
import ThemeSwitcher from '@ui/Inputs/ThemeSwitcher/ThemeSwitcher'
import ContentContainer from '@/layouts/ContentContainer'
import useAuthStore from '@hooks/useAuthStore'
import { useNavigate } from 'react-router-dom'

const AuthPage: FC = () => {
    const { theme } = useTheme()
    const { status, user } = useAuthStore(store => store)
    const navigate = useNavigate()

    useEffect(() => {
        console.log('user: ', user)
        if (user) {
            navigate('/subs', { replace: true })
        }
    }, [user])

    if (status === 'pending') return 'status'

    return (
        <ContentContainer>
            <div className={styles.wrapper}>
                <BackgroundWords />

                <div className={styles.container}>
                    <img
                        src={theme === 'light' ? subLogo : darkSubLogo}
                        alt="my_subs_logo"
                        className={styles.sub_logo}
                    />
                    <div className={styles.heading}>
                        <span>MY SUBS</span>
                        <div className={styles.underline}></div>
                    </div>

                    <div className={styles.sub_heading}>
                        отслеживайте свои подписки легко и просто
                    </div>

                    <ActionButtons />

                    <div className={styles.social_media}>
                        <p>Мы в социальных сетях</p>
                        <div className={styles.logos}>
                            <a href="#">
                                <img
                                    src={
                                        theme === 'light'
                                            ? telegramLogo
                                            : darkTelegramLogo
                                    }
                                    alt=""
                                ></img>
                            </a>
                            <a href="#">
                                <img
                                    src={
                                        theme === 'light' ? vkLogo : darkVkLogo
                                    }
                                    alt=""
                                ></img>
                            </a>
                        </div>

                        <ThemeSwitcher className={styles.theme_switcher} />
                    </div>

                    <img
                        src={theme === 'light' ? phoneImg : darkPhoneImg}
                        alt="phone image"
                        className={styles.phone_img_position}
                    />
                </div>
            </div>
        </ContentContainer>
    )
}

export default AuthPage
