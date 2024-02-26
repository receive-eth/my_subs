import { ReactNode, FC } from 'react'
import styles from './BgCircles.module.scss'

interface IBgCircles {
    children: ReactNode
}

const BgCircles: FC<IBgCircles> = ({ children }) => {
    return (
        <>
            <div className={styles.bg_circles}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className={styles.children}>{children}</div>
        </>
    )
}

export default BgCircles
