import { FC } from 'react'
import styles from './AuthFormHeading.module.scss'
import { useTheme } from '@hooks/useTheme'

interface IAuthFormHeading {
    children: string
    underlineClassName?: string
}

const AuthFormHeading: FC<IAuthFormHeading> = ({
    children,
    underlineClassName,
}) => {
    const { theme } = useTheme()

    const THEME_CLASSES = styles[`heading_${theme}`]

    return (
        <div className={THEME_CLASSES}>
            <span>{children}</span>
            <div className={`${styles.underline} ${underlineClassName}`} />
        </div>
    )
}

export default AuthFormHeading
