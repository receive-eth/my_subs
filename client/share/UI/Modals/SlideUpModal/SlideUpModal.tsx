import styles from './SlideUp.module.scss'
import { Dispatch, FC, ReactNode, SetStateAction } from 'react'
import { useTheme } from '@hooks/useTheme'
import { useLimitedFocus } from '@hooks/useLimitedFocus'
import withPortal from '@HOCs/withPortal'
import SlidingOutAnimation from '@ui/Animations/SlidingOutAnimation'

interface ISlideUpModalProps {
    isOpen: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    modalBgColor?: string
    className?: string
    children?: ReactNode
}

const SlideUpModal: FC<ISlideUpModalProps> = ({
    isOpen,
    setOpen,
    children,
    modalBgColor,
    className,
}) => {
    const { theme } = useTheme()

    const themeWindowClass = styles[`window_${theme}`]
    const themeContentClass = styles[`content_${theme}`]

    const { modalRef } = useLimitedFocus({
        isOpen,
        setOpen,
    })

    return (
        <div
            className={styles.modal_overlay}
            style={{ backgroundColor: modalBgColor }}
            ref={modalRef}
        >
            <SlidingOutAnimation>
                <div className={`${styles.modal_window} ${themeWindowClass}`}>
                    <div
                        className={`${styles.modal_content_container} ${themeContentClass} ${className}`}
                    >
                        {children}
                    </div>
                </div>
            </SlidingOutAnimation>
        </div>
    )
}

export default withPortal(SlideUpModal)
