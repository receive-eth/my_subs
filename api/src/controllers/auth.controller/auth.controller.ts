import { NextFunction, Request, Response } from 'express'
import { ILoginRequest, IRegistrationRequest } from './auth.controller.types'
import AuthService from 'services/auth.service'
import { RequestWithFingerprint } from 'lib/utilityTypes/Fingerprint'
import { COOKIE_SETTINGS } from 'config/constants'
import { ApiError } from 'lib/exceptions/ApiError'
import TokenService from 'services/token.service'

class AuthController {
    static async login(
        req: Request<{}, {}, ILoginRequest>,
        res: Response,
        next: NextFunction,
    ) {
        const { email, password } = req.body
        const { fingerprint } = req as RequestWithFingerprint

        try {
            const { accessToken, refreshToken, user } = await AuthService.login(
                {
                    email,
                    password,
                    fingerprint,
                },
            )

            res.cookie(
                'refreshToken',
                refreshToken,
                COOKIE_SETTINGS.REFRESH_TOKEN,
            )

            res.status(201).json({ accessToken, user })
        } catch (error: unknown) {
            next(ApiError.BadRequest((error as Error).message))
        }
    }

    static async registration(
        req: Request<{}, {}, IRegistrationRequest>,
        res: Response,
        next: NextFunction,
    ) {
        const { email, password } = req.body
        const { fingerprint } = req as RequestWithFingerprint

        try {
            const { accessToken, refreshToken, user } =
                await AuthService.registration({
                    first_name: 'Anonimous',
                    email,
                    password,
                    fingerprint,
                })

            res.cookie(
                'refreshToken',
                refreshToken,
                COOKIE_SETTINGS.REFRESH_TOKEN,
            )

            res.status(201).json({ accessToken, user })
        } catch (error: unknown) {
            next(ApiError.BadRequest((error as Error).message))
        }
    }

    static async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.cookies.refreshToken
            const { fingerprint } = req as RequestWithFingerprint

            if (!refreshToken)
                return next(
                    ApiError.BadRequest(
                        'refreshToken отсутствует в cookies запроса',
                    ),
                )

            const data = await AuthService.refresh({
                refreshToken,
                fingerprint,
            })

            res.cookie(
                'refreshToken',
                data.refreshToken,
                COOKIE_SETTINGS.REFRESH_TOKEN,
            )
            res.status(201).json({
                accessToken: data.accessToken,
                user: data.user,
            })
        } catch (error: unknown) {
            next(ApiError.BadRequest((error as Error).message))
        }
    }

    static async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.cookies.refreshToken

            if (!refreshToken)
                return next(
                    ApiError.BadRequest(
                        'refreshToken отсутствует в cookies запроса',
                    ),
                )

            const { sessions_left } = await AuthService.logout(refreshToken)

            res.status(201).json({ sessions_left })
        } catch (error: unknown) {
            next(ApiError.BadRequest((error as Error).message))
        }
    }
}

export default AuthController
