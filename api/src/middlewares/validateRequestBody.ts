import { Request, Response, NextFunction } from 'express'
import { ApiError } from 'lib/exceptions/ApiError'

export const validateRequestBody = (requiredFields: string[]) => {
    return function (req: Request, res: Response, next: NextFunction) {
        const missingFields = requiredFields.filter(field => !req.body[field])

        if (missingFields.length > 0) {
            return next(
                ApiError.BadRequest(
                    `Missing fields: ${missingFields.join(', ')}`,
                ),
            )
        }

        next()
    }
}
