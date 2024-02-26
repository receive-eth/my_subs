import { Dispatch, FC, SetStateAction } from 'react'
import styles from './BurgerMenu.module.scss'

interface IBurgerMenu {
    className?: string
    isOpen: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const BurgerMenu: FC<IBurgerMenu> = ({ isOpen, setOpen }) => {
    return (
        <div className={styles.wrapper}>
            <button
                onClick={() => setOpen(prev => !prev)}
                className={`${styles.burger_menu} ${isOpen && styles.animated}`}
            >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    )
}

export default BurgerMenu
