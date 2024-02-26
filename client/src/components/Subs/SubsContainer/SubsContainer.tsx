import { FC, ReactNode } from 'react'
import styles from './SubsContainer.module.scss'

interface ISubsContainer {
    className?: string
    children?: ReactNode
}

const SubsContainer: FC<ISubsContainer> = ({ className, children }) => {
    return <div className={`${styles.container} ${className}`}>{children}</div>
}

export default SubsContainer
