export interface IApiError {
    status: number
    message: string
}

export class ApiError extends Error {
    status: number
    errors: string[]

    constructor(status: number, message: string) {
        super(message)
        this.status = status
    }

    static UnauthorizedError() {
        return new ApiError(401, 'Пользователь не авторизован')
    }

    static InternalServerError() {
        return new ApiError(500, 'Ошибка сервера')
    }

    static Forbidden() {
        return new ApiError(403, 'Доступ запрещен')
    }

    static BadRequest(message: string) {
        return new ApiError(400, message)
    }
}
