import dotenv from 'dotenv'
import express from 'express'
import { AppDataSource } from 'config/data.source'
import authRouter from 'routes/auth.router'
import cookieParser from 'cookie-parser'
import { apiErrorHandler } from 'lib/exceptions/apiErrorHandler'
import cors from 'cors'

const Fingerprint = require('express-fingerprint')

dotenv.config()

const PORT = process.env.PORT

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
        credentials: true,
        origin: ['http://localhost:3000'],
    }),
)
app.use(
    Fingerprint({
        parameters: [Fingerprint.useragent, Fingerprint.acceptHeaders],
    }),
)

app.use('/api/auth', authRouter)

app.use(apiErrorHandler)

AppDataSource.initialize()
    .then(async () => {
        console.log('Data Source has been initialized!')
        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
    })
    .catch(error => console.log('Could not connect to the server: \n', error))
