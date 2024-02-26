import { InputHTMLAttributes, forwardRef, useState, ForwardedRef } from 'react'
import { FC } from 'react'
import styles from './AuthInput.module.scss'
import { useTheme } from '@hooks/useTheme'
import { FieldError } from 'react-hook-form'

type TWithRightIcon = {
    icon: string
    iconClassName?: string
    onRightIconClick: () => void
}

interface IAuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon: string
    withRightIcon?: TWithRightIcon
    error?: FieldError
}

const AuthInput: FC<IAuthInputProps> = forwardRef<
    HTMLInputElement,
    IAuthInputProps
>(
    (
        {
            children,
            withRightIcon,
            icon,
            placeholder,
            required,
            error,
            className,
            ...props
        },
        ref: ForwardedRef<HTMLInputElement>,
    ) => {
        const [focused, setFocused] = useState<boolean>(false)

        const { theme } = useTheme()

        const THEME_CLASSES = styles[`auth_input_${theme}`]
        const FOCUSED_CLASSES = focused && styles.focused
        const ERROR_CLASSES = error?.message && styles.errored

        return (
            <div>
                <div
                    className={`${THEME_CLASSES} ${ERROR_CLASSES} ${FOCUSED_CLASSES} ${className}`}
                >
                    <div className={styles.icon}>
                        <img src={icon} alt="user icon" />
                    </div>
                    <input
                        {...props}
                        spellCheck={false}
                        required
                        ref={ref}
                        className={styles.input}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                    />

                    <label className={styles.label}>{placeholder}</label>
                    {withRightIcon?.icon && (
                        <div
                            onClick={withRightIcon.onRightIconClick}
                            className={`${styles.optional_right_icon} ${withRightIcon.iconClassName}`}
                        >
                            <img src={withRightIcon.icon} alt="" />
                        </div>
                    )}
                </div>
                {error && (
                    <div className={styles.input_message}>{error?.message}</div>
                )}
            </div>
        )
    },
)

export default AuthInput
