import AuthService from '@/services/AuthService'
import { create } from 'zustand'
import { IUser } from '@/models/User'
import { ErrorService } from '@/services/ErrorService'

interface IData {
    email: string
    password: string
}

type ApiErrorType = string | null

interface IAuthStore {
    user: IUser | null
    status: 'pending' | 'fulfilled' | 'rejected'
    apiError: { login: ApiErrorType; registration: ApiErrorType }
    resetApiErrors: () => void

    login: ({}: IData) => Promise<void>
    registration: ({}: IData) => Promise<void>
    checkAccess: () => Promise<void>
}

const useAuthStore = create<IAuthStore>()(set => ({
    user: null,
    status: 'fulfilled',
    apiError: { login: null, registration: null },
    resetApiErrors: () => {
        set({ apiError: { login: null, registration: null } })
    },
    login: async data => {
        try {
            set({ status: 'pending' })
            const { accessToken, user } = await AuthService.login(data).then(
                res => res.data,
            )
            localStorage.setItem('accessToken', accessToken)
            set({ user })
            set({ status: 'fulfilled' })
        } catch (error: unknown) {
            const message = ErrorService.getErrorMessage(error)
            console.log(message)

            set(state => ({
                apiError: { ...state.apiError, login: message },
            }))

            set({ user: null })
            set({ status: 'rejected' })
        }
    },
    registration: async data => {
        try {
            set({ status: 'pending' })
            const { accessToken, user } = await AuthService.registration(
                data,
            ).then(res => res.data)

            localStorage.setItem('accessToken', accessToken)

            set({ user })
            set({ status: 'fulfilled' })
        } catch (error: unknown) {
            const message = ErrorService.getErrorMessage(error)
            console.log(message)
            set(state => ({
                apiError: { ...state.apiError, registration: message },
            }))

            set({ user: null })
            set({ status: 'rejected' })
        }
    },
    checkAccess: async () => {
        try {
            set({ status: 'pending' })
            const { accessToken, user } =
                await AuthService.getRefreshedTokenPair().then(res => res.data)

            localStorage.setItem('accessToken', accessToken)
            set({ user })
            set({ status: 'fulfilled' })
        } catch (error: unknown) {
            const message = ErrorService.getErrorMessage(error)
            console.log(message)

            set({ status: 'rejected' })
        }
    },
}))

export default useAuthStore
