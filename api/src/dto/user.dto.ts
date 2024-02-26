import { Fingerprint } from 'lib/utilityTypes/Fingerprint'

export interface ICreateUserDto {
    first_name: string
    email: string
    password: string
    fingerprint: Fingerprint
}

export class CreateUserDto {
    first_name: string
    email: string
    password: string

    constructor({ first_name, email, password }: ICreateUserDto) {
        this.first_name = first_name
        this.email = email
        this.password = password
    }
}

export interface ILoginUserDto {
    email: string
    password: string
    fingerprint: Fingerprint
}

export interface IPayload {
    id: string
    first_name: string
    role: string
}

export interface IRefreshSessionDto {
    refreshToken: string
    fingerprint: Fingerprint
}
