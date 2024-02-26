import { useEffect, Dispatch, SetStateAction, useRef } from 'react'

interface IUseLimitedFocusProps {
    isOpen: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const useLimitedFocus = ({ isOpen, setOpen }: IUseLimitedFocusProps) => {
    const modalRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (isOpen && modalRef.current) {
            const modalElement = modalRef.current
            if (!modalElement) return

            const focusableElements = modalElement.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
            )
            const firstElement = focusableElements[0] as HTMLElement
            const lastElement = focusableElements[
                focusableElements.length - 1
            ] as HTMLElement

            const handleTabKeyPress = (event: KeyboardEvent) => {
                if (event.key === 'Tab') {
                    if (
                        event.shiftKey &&
                        document.activeElement === firstElement
                    ) {
                        event.preventDefault()
                        lastElement.focus()
                    } else if (
                        !event.shiftKey &&
                        document.activeElement === lastElement
                    ) {
                        event.preventDefault()
                        firstElement.focus()
                    }
                    event.stopPropagation()
                }
            }

            const handleEscapeKeyPress = (event: KeyboardEvent) => {
                if (event.key === 'Escape') {
                    setOpen(false)
                    event.stopPropagation()
                }
            }

            modalElement.addEventListener('keydown', handleTabKeyPress)
            modalElement.addEventListener('keydown', handleEscapeKeyPress)

            return () => {
                modalElement.removeEventListener('keydown', handleTabKeyPress)
                modalElement.removeEventListener(
                    'keydown',
                    handleEscapeKeyPress,
                )
            }
        }
    }, [isOpen, setOpen])

    return { modalRef }
}
