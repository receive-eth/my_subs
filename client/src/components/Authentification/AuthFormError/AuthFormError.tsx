import { ReactNode } from 'react'
import styles from './AuthFormError.module.scss'

interface IAuthFormError {
    children: ReactNode
}

const AuthFormError = ({ children }: IAuthFormError) => {
    return <div className={styles.wrapper}>{children}</div>
}

export default AuthFormError
