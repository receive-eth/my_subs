import { useEffect, useRef } from 'react'

type DepsType = Array<number | string | boolean | object | null | undefined>

interface IUseInitialFocusProps {
    dependencies: DepsType
}

export const useInitialFocus = <T extends HTMLElement>({
    dependencies,
}: IUseInitialFocusProps) => {
    const initialFocusRef = useRef<T | null>(null)

    useEffect(() => {
        const initialFocusElement = initialFocusRef.current

        if (initialFocusElement) {
            initialFocusElement.focus()
        }
    }, dependencies)

    return { initialFocusRef }
}
