import { ChangeEvent, FC, useState } from 'react'
import styles from './Search.module.scss'
import search from '@/assets/icons/search.svg'
import BurgerMenu from '../BurgerMenu/BurgerMenu'
import { useTheme } from '@hooks/useTheme'
import MobileOptions from '@/components/MobileOptions'

interface ISearch {
    searchLabelText: string
    className?: string
}

const Search: FC<ISearch> = ({ searchLabelText, className }) => {
    const [inputValue, setInputValue] = useState('')
    const [isBurgerOpen, setBurgerOpen] = useState(false)

    const { theme } = useTheme()

    const THEME_CLASSES = styles[`wrapper_${theme}`]

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    return (
        <div className={`${styles.wrapper} ${THEME_CLASSES} ${className}`}>
            <BurgerMenu isOpen={isBurgerOpen} setOpen={setBurgerOpen} />
            {/* добавить логику, чтобы появлялось только при определенной ширине
            экрана */}
            <MobileOptions isOpen={isBurgerOpen} setOpen={setBurgerOpen} />
            <input
                id="search_input"
                name="search_input"
                onChange={handleChange}
                className={`${styles.input} ${
                    inputValue.trim() !== '' ? styles.has_content : ''
                }`}
                spellCheck={false}
                value={inputValue}
            />
            <label className={styles.search_label_text} htmlFor="search_input">
                {searchLabelText}
            </label>
            <label className={styles.icon_wrapper} htmlFor="search_input">
                <img src={search} alt="" className={styles.search_icon} />
            </label>
        </div>
    )
}

export default Search
