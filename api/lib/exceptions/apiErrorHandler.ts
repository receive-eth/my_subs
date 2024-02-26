import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { IApiError } from './ApiError'

export const apiErrorHandler: ErrorRequestHandler = (
    error: Error | IApiError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const status = (error as IApiError).status || 500
    const message = error.message || 'Internal server error'

    res.status(status).json({
        error: { message },
    })
}
