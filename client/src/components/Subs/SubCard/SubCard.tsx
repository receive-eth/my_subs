import { FC } from 'react'
import styles from './SubCard.module.scss'
import yandex_music from '@/assets/temporary/yandex_music_logo.svg'
import dark_clock from '@/assets/icons/dark/dark_clock.svg'
import dark_card from '@/assets/icons/dark/dark_card.svg'
import { useTheme } from '@hooks/useTheme'
import light_card from '@/assets/icons/card.svg'

interface ISubCard {}

const SubCard: FC<ISubCard> = () => {
    const { theme } = useTheme()

    const THEME_CLASSES = styles[`card_${theme}`]
    const CARD_ICON = theme === 'light' ? light_card : dark_card

    return (
        <div className={THEME_CLASSES}>
            <div className={styles.first_line}>
                <img
                    src={yandex_music}
                    alt="yandex_music"
                    className={styles.logo}
                />
                <h3>Яндекс музыка</h3>
                <div className={styles.price_container}>
                    <div className={styles.price}>299 €</div>
                    <span className={styles.separator} />
                </div>
            </div>

            <div className={styles.bottom}>
                <div className={styles.date}>
                    <img
                        src={dark_clock}
                        alt="clock_icon"
                        className={styles.clock_icon}
                    />
                    <span>26.02.2024</span>
                </div>
                <div className={styles.bound_card}>
                    <img
                        src={CARD_ICON}
                        alt="dark_card"
                        className={styles.card_icon}
                    />
                    <span>.0824</span>
                </div>
            </div>
        </div>
    )
}

export default SubCard
