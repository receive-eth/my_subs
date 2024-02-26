import { Dispatch, FC, SetStateAction } from 'react'
import styles from './ProfileHeader.module.scss'
import { IoChevronBackSharp } from 'react-icons/io5'
import profileImage from '@/assets/icons/dark/dark_user_rounded.svg'
import { useTheme } from '@hooks/useTheme'

interface IProfleHeader {
    setMobileOptionsOpen: Dispatch<SetStateAction<boolean>>
}

const ProfileHeader: FC<IProfleHeader> = ({ setMobileOptionsOpen }) => {
    const { theme } = useTheme()

    const THEME_CLASSES = styles[`profile_header_${theme}`]

    return (
        <div className={THEME_CLASSES}>
            <button
                className={styles.back_button}
                onClick={() => setMobileOptionsOpen(false)}
            >
                <IoChevronBackSharp size={25} />
                Назад
            </button>
            <img src={profileImage} alt="" className={styles.user_icon} />
            <div className={styles.text_container}>
                <span className={styles.user_name}>Sergei</span>
                <div className={styles.underline}></div>
            </div>
        </div>
    )
}

export default ProfileHeader
