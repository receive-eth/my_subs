import BaseButton from '@ui/Buttons/BaseButton'
import { ButtonHTMLAttributes, FC } from 'react'
import styles from './SubmitButton.module.scss'
import { useTheme } from '@hooks/useTheme'

interface ISumbitFormButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: string
    onClick?: () => void
}

const SumbitFormButton: FC<ISumbitFormButton> = ({
    className,
    children,
    ...props
}) => {
    const { theme } = useTheme()

    const THEME_CLASSES = styles[`submit_button_${theme}`]

    return (
        <BaseButton className={`${THEME_CLASSES} ${className}`} {...props}>
            {children}
        </BaseButton>
    )
}

export default SumbitFormButton
