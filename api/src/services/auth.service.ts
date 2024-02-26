import UserRepository from '@/repositories/user.repository'
import { ApiError } from 'lib/exceptions/ApiError'
import bcrypt from 'bcrypt'
import {
    ICreateUserDto,
    ILoginUserDto,
    IRefreshSessionDto,
} from '@/dto/user.dto'
import TokenService from './token.service'
import { ACCESS_TOKEN_EXPIRATION } from 'config/constants'
import RefreshSessionRepository from '@/repositories/refresh-session.repository'
import { User } from '@/entities/User.entity'
import { userRepository } from '@/repositories/user.repository'

class AuthService {
    static async login({ email, password, fingerprint }: ILoginUserDto) {
        const candidate = await UserRepository.getUserByEmail(email)

        if (!candidate)
            throw ApiError.BadRequest('Такого пользователя не существует')

        const { id, first_name, role } = candidate

        const isPasswordValid = await bcrypt.compare(
            password,
            candidate.password,
        )

        if (!isPasswordValid) {
            throw ApiError.BadRequest('Неверный логин или пароль')
        }

        const payload = { id, first_name, role }

        const accessToken = await TokenService.generateAccessToken(payload)
        const refreshToken = await TokenService.generateRefreshToken(payload)

        const refreshSession =
            await RefreshSessionRepository.createRefreshSession({
                userId: id,
                fingerprint,
                refreshToken,
            })

        return {
            accessToken,
            refreshToken,
            user: refreshSession.user,
        }
    }

    static async registration({
        first_name,
        email,
        password,
        fingerprint,
    }: ICreateUserDto) {
        const candidate = await UserRepository.getUserByEmail(email)
        if (candidate) throw ApiError.BadRequest('Пользователь уже существует')

        const hashedPassword = await bcrypt.hash(password, 8)

        const user = new User()
        user.first_name = first_name
        user.email = email
        user.password = hashedPassword

        const { id, role } = await UserRepository.createUser(user)

        const payload = { id, first_name, role }

        const accessToken = await TokenService.generateAccessToken(payload)
        const refreshToken = await TokenService.generateRefreshToken(payload)

        const refreshSession =
            await RefreshSessionRepository.createRefreshSession({
                userId: id,
                fingerprint,
                refreshToken,
            })

        return {
            accessToken,
            refreshToken,
            user: refreshSession.user,
        }
    }

    static async refresh({ refreshToken, fingerprint }: IRefreshSessionDto) {
        await TokenService.validateRefreshToken(refreshToken)

        const { id, first_name, role } =
            await RefreshSessionRepository.findUserBySession(refreshToken)

        await RefreshSessionRepository.removeRefreshSession(refreshToken)

        const payload = { id, first_name, role }

        const newAccessToken = await TokenService.generateAccessToken(payload)
        const newRefreshToken = await TokenService.generateRefreshToken(payload)

        const newSession = await RefreshSessionRepository.createRefreshSession({
            userId: id,
            refreshToken: newRefreshToken,
            fingerprint,
        })

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            user: newSession.user,
        }
    }

    static async logout(refreshToken: string) {
        return RefreshSessionRepository.removeRefreshSession(refreshToken)
    }
}

export default AuthService
