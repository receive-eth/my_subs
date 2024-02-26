import styles from './RegistrationForm.module.scss'
import AuthInput from '@/components/Authentification/AuthInput/AuthInput'
import emailIcon from '@/assets/icons/email.svg'
import darkEmailIcon from '@/assets/icons/dark/dark_email.svg'
import keyIcon from '@/assets/icons/key.svg'
import darkKeyIcon from '@/assets/icons/dark/dark_key.svg'
import { FC, useState, useEffect } from 'react'
import AuthFormHeading from '../AuthFormHeading/AuthFormHeading'
import eyeIcon from '@/assets/icons/eye.svg'
import shownEyeIcon from '@/assets/icons/open_eye.svg'
import darkShownEyeIcon from '@/assets/icons/dark/dark_open_eye.svg'
import darkEyeIcon from '@/assets/icons/dark/dark_eye.svg'
import { useTheme } from '@hooks/useTheme'
import SumbitFormButton from '../SubmitButton/SumbitButton'
import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form'
import AuthFormError from '../AuthFormError/AuthFormError'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import useAuthStore from '@hooks/useAuthStore'

interface IRegistrationForm {
    autoComplete: string
    selectForm: (formType: 'login' | 'registration') => void
}

interface IHideButtons {
    onFirstField: boolean
    onSecondField: boolean
}

type FormType = z.infer<typeof schema>

const schema = z
    .object({
        email: z.string().email('Некорректный email'),
        password: z
            .string()
            .min(8, 'Пароль должен содержать не менее 6 символов')
            .max(30, 'Максимальная длина пароля 30 символов'),
        confirmPassword: z.string(),
    })
    .refine(data => data.confirmPassword === data.password, {
        message: 'Пароли не совпадают',
        path: ['confirmPassword'],
    })

const RegistrationForm: FC<IRegistrationForm> = ({
    autoComplete,
    selectForm,
}) => {
    const [isPasswordVisible, setPasswordVisible] = useState<IHideButtons>({
        onFirstField: false,
        onSecondField: false,
    })

    const apiError = useAuthStore(store => store.apiError)
    const registration = useAuthStore(store => store.registration)

    const {
        register,
        handleSubmit,
        setFocus,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<FormType>({
        resolver: zodResolver(schema),
        mode: 'onChange',
    })

    const { theme } = useTheme()

    useEffect(() => {
        clearErrors(['email', 'password'])
        setFocus('email')
    }, [])

    useEffect(() => {
        if (apiError.registration) {
            setError('root', { message: apiError.registration })
            setError('email', { message: 'Введите другой email' })
        }
    }, [apiError])

    const onSubmit: SubmitHandler<FormType> = async data => {
        await registration(data)
    }

    const EMAIL_ICON = theme === 'light' ? emailIcon : darkEmailIcon
    const KEY_ICON = theme === 'light' ? keyIcon : darkKeyIcon
    const EYE_ICON = theme === 'light' ? eyeIcon : darkEyeIcon
    const SHOWN_EYE_ICON = theme === 'light' ? shownEyeIcon : darkShownEyeIcon

    return (
        <form
            autoComplete={autoComplete}
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
        >
            <AuthFormHeading underlineClassName={styles.heading_underline}>
                Регистрация
            </AuthFormHeading>

            <div className={styles.inputs}>
                <AuthInput
                    error={errors?.email}
                    icon={EMAIL_ICON}
                    placeholder={'Эл. почта'}
                    autoComplete={autoComplete}
                    {...register('email', {
                        required: 'Введите email',
                        minLength: 3,
                    })}
                />
                <AuthInput
                    error={errors?.password}
                    type={isPasswordVisible.onFirstField ? 'text' : 'password'}
                    icon={KEY_ICON}
                    placeholder={'Пароль'}
                    withRightIcon={{
                        icon: isPasswordVisible.onFirstField
                            ? SHOWN_EYE_ICON
                            : EYE_ICON,
                        iconClassName: styles.optional_input_icon,
                        onRightIconClick: () =>
                            setPasswordVisible(prev => ({
                                ...prev,
                                onFirstField: !prev.onFirstField,
                            })),
                    }}
                    autoComplete={autoComplete}
                    {...register('password', {
                        required: 'Укажите пароль',
                        maxLength: 50,
                    })}
                />
                <AuthInput
                    error={errors.confirmPassword}
                    type={isPasswordVisible.onSecondField ? 'text' : 'password'}
                    icon={KEY_ICON}
                    placeholder={'Повторите пароль'}
                    withRightIcon={{
                        icon: isPasswordVisible.onSecondField
                            ? SHOWN_EYE_ICON
                            : EYE_ICON,
                        iconClassName: styles.optional_input_icon,
                        onRightIconClick: () =>
                            setPasswordVisible(prev => ({
                                ...prev,
                                onSecondField: !prev.onSecondField,
                            })),
                    }}
                    autoComplete={autoComplete}
                    {...register('confirmPassword', {
                        required: 'Повторите пароль',
                        minLength: 8,
                    })}
                />
            </div>

            <AuthFormError>{errors.root?.message}</AuthFormError>
            <SumbitFormButton type="submit">Готово</SumbitFormButton>

            <div className={styles.bottom_text}>
                <span>Уже есть аккаунт ? — </span>
                <a onClick={() => selectForm('login')}>Войти</a>
            </div>
        </form>
    )
}

export default RegistrationForm
