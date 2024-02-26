import { NextFunction, Request, Response } from 'express'
import { ApiError } from 'lib/exceptions/ApiError'
import jwt from 'jsonwebtoken'
import { ACCESS_TOKEN_SECRET } from 'config/constants'
import { RequestWithDecryptedData } from 'lib/utilityTypes/CustomRequests'
import { IPayload } from '@/dto/user.dto'
import TokenService from 'services/token.service'

export const checkAccess = (
    req: RequestWithDecryptedData,
    _: Response,
    next: NextFunction,
) => {
    try {
        const authHeader = req.headers.authorization

        const authToken = authHeader?.split(' ')?.[1]

        if (!authToken) {
            return next(ApiError.UnauthorizedError())
        }

        TokenService.validateAccessToken(authToken)
    } catch (e) {
        return next(ApiError.Forbidden())
    }
}

// jwt.verify(authToken, ACCESS_TOKEN_SECRET, (err, payload) => {
//     if (err) {
//         return next(ApiError.Forbidden())
//     }

//     req.decryptedData = payload as IPayload
//     next()
// })
