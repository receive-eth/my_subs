import { DataSource } from 'typeorm'
import * as dotenv from 'dotenv'
import { User } from '@/entities/User.entity'
import { RefreshSession } from '@/entities/RefreshSessions.entity'

dotenv.config()

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } =
    process.env

console.log({ DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE })

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: DB_HOST,
    port: parseInt(DB_PORT || '5432'),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,

    synchronize: true,
    logging: false,
    entities: [User, RefreshSession],
    migrations: [__dirname + '/migration/*.ts'],
    subscribers: [],
})
