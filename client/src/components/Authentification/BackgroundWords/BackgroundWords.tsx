import { FC } from 'react'
import styles from './BackgroundWords.module.scss'
import { sub_list } from '../../../../share/data/sub_list'
import { useTheme } from '@hooks/useTheme'

const BackgroundWords: FC = () => {
    const { theme } = useTheme()

    const getLines = (valuesArray: string[], linesNumber: number) => {
        const lines = []
        for (let i = 0; i < linesNumber; i++) {
            const arrayCopy = [...valuesArray]
            arrayCopy.sort(() => Math.random() - 0.5)
            const line = arrayCopy.join(', ').replace(/,/g, '')

            lines.push(line)
        }
        return lines
    }

    const lines = getLines(sub_list, 10)

    const themeClass = theme === 'light' ? styles.light : styles.dark

    return (
        <div className={`${styles.bg_words} ${themeClass} `}>
            {lines.map((el, index) => {
                const lineClass =
                    index % 2 === 0 ? styles.line : styles.reversed

                return (
                    <div key={index} className={`${styles.line} ${lineClass}`}>
                        {el}
                    </div>
                )
            })}
        </div>
    )
}

export default BackgroundWords
