import { AxiosError } from 'axios'

export class ErrorService {
    static getErrorMessage(e: unknown) {
        if (e instanceof AxiosError) {
            return e.response?.data.error.message
        }

        if (e instanceof Error) {
            return e.message
        }

        return (e as Error).message
    }
}
