import { FC, ReactNode } from 'react'
import styles from './ContentContainer.module.scss'

interface IContentContainer {
    children: ReactNode
}

const ContentContainer: FC<IContentContainer> = ({ children }) => {
    return <div className={styles.container}>{children}</div>
}

export default ContentContainer
