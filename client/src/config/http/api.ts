import axios, { CreateAxiosDefaults } from 'axios'

export const API_URL = import.meta.env.VITE_API_URL

const config: CreateAxiosDefaults<any> | undefined = {
    withCredentials: true,
    baseURL: API_URL,
}

// without interceptors
export const api = axios.create(config)

// with interceptors
const $api = axios.create(config)

$api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
        'accessToken',
    )}`
    return config
})

$api.interceptors.response.use(
    config => {
        return config
    },
    async error => {
        if (error.response.status === 401) {
            try {
                const originalRequest = error.config
                const response = await axios.get(`${API_URL}/auth/refresh`, {
                    withCredentials: true,
                })
                localStorage.setItem('accessToken', response.data.accessToken)
                return $api.request(originalRequest)
            } catch (e) {
                console.log(e)
                console.log('Пользователь не авторизован')
            }
        }
    },
)

export default $api
