import { FC, ReactNode, Dispatch, SetStateAction } from 'react'
import styles from './SlidingLeftModal.module.scss'
import { easeOut, motion } from 'framer-motion'
import withPortal from '@HOCs/withPortal'
import { useTheme } from '@hooks/useTheme'

interface ISlidingLeftModal {
    isOpen: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    modalBgColor?: string
    className?: string
    children?: ReactNode
}

const SlidingLeftModal: FC<ISlidingLeftModal> = ({ children }) => {
    const { theme } = useTheme()

    const THEME_CLASSES = styles[`modal_window_${theme}`]

    return (
        <motion.div
            className={THEME_CLASSES}
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: '0', opacity: 1 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: easeOut }}
        >
            {children}
        </motion.div>
    )
}

export default withPortal(SlidingLeftModal)
