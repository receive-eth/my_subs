export const COOKIE_SETTINGS = {
    REFRESH_TOKEN: {
        httpOnly: true,
        maxAge: 1296e6, // 30 * 25 * 3600 * 1000 (30 дней)
    },
}

export const ACCESS_TOKEN_EXPIRATION = 18e5 // 1800 * 30 (30 мин)

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || ''
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || ''
