import { FC, useEffect, useState } from 'react'
import styles from './LoginForm.module.scss'
import user from '@/assets/icons/user.svg'
import darkUser from '@/assets/icons/dark/dark_user.svg'
import lock from '@/assets/icons/lock.svg'
import darkLock from '@/assets/icons/dark/dark_lock.svg'
import AuthInput from '@/components/Authentification/AuthInput/AuthInput'
import { useForm } from 'react-hook-form'
import AuthFormHeading from '../AuthFormHeading/AuthFormHeading'
import eye from '@/assets/icons/eye.svg'
import darkEye from '@/assets/icons/dark/dark_eye.svg'
import shownEyeIcon from '@/assets/icons/open_eye.svg'
import darkShownEyeIcon from '@/assets/icons/dark/dark_open_eye.svg'
import { useTheme } from '@hooks/useTheme'
import SumbitFormButton from '../SubmitButton/SumbitButton'
import { SubmitHandler } from 'react-hook-form'
import useAuthStore from '@hooks/useAuthStore'
import AuthFormError from '../AuthFormError/AuthFormError'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

interface ILoginForm {
    selectForm: (formType: 'login' | 'registration') => void
}

type FormType = z.infer<typeof schema>

const schema = z.object({
    email: z.string().email('Некорректный email'),
    password: z
        .string()
        .min(8, 'Пароль должен содержать не менее 6 символов')
        .max(30, 'Максимальная длина пароля 30 символов'),
})

const LoginForm: FC<ILoginForm> = ({ selectForm }) => {
    const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false)

    const { login, apiError } = useAuthStore(store => store)

    const {
        register,
        handleSubmit,
        setFocus,
        setError,
        clearErrors,
        formState: { errors, isSubmitting },
    } = useForm<FormType>({ resolver: zodResolver(schema), mode: 'onChange' })

    const { theme } = useTheme()

    const onSubmit: SubmitHandler<FormType> = async data => {
        await new Promise(resolve => setTimeout(resolve, 1000))
        await login(data)
    }

    useEffect(() => {
        clearErrors(['email', 'password'])
        setFocus('email')
    }, [])

    useEffect(() => {
        if (apiError.login) {
            setError('root', { message: apiError.login })
            setError('email', { message: 'Некорректный email' })
            setError('password', { message: 'Некорректный пароль' })
        }
    }, [apiError])

    const THEME_CLASSES = styles[`form_${theme}`]
    const USER_ICON = theme === 'light' ? user : darkUser
    const LOCK_ICON = theme === 'light' ? lock : darkLock
    const EYE_ICON = theme === 'light' ? eye : darkEye
    const SHOWN_EYE_ICON = theme === 'light' ? shownEyeIcon : darkShownEyeIcon

    return (
        <form className={THEME_CLASSES} onSubmit={handleSubmit(onSubmit)}>
            <AuthFormHeading>Войти</AuthFormHeading>

            <div className={styles.inputs}>
                <AuthInput
                    icon={USER_ICON}
                    placeholder={'Эл. почта'}
                    error={errors?.email}
                    {...register('email', {
                        required: 'Укажите email',
                        onChange: () => {
                            clearErrors('root')
                        },
                    })}
                />
                <AuthInput
                    type={isPasswordVisible ? 'text' : 'password'}
                    icon={LOCK_ICON}
                    placeholder={'Пароль'}
                    withRightIcon={{
                        icon: isPasswordVisible ? SHOWN_EYE_ICON : EYE_ICON,
                        iconClassName: styles.optional_input_icon,
                        onRightIconClick: () =>
                            setPasswordVisible(prev => !prev),
                    }}
                    error={errors?.password}
                    {...register('password', {
                        required: 'Укажите пароль',
                        onChange: () => {
                            clearErrors('root')
                        },
                    })}
                />
            </div>

            <div className={styles.action_buttons_container}>
                <a href="#">Забыли пароль ?</a>
                <a href="#">У меня есть QR</a>
            </div>

            <AuthFormError>{errors?.root?.message}</AuthFormError>

            <SumbitFormButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Подождите ...' : 'Готово'}
            </SumbitFormButton>

            <div className={styles.bottom_text}>
                <span>Нет аккаунта ? — </span>
                <a onClick={() => selectForm('registration')}>
                    Зарегистрироваться
                </a>
            </div>
        </form>
    )
}

export default LoginForm
