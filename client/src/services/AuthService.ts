import axios, { AxiosResponse } from 'axios'
import { api } from '@/config/http/api'
import { IUser } from '@/models/User'
import { API_URL } from '@/config/http/api'

interface IRequest {
    email: string
    password: string
}

interface IResponse {
    accessToken: string
    user: IUser
}

const AuthService = {
    async login(data: IRequest): Promise<AxiosResponse<IResponse>> {
        return api.post('/auth/login', data)
    },

    async registration(data: IRequest): Promise<AxiosResponse<IResponse>> {
        return api.post('/auth/registration', data)
    },

    async getRefreshedTokenPair(): Promise<AxiosResponse<IResponse>> {
        return axios.get(`${API_URL}/auth/refresh`, {
            withCredentials: true,
        })
    },
}

export default AuthService
