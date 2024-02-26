import { FC } from 'react'
import useAuthStore from '@hooks/useAuthStore'
import CircleLoader from '@ui/CircleLoader/CircleLoader'
import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const PrivateRouteWrapper: FC = () => {
    const { checkAccess, status } = useAuthStore()

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')

        if (accessToken) {
            checkAccess()
        }
    }, [])

    if (status === 'pending') return <CircleLoader />

    return status === 'fulfilled' ? <Outlet /> : <Navigate to={'/auth'} />
}

export default PrivateRouteWrapper
