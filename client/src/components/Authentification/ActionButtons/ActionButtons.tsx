import { FC, useEffect, useState } from 'react'
import styles from './ActionButtons.module.scss'
import SlideUpModal from '@ui/Modals/SlideUpModal/SlideUpModal'
import BaseButton from '@ui/Buttons/BaseButton'
import LoginForm from '../LoginForm/LoginForm'
import RegistrationForm from '../RegistrationForm/RegistrationForm'
import useAuthStore from '@hooks/useAuthStore'

interface IActionButtons {}

type TSelectedForm = 'login' | 'registration'

const ActionButtons: FC<IActionButtons> = () => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false)

    const [selectedForm, setSelectedForm] = useState<TSelectedForm>('login')
    const resetApiErrors = useAuthStore(state => state.resetApiErrors)

    const selectForm = (formType: TSelectedForm) => {
        setSelectedForm(formType)
        setModalOpen(true)
    }

    useEffect(() => {
        resetApiErrors()
    }, [selectedForm])

    return (
        <>
            <div className={styles.buttons_container}>
                <BaseButton
                    onClick={() => selectForm('login')}
                    className={styles.login_btn}
                >
                    Войти
                </BaseButton>
                <BaseButton
                    onClick={() => selectForm('registration')}
                    className={styles.register_btn}
                >
                    Регистрация
                </BaseButton>
            </div>

            <SlideUpModal
                isOpen={isModalOpen}
                setOpen={setModalOpen}
                className={styles.slide_up_modal}
            >
                {selectedForm === 'login' ? (
                    <LoginForm selectForm={selectForm} />
                ) : (
                    <RegistrationForm
                        autoComplete="new-password"
                        selectForm={selectForm}
                    />
                )}
            </SlideUpModal>
        </>
    )
}

export default ActionButtons
