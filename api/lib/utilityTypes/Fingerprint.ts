import { Request } from 'express'

export interface Fingerprint {
    hash: string // Уникальный хэш, представляющий fingerprint
    components: string[] // Массив строк, представляющих компоненты fingerprint
    version: number // Версия fingerprint
    useragent: string // User-Agent клиента
    language: string // Язык клиента
    ip: string // IP-адрес клиента
    geoip: {
        country: string // Страна, определенная по IP-адресу
        region: string // Регион, определенный по IP-адресу
        city: string // Город, определенный по IP-адресу
        ll: [number, number] // Географические координаты (широта и долгота)
    }
    acceptHeaders: {
        encoding: string // Предпочтительное кодирование клиента
        language: string // Предпочтительный язык клиента
        charset: string // Предпочтительный набор символов клиента
        accept: string // Заголовок Accept клиента
    }
}

export interface RequestWithFingerprint extends Request {
    fingerprint: Fingerprint
}
