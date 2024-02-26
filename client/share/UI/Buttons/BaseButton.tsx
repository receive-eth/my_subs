import { ButtonHTMLAttributes, FC } from 'react'
import styles from './BaseButton.module.scss'

interface IBaseButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: () => void
}

const BaseButton: FC<IBaseButton> = ({
    onClick,
    className,
    children,
    ...props
}) => {
    return (
        <button
            {...props}
            className={`${styles.base_button} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default BaseButton
