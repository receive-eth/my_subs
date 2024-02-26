import { FC } from 'react'
import styles from './OptionCard.module.scss'
import { IconType } from 'react-icons'
import { IconBaseProps } from 'react-icons'
import { useTheme } from '@hooks/useTheme'

interface IOptionCard {
    Icon: IconType
    rightIcon?: FC | IconType | null
    settings: {
        size: IconBaseProps['size']
        color: {
            theme_light: IconBaseProps['color']
            theme_dark: IconBaseProps['color']
        }
    }
    children: string
}

const OptionCard: FC<IOptionCard> = ({
    Icon,
    rightIcon: RightIcon,
    settings,
    children,
}) => {
    const { theme } = useTheme()
    const props = {
        size: settings.size,
        color: settings.color[`theme_${theme}`],
    }

    const NewRightIcon = RightIcon ? <RightIcon {...props} /> : <span></span>
    const color = settings.color[`theme_${theme}`]

    const THEME_CLASSES = styles[`option_card_${theme}`]

    return (
        <div className={THEME_CLASSES}>
            <Icon {...props} />
            <span className={styles.text} style={{ color }}>
                {children}
            </span>
            {NewRightIcon}
        </div>
    )
}

export default OptionCard
