import { useEffect, useRef } from 'react'

interface IUsePortalProps {
    portalId: string
}

export const usePortal = ({ portalId }: IUsePortalProps): HTMLDivElement => {
    const elRef = useRef(document.createElement('div'))

    useEffect(() => {
        const modalRoot = document.getElementById(portalId)
        if (!modalRoot) return

        modalRoot.appendChild(elRef.current)

        return () => {
            modalRoot.removeChild(elRef.current)
        }
    }, [])

    return elRef.current
}
