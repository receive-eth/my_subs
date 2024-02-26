import { usePortal } from '@hooks/usePortal'
import { createPortal } from 'react-dom'
import { AnimatePresence } from 'framer-motion'

import { FC } from 'react'

type portalProps = {
    isOpen: boolean
}

const withPortal =
    <P extends portalProps>(PassedComponent: FC<P & portalProps>) =>
    ({ isOpen, ...props }: P) => {
        const el = usePortal({ portalId: 'modal-portal' })

        const mergedProps = {
            ...props,
            isOpen,
        } as P & portalProps

        return createPortal(
            <AnimatePresence>
                {isOpen && <PassedComponent {...mergedProps} />}
            </AnimatePresence>,
            el,
        )
    }

export default withPortal
