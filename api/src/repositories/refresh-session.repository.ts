import { Repository } from 'typeorm'
import { AppDataSource } from 'config/data.source'
import { Fingerprint } from 'lib/utilityTypes/Fingerprint'
import { RefreshSession } from '@/entities/RefreshSessions.entity'
import { userRepository } from './user.repository'
import { ApiError } from 'lib/exceptions/ApiError'

export const refreshSessionRepository: Repository<RefreshSession> =
    AppDataSource.getRepository(RefreshSession)

interface IRefreshSession {
    userId: string
    refreshToken: string
    fingerprint: Fingerprint
}

class RefreshSessionRepository {
    static async createRefreshSession({
        userId,
        refreshToken,
        fingerprint,
    }: IRefreshSession) {
        const newSession = new RefreshSession()

        const user = await userRepository.findOne({ where: { id: userId } })

        if (!user)
            throw ApiError.BadRequest('Такого пользователя не существует')

        newSession.user = user
        newSession.refresh_token = refreshToken
        newSession.finger_print = fingerprint.hash

        await refreshSessionRepository.save(newSession)

        return newSession
    }

    static async findUserBySession(refreshToken: string) {
        const foundUser = await userRepository.findOne({
            where: { refresh_sessions: { refresh_token: refreshToken } },
        })

        if (!foundUser) throw ApiError.UnauthorizedError()

        return foundUser
    }

    static async removeRefreshSession(refreshToken: string) {
        const sessionToRemove = await refreshSessionRepository.findOne({
            where: { refresh_token: refreshToken },
        })

        if (!sessionToRemove) {
            throw ApiError.BadRequest('Такой сессии не существует')
        }

        await refreshSessionRepository.remove(sessionToRemove)

        const user = sessionToRemove.user
        const sessions_left = await refreshSessionRepository.count({
            where: { user },
        })

        return { sessions_left }
    }
}

export default RefreshSessionRepository
