import { NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { IPayload } from '@/dto/user.dto'
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from 'config/constants'
import dotenv from 'dotenv'
import { ApiError } from 'lib/exceptions/ApiError'

dotenv.config()

class TokenService {
    static async generateAccessToken(payload: IPayload) {
        return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
            expiresIn: '30m',
        })
    }

    static async generateRefreshToken(payload: IPayload) {
        return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
            expiresIn: '30d',
        })
    }

    static async validateAccessToken(accessToken: string) {
        return jwt.verify(
            accessToken,
            ACCESS_TOKEN_SECRET,
            (error, decoded) => {
                if (error) throw error
                return decoded
            },
        )
    }

    static async validateRefreshToken(refreshToken: string) {
        return jwt.verify(
            refreshToken,
            REFRESH_TOKEN_SECRET,
            (error, decoded) => {
                if (error) throw error
                return decoded
            },
        )
    }
}

export default TokenService
