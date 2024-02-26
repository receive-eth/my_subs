import { easeOut, motion } from 'framer-motion'
import { ReactNode, FC } from 'react'

interface ISlidingOutAnimationProps {
    children: ReactNode
}

const SlidingOutAnimation: FC<ISlidingOutAnimationProps> = ({ children }) => {
    return (
        <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0', opacity: 1 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.3, ease: easeOut }}
        >
            {children}
        </motion.div>
    )
}

export default SlidingOutAnimation
